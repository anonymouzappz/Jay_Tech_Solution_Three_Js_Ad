import * as THREE from "three";
import { getGalleryPathPoints } from "../ui/galleryRocketPath.js";

export function startAnimation({
  scene,
  camera,
  renderer,
  stars,
  cloudParticles,
  rocketGroup,
  logoGroup,
  trail,
  trailPositions,
  trailGeometry,
  motionState,
  celestialBodies,
  onBookingArrive,
  onLogoArrive,
}) {
  const clock = new THREE.Clock();
  let wasInGallery = false;

  function updateTrail() {
    if (!trail.visible) return;

    const rocketWorldPos = new THREE.Vector3();
    rocketGroup.getWorldPosition(rocketWorldPos);

    for (let i = trailPositions.length / 3 - 1; i > 0; i--) {
      trailPositions[i * 3] = trailPositions[(i - 1) * 3];
      trailPositions[i * 3 + 1] = trailPositions[(i - 1) * 3 + 1];
      trailPositions[i * 3 + 2] = trailPositions[(i - 1) * 3 + 2];
    }

    trailPositions[0] = rocketWorldPos.x;
    trailPositions[1] = rocketWorldPos.y;
    trailPositions[2] = rocketWorldPos.z;

    trailGeometry.attributes.position.needsUpdate = true;
  }

  function orbitAround(
    centerX,
    centerY,
    centerZ,
    angle,
    radiusX,
    radiusY,
    depthZ
  ) {
    const x = centerX + Math.cos(angle) * radiusX;
    const y = centerY + Math.sin(angle) * radiusY;
    const z = centerZ + Math.sin(angle) * depthZ;

    rocketGroup.position.set(x, y, z);

    const dx = -Math.sin(angle) * radiusX;
    const dy = Math.cos(angle) * radiusY;

    rocketGroup.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
    rocketGroup.rotation.y = Math.sin(angle) * 0.35;
  }

  function travelTo(dt) {
    motionState.progress += dt * 1.45;
    const p = Math.min(motionState.progress, 1);
    const eased = 1 - Math.pow(1 - p, 3);

    const x = THREE.MathUtils.lerp(motionState.fromX, motionState.toX, eased);
    const y = THREE.MathUtils.lerp(motionState.fromY, motionState.toY, eased);
    const z = THREE.MathUtils.lerp(motionState.fromZ, motionState.toZ, eased);

    rocketGroup.position.set(x, y, z);

    const dir = new THREE.Vector3(
      motionState.toX - x,
      motionState.toY - y,
      motionState.toZ - z
    );

    if (dir.lengthSq() > 0.0001) {
      rocketGroup.rotation.z = Math.atan2(dir.y, dir.x) - Math.PI / 2;
      rocketGroup.rotation.y = -dir.z * 0.08;
    }

    if (p >= 1) {
      if (motionState.mode === "travelToBooking") {
        motionState.mode = "orbitBooking";
        motionState.progress = 0;
        if (typeof onBookingArrive === "function") onBookingArrive();
      } else if (motionState.mode === "travelToLogo") {
        motionState.mode = "orbitLogo";
        motionState.progress = 0;
        if (typeof onLogoArrive === "function") onLogoArrive();
      }
    }
  }

  function flyGalleryPath(t) {
    const galleryData = getGalleryPathPoints();
    if (!galleryData?.points?.length) return false;

    const points = galleryData.points;
    const speed = 0.22;
    const total = points.length;
    const raw = (t * speed) % total;

    const i = Math.floor(raw);
    const nextI = (i + 1) % total;
    const lerpT = raw - i;

    const a = points[i];
    const b = points[nextI];

    const x = THREE.MathUtils.lerp(a.x, b.x, lerpT);
    const y = THREE.MathUtils.lerp(a.y, b.y, lerpT);
    const z = THREE.MathUtils.lerp(a.z, b.z, lerpT);

    rocketGroup.position.set(x, y, z);

    const dx = b.x - a.x;
    const dy = b.y - a.y;

    rocketGroup.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
    rocketGroup.rotation.y = Math.sin(t * 2.5) * 0.25;

    return galleryData.isActive;
  }

  function animate() {
    requestAnimationFrame(animate);

    const t = clock.getElapsedTime();
    const dt = 0.016;

    cloudParticles.forEach((cloud, index) => {
      cloud.rotation.z -= 0.0008 + index * 0.000002;
    });

    stars.rotation.x += 0.00035;
    stars.rotation.y += 0.0004;
    stars.rotation.z += 0.00015;

    logoGroup.position.y = Math.sin(t * 0.8) * 0.12;

    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const nearTop = scrollTop < 120;

    if (
      motionState.mode === "travelToBooking" ||
      motionState.mode === "travelToLogo"
    ) {
      travelTo(dt);
    } else if (motionState.mode === "orbitBooking") {
      const centerX = 18.2;
      const centerY = 10.8;
      const centerZ = 1.5;

      orbitAround(centerX, centerY, centerZ, t * 1.15, 2.4, 0.8, 1.4);
    } else {
      const galleryData = getGalleryPathPoints();
      const galleryActive = !!galleryData?.isActive && !nearTop;

      if (galleryActive) {
        wasInGallery = true;
        flyGalleryPath(t);
      } else {
        if (wasInGallery && motionState.mode === "orbitLogo") {
          wasInGallery = false;
        }

        const centerX = -2.5;
        const centerY = 10 + logoGroup.position.y;
        const centerZ = 0;

        orbitAround(centerX, centerY, centerZ, t * 0.8, 16.5, 3.4, 9.5);
      }
    }
    if (celestialBodies) {
      const {
        sun,
        sunGlow,
        sunOuterGlow,
        earthOrbit,
        earth,
        clouds,
        earthCloudGlow,
        atmosphere,
        moonOrbit,
        moon,
      } = celestialBodies;

      sun.rotation.y += 0.002;
      sun.scale.setScalar(1.45 + Math.sin(t * 1.2) * 0.04);
      sunGlow.material.opacity = 0.78 + Math.sin(t * 1.8) * 0.05;
      sunOuterGlow.material.opacity = 0.24 + Math.cos(t * 1.2) * 0.03;

      earthOrbit.rotation.y += 0.0035;
      earth.rotation.y += 0.01;
      earth.scale.setScalar(1.35 + Math.sin(t * 0.8) * 0.015);

      clouds.rotation.y += 0.012;
      earthCloudGlow.material.opacity = 0.1 + Math.sin(t * 0.7) * 0.02;

      moonOrbit.rotation.y += 0.018;
      moon.rotation.y += 0.01;
      moon.scale.setScalar(1.25 + Math.sin(t * 1.6) * 0.01);

      if (atmosphere?.material?.uniforms?.viewVector) {
        const earthWorldPos = earth.getWorldPosition(new THREE.Vector3());
        atmosphere.material.uniforms.viewVector.value
          .copy(camera.position)
          .sub(earthWorldPos);
      }
    }
    updateTrail();
    if (celestialBodies) {
      const { sun, sunGlow, sunOuterGlow, earthOrbit, earth, moonOrbit, moon } =
        celestialBodies;

      sun.rotation.y += 0.002;
      sunGlow.material.opacity = 0.72 + Math.sin(t * 1.8) * 0.06;
      sunOuterGlow.material.opacity = 0.24 + Math.cos(t * 1.2) * 0.04;

      earthOrbit.rotation.y += 0.0035;
      earth.rotation.y += 0.01;

      moonOrbit.rotation.y += 0.025;
      moon.rotation.y += 0.01;

      sun.scale.setScalar(1.4 + Math.sin(t * 1.2) * 0.05);
      earth.scale.setScalar(1.3 + Math.sin(t * 0.8) * 0.02);
      moon.scale.setScalar(1.25 + Math.sin(t * 1.6) * 0.015);
    }
    renderer.render(scene, camera);
  }

  animate();
}
