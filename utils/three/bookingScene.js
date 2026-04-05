import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function createBookingScene() {
  const mount = document.getElementById("booking-3d");
  if (!mount) return null;

  mount.innerHTML = "";

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    mount.clientWidth / mount.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 1.4);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 1.5);
  directional.position.set(4, 6, 10);
  scene.add(directional);

  // star field
  const starCount = 220;
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 18;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
  );

  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
    })
  );
  scene.add(stars);

  // glowing text
  const textCanvas = document.createElement("canvas");
  textCanvas.width = 1024;
  textCanvas.height = 256;
  const ctx = textCanvas.getContext("2d");

  ctx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  ctx.shadowColor = "rgba(139,92,246,0.95)";
  ctx.shadowBlur = 35;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 96px Inter, Arial, sans-serif";
  ctx.fillText("Book Services", textCanvas.width / 2, textCanvas.height / 2);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  textTexture.needsUpdate = true;

  const textMaterial = new THREE.MeshBasicMaterial({
    map: textTexture,
    transparent: true,
    depthWrite: false,
  });

  const textPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 2.5),
    textMaterial
  );
  textPlane.position.set(0, 0, 0);
  scene.add(textPlane);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.6, 0.07, 16, 100),
    new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.65,
    })
  );
  ring.position.set(0, 0, -1.2);
  ring.rotation.x = 0.4;
  scene.add(ring);

  // BOOKING-SCENE ROCKET
  const rocketGroup = new THREE.Group();
  rocketGroup.visible = false;
  scene.add(rocketGroup);

  // rear glow / flame for booking scene
  const glowTextureCanvas = document.createElement("canvas");
  glowTextureCanvas.width = 256;
  glowTextureCanvas.height = 256;
  const glowCtx = glowTextureCanvas.getContext("2d");

  const gradient = glowCtx.createRadialGradient(128, 128, 10, 128, 128, 110);
  gradient.addColorStop(0, "rgba(255,255,220,1)");
  gradient.addColorStop(0.2, "rgba(255,180,60,0.95)");
  gradient.addColorStop(0.45, "rgba(255,120,20,0.7)");
  gradient.addColorStop(1, "rgba(255,80,0,0)");

  glowCtx.fillStyle = gradient;
  glowCtx.fillRect(0, 0, 256, 256);

  const glowTexture = new THREE.CanvasTexture(glowTextureCanvas);

  const flameGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  flameGlow.scale.set(2.4, 2.4, 1);
  flameGlow.position.set(0, -2.15, 0);
  rocketGroup.add(flameGlow);

  // optional inner flame
  const flameCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.32, 1.1, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffa133,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
  );
  flameCore.position.set(0, -1.95, 0);
  flameCore.rotation.x = Math.PI;
  rocketGroup.add(flameCore);

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
      // keep flame glow and core, remove only rocket mesh fallback
      fallbackRocket.removeFromParent();

      const rocket = gltf.scene;

      // smaller than main scene rocket
      rocket.scale.multiplyScalar(3.0 / 250);
      rocket.position.set(0, 0, 0);

      rocketGroup.add(rocket);
    },
    undefined,
    () => {
      // keep fallback
    }
  );

  const bookingRocketState = {
    active: false,
    angleOffset: 0,
  };

  const clock = new THREE.Clock();
  let frameId = null;

  function animate() {
    frameId = requestAnimationFrame(animate);

    const t = clock.getElapsedTime();

    stars.rotation.y += 0.0009;
    stars.rotation.x = Math.sin(t * 0.25) * 0.03;

    textPlane.position.y = Math.sin(t * 1.2) * 0.08;
    textPlane.rotation.z = Math.sin(t * 0.6) * 0.015;

    ring.rotation.z += 0.003;
    ring.rotation.x = 0.4 + Math.sin(t * 0.9) * 0.05;

    if (bookingRocketState.active) {
      const angle = t * 1.4 + bookingRocketState.angleOffset;
      const cx = 0;
      const cy = 0;
      const cz = 0;

      const rx = 4.2;
      const ry = 1.3;
      const rz = 1.8;

      rocketGroup.visible = true;
      rocketGroup.position.set(
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry,
        cz + Math.sin(angle) * rz
      );

      const dx = -Math.sin(angle) * rx;
      const dy = Math.cos(angle) * ry;

      rocketGroup.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
      rocketGroup.rotation.y = Math.sin(angle) * 0.3;

      flameGlow.scale.x = 2.2 + Math.sin(t * 10) * 0.18;
      flameGlow.scale.y = 2.2 + Math.cos(t * 12) * 0.2;
      flameGlow.material.opacity = 0.78 + Math.sin(t * 14) * 0.08;

      flameCore.scale.y = 1 + Math.sin(t * 16) * 0.12;
      flameCore.material.opacity = 0.78 + Math.cos(t * 13) * 0.08;
    }

    renderer.render(scene, camera);
  }

  animate();

  const onResize = () => {
    if (!mount) return;
    camera.aspect = mount.clientWidth / mount.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
  };

  window.addEventListener("resize", onResize);

  return {
    scene,
    camera,
    renderer,
    onResize,

    showRocket() {
      bookingRocketState.active = true;
      rocketGroup.visible = true;
    },

    hideRocket() {
      bookingRocketState.active = false;
      rocketGroup.visible = false;
    },

    destroy: () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starGeometry.dispose();
      textPlane.geometry.dispose();
      textMaterial.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
    },
  };
}
