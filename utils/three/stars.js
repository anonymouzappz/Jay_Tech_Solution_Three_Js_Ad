import * as THREE from "three";

export function addStars(scene) {
  const starGeo = new THREE.BufferGeometry();
  const starVertices = [];

  for (let i = 0; i < 10000; i++) {
    starVertices.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );
  }

  starGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );

  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({ color: 0xffffff, size: 1.2 })
  );

  scene.add(stars);
  return stars;
}