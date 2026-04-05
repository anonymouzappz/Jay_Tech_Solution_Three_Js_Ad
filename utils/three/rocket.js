import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function addRocket(scene) {
  const textureLoader = new THREE.TextureLoader();

  const rocketGroup = new THREE.Group();
  rocketGroup.position.set(8, 16, 0);
  scene.add(rocketGroup);

  const flameTexture = textureLoader.load("/Fire.png");
  const flame = new THREE.Mesh(
    new THREE.ConeGeometry(4, 10, 20), // MUCH smaller
    new THREE.MeshPhongMaterial({
      map: flameTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      emissive: new THREE.Color(0xff7a18),
      emissiveIntensity: 1.0,
      shininess: 8,
      depthWrite: false,
    })
  );
  flame.position.set(0, -2.8, 0);
  flame.rotation.x = Math.PI;
  rocketGroup.add(flame);

  const fallbackRocket = new THREE.Group();

  const rocketBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.7, 3.5, 24),
    new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,
      metalness: 0.6,
      roughness: 0.35,
    })
  );
  fallbackRocket.add(rocketBody);

  const rocketNose = new THREE.Mesh(
    new THREE.ConeGeometry(0.65, 1.1, 24),
    new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.4,
      roughness: 0.4,
    })
  );
  rocketNose.position.y = 2.2;
  fallbackRocket.add(rocketNose);

  const finMaterial = new THREE.MeshStandardMaterial({ color: 0x60a5fa });

  const fin1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.9, 0.7),
    finMaterial
  );
  fin1.position.set(0.65, -1.2, 0);
  fallbackRocket.add(fin1);

  const fin2 = fin1.clone();
  fin2.position.x = -0.65;
  fallbackRocket.add(fin2);

  rocketGroup.add(fallbackRocket);

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    "/rocket.gltf",
    (gltf) => {
      rocketGroup.clear();

      const rocket = gltf.scene;
      rocket.scale.multiplyScalar(4.5 / 250);
      rocket.position.set(0, 0, 0);

      rocketGroup.add(rocket);
      rocketGroup.add(flame);
    },
    undefined,
    () => {
      // keep fallback rocket
    }
  );

  const trailCount = 50;
  const trailPositions = new Float32Array(trailCount * 3);
  const trailSizes = new Float32Array(trailCount);

  for (let i = 0; i < trailCount; i++) {
    trailPositions[i * 3] = 0;
    trailPositions[i * 3 + 1] = 0;
    trailPositions[i * 3 + 2] = 0;
    trailSizes[i] = 1 - i / trailCount;
  }

  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(trailPositions, 3)
  );
  trailGeometry.setAttribute("aSize", new THREE.BufferAttribute(trailSizes, 1));

  const trailMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(0xff7a18) },
    },
    vertexShader: `
      attribute float aSize;
      varying float vAlpha;
      void main() {
        vAlpha = aSize;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 24.0 * aSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        float strength = smoothstep(0.5, 0.0, dist);
        gl_FragColor = vec4(uColor, strength * vAlpha * 0.7);
      }
    `,
  });

  const trail = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(trail);

  return {
    rocketGroup,
    flame,
    trail,
    trailPositions,
    trailGeometry,
    motionState: {
      mode: "orbitLogo", // orbitLogo | travelToBooking | orbitBooking | travelToLogo
      fromX: 0,
      fromY: 0,
      fromZ: 0,
      toX: 0,
      toY: 0,
      toZ: 0,
      progress: 0,
    },
  };
}
