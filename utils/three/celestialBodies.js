import * as THREE from "three";

function createAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(0x4fc3f7) },
      viewVector: { value: new THREE.Vector3(0, 0, 1) },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform vec3 viewVector;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      void main() {
        vec3 viewDir = normalize(viewVector - vWorldPosition);
        float intensity = pow(0.65 - max(dot(vNormal, viewDir), 0.0), 3.5);
        gl_FragColor = vec4(glowColor, intensity * 0.75);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false,
  });
}

function makeGlowTexture(inner, mid, outer) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.05,
    size / 2,
    size / 2,
    size * 0.5
  );

  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.3, mid);
  gradient.addColorStop(1, outer);

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function addCelestialBodies(scene, camera) {
  const group = new THREE.Group();
  scene.add(group);

  const textureLoader = new THREE.TextureLoader();

  // TEXTURES
  const earthDay = textureLoader.load("/textures/earth_day.jpg");
  const earthNight = textureLoader.load("/textures/earth_night.png");
  const earthClouds = textureLoader.load("/textures/earth_clouds.png");
  const moonColor = textureLoader.load("/textures/moon_color.jpg");
  const moonBump = textureLoader.load("/textures/moon_bump.jpg");

  earthDay.colorSpace = THREE.SRGBColorSpace;
  earthNight.colorSpace = THREE.SRGBColorSpace;
  earthClouds.colorSpace = THREE.SRGBColorSpace;
  moonColor.colorSpace = THREE.SRGBColorSpace;

  earthDay.anisotropy = 8;
  earthNight.anisotropy = 8;
  earthClouds.anisotropy = 8;
  moonColor.anisotropy = 8;
  moonBump.anisotropy = 8;

  // SUN
  const sunGroup = new THREE.Group();
  sunGroup.position.set(20, -15, -50);
  group.add(sunGroup);

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3.2, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0xffb347 })
  );
  sun.scale.setScalar(1.45);
  sunGroup.add(sun);

  const sunGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(
        "rgba(255,220,140,1)",
        "rgba(255,158,44,0.6)",
        "rgba(255,158,44,0)"
      ),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  sunGlow.scale.set(18, 18, 1);
  sunGroup.add(sunGlow);

  const sunOuterGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(
        "rgba(255,120,20,0.4)",
        "rgba(255,80,0,0.15)",
        "rgba(255,80,0,0)"
      ),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  sunOuterGlow.scale.set(28, 28, 1);
  sunGroup.add(sunOuterGlow);

  const sunLight = new THREE.PointLight(0xffcc88, 10, 500, 2);
  sunLight.position.set(0, 0, 0);
  sunGroup.add(sunLight);

  // EARTH SYSTEM
  const earthOrbit = new THREE.Group();
  earthOrbit.position.set(12, -20, -2);
  group.add(earthOrbit);

  const earthGeometry = new THREE.SphereGeometry(2.3, 96, 96);

  const earth = new THREE.Mesh(
    earthGeometry,
    new THREE.MeshStandardMaterial({
      map: earthDay,
      emissiveMap: earthNight,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.45,
      roughness: 1,
      metalness: 0,
    })
  );
  earth.position.set(7, 0, 0);
  earth.scale.setScalar(1.35);
  earthOrbit.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(2.3, 96, 96),
    new THREE.MeshStandardMaterial({
      map: earthClouds,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      roughness: 1,
      metalness: 0,
    })
  );
  clouds.scale.set(1.01, 1.01, 1.01);
  earth.add(clouds);

 const atmosphere = new THREE.Mesh(
  earthGeometry.clone(),
  new THREE.MeshBasicMaterial({
    color: 0x4fc3f7,
    transparent: true,
    opacity: 0.06, // MUCH lower
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
);

atmosphere.scale.setScalar(1.08); // tighter to earth
earth.add(atmosphere);

  const earthCloudGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(
        "rgba(147,197,253,0.18)",
        "rgba(147,197,253,0.08)",
        "rgba(147,197,253,0)"
      ),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  earthCloudGlow.scale.set(9.2, 9.2, 1);
  earth.add(earthCloudGlow);

  // MOON SYSTEM
  const moonOrbit = new THREE.Group();
  earth.add(moonOrbit);

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 64, 64),
    new THREE.MeshStandardMaterial({
      map: moonColor,
      bumpMap: moonBump,
      bumpScale: 0.12,
      roughness: 1,
      metalness: 0,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.03,
    })
  );
  moon.position.set(6.5, 0, 0);
  moon.scale.setScalar(1.25);
  moonOrbit.add(moon);

  const moonGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeGlowTexture(
        "rgba(229,231,235,0.14)",
        "rgba(229,231,235,0.06)",
        "rgba(229,231,235,0)"
      ),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  moonGlow.scale.set(2.4, 2.4, 1);
  moon.add(moonGlow);

  if (camera) {
    const earthWorldPos = earth.getWorldPosition(new THREE.Vector3());
    atmosphere.material.uniforms.viewVector.value
      .copy(camera.position)
      .sub(earthWorldPos);
  }

  return {
    group,
    sunGroup,
    sun,
    sunGlow,
    sunOuterGlow,
    sunLight,
    earthOrbit,
    earth,
    clouds,
    earthCloudGlow,
    atmosphere,
    moonOrbit,
    moon,
    moonGlow,
  };
}