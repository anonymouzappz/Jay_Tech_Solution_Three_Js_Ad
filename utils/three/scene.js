import * as THREE from "three";

export function createScene() {
  const mount = document.getElementById("scene-root");

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x071226, 0.0009);

const camera = new THREE.PerspectiveCamera(
  85,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

// less tilt = cleaner UI alignment
camera.position.set(0, 0, 32);
camera.rotation.set(-0.15, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x050816, 1);
  

  mount.appendChild(renderer.domElement);

  return { scene, camera, renderer };
}