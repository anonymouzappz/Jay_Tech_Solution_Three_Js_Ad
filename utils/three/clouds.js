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
        opacity: 0.08,              // 🔥 LOWERED (was 0.22)
        depthWrite: false,
        blending: THREE.NormalBlending, // 🔥 IMPORTANT
      });

      for (let p = 0; p < 30; p++) { // 🔥 REDUCED count (was 45)
        const cloud = new THREE.Mesh(cloudGeo, cloudMaterial.clone());

        cloud.position.set(
          Math.random() * 1000 - 400,
          180,                     // 🔥 LOWER so it's not over text
          Math.random() * 1000 - 600
        );

        cloud.position.z -= 300;   // 🔥 PUSH BACK (CRITICAL)

        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random() * Math.PI * 2;

        cloud.material.opacity = 0.06 + Math.random() * 0.05; // 🔥 variation

        cloudParticles.push(cloud);
        scene.add(cloud);
      }
    }
  );

  return cloudParticles;
}