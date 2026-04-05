import * as THREE from "three";

export function addClouds(scene) {
  const cloudParticles = [];
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    "https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png",
    (texture) => {
      const cloudGeo = new THREE.PlaneGeometry(500, 500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });

      for (let p = 0; p < 45; p++) {
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial.clone());
        cloud.position.set(
          Math.random() * 1000 - 400,
          250,
          Math.random() * 1000 - 500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * Math.PI * 2;

        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    }
  );

  return cloudParticles;
}