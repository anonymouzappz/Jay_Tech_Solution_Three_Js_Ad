import * as THREE from "three";

export function addLights(scene) {

  // 🌍 Base ambient (overall brightness)
  const ambient = new THREE.AmbientLight(0xffffff, 1.8);
  scene.add(ambient);

  // ☀️ Main light (like sun / key light)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.2);
  directionalLight.position.set(0, 50, 50);
  scene.add(directionalLight);

  // 💡 Soft fill light (prevents harsh shadows)
  const fillLight = new THREE.DirectionalLight(0x9ca3af, 1.2);
  fillLight.position.set(-50, 20, 30);
  scene.add(fillLight);

  // 🌌 Colored atmosphere lights (subtle now, not overpowering)
  const purpleLight = new THREE.PointLight(0x7c3aed, 25, 600);
  purpleLight.position.set(100, 200, 150);
  scene.add(purpleLight);

  const blueLight = new THREE.PointLight(0x60a5fa, 25, 600);
  blueLight.position.set(-100, 150, 200);
  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xf472b6, 20, 600);
  pinkLight.position.set(0, 250, 100);
  scene.add(pinkLight);
}