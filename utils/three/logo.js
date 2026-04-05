import * as THREE from "three";

export function addLogo(scene) {
  const logoGroup = new THREE.Group();
  scene.add(logoGroup);

  const textureLoader = new THREE.TextureLoader();

  const applyPlaneTransform = (plane) => {
    plane.position.set(0, 10, 0);
    plane.rotation.set(0, 0, 0);
    plane.renderOrder = 2;
  };

  textureLoader.load(
    "/logo1.png",
    (texture) => {
      const plane = new THREE.Mesh(
     new THREE.PlaneGeometry(32, 24, 1, 1),
        new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
        })
      );

      applyPlaneTransform(plane);
      logoGroup.add(plane);
    },
    undefined,
    () => {
      const fallbackPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 12),
        new THREE.MeshBasicMaterial({
          color: 0x8b5cf6,
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        })
      );

      applyPlaneTransform(fallbackPlane);
      logoGroup.add(fallbackPlane);
    }
  );

  return logoGroup;
}