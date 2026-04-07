// utils/three/lights.js
import * as THREE from "three";

export function addLights(scene) {
  // Overall brightness
  const ambient = new THREE.AmbientLight(0xffffff, 2.6);
  scene.add(ambient);

  // Sky + ground balance
  const hemiLight = new THREE.HemisphereLight(0xbfdcff, 0x1b2440, 2.2);
  hemiLight.position.set(0, 200, 0);
  scene.add(hemiLight);

  // Main key light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3.2);
  directionalLight.position.set(0, 80, 80);
  scene.add(directionalLight);

  // Fill from left/front
  const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
  fillLight.position.set(-80, 35, 60);
  scene.add(fillLight);

  // Front light to brighten logo / center area
  const frontLight = new THREE.DirectionalLight(0xffffff, 1.6);
  frontLight.position.set(0, 20, 120);
  scene.add(frontLight);

  // Colored atmosphere lights
  const purpleLight = new THREE.PointLight(0x7c3aed, 40, 900);
  purpleLight.position.set(100, 200, 150);
  scene.add(purpleLight);

  const blueLight = new THREE.PointLight(0x60a5fa, 38, 900);
  blueLight.position.set(-120, 160, 220);
  scene.add(blueLight);

  const pinkLight = new THREE.PointLight(0xf472b6, 30, 800);
  pinkLight.position.set(0, 240, 120);
  scene.add(pinkLight);

  // Extra soft near-camera glow
  const centerGlow = new THREE.PointLight(0xffffff, 18, 300);
  centerGlow.position.set(0, 20, 90);
  scene.add(centerGlow);

  // Lower/front accent for bottom of scene
  const lowerFill = new THREE.PointLight(0x93c5fd, 16, 350);
  lowerFill.position.set(0, -60, 80);
  scene.add(lowerFill);
}