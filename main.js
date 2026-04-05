import "./style.css";

import { setupAudio } from "./utils/ui/audio.js";
import { setupBookingForm } from "./utils/ui/bookingForm.js";
import { setupBookingToggle } from "./utils/ui/bookingToggle.js";
import { createLayout } from "./utils/ui/createLayout.js";
import { setupGalleryScroll } from "./utils/ui/galleryScroll.js";
import { applyResponsiveLayout } from "./utils/ui/responsive.js";

import { startAnimation } from "./utils/three/animate.js";
import { createBookingScene } from "./utils/three/bookingScene.js";
import { addClouds } from "./utils/three/clouds.js";
import { addLights } from "./utils/three/lights.js";
import { addLogo } from "./utils/three/logo.js";
import { addRocket } from "./utils/three/rocket.js";
import { createScene } from "./utils/three/scene.js";
import { addStars } from "./utils/three/stars.js";

import { setupGalleryInteractive } from "./utils/ui/galleryInteractive.js";

import { addCelestialBodies } from "./utils/three/celestialBodies.js";

createLayout();
setupGalleryInteractive();
setupBookingForm();
setupGalleryScroll();
applyResponsiveLayout();

const bookingSceneController = createBookingScene();

const { scene, camera, renderer } = createScene();

addLights(scene);
const celestialBodies = addCelestialBodies(scene);
const stars = addStars(scene);
const cloudParticles = addClouds(scene);

const {
  rocketGroup,
  flame,
  trail,
  trailPositions,
  trailGeometry,
  motionState,
} = addRocket(scene);

const logoGroup = addLogo(scene);

setupAudio();

setupBookingToggle({
  onOpen: () => {
    if (bookingSceneController) {
      bookingSceneController.hideRocket();
    }

    rocketGroup.visible = true;
    trail.visible = true;

    motionState.fromX = rocketGroup.position.x;
    motionState.fromY = rocketGroup.position.y;
    motionState.fromZ = rocketGroup.position.z;

    motionState.toX = 18.2;
    motionState.toY = 10.8;
    motionState.toZ = 1.5;

    motionState.progress = 0;
    motionState.mode = "travelToBooking";
  },

  onClose: () => {
    if (bookingSceneController) {
      bookingSceneController.hideRocket();
    }

    rocketGroup.visible = true;
    trail.visible = true;

    motionState.fromX = rocketGroup.position.x;
    motionState.fromY = rocketGroup.position.y;
    motionState.fromZ = rocketGroup.position.z;

    motionState.toX = 3.5;
    motionState.toY = 10 + logoGroup.position.y;
    motionState.toZ = 0;

    motionState.progress = 0;
    motionState.mode = "travelToLogo";
  },
});

startAnimation({
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
  onBookingArrive: () => {
    rocketGroup.visible = false;
    trail.visible = false;

    if (bookingSceneController) {
      bookingSceneController.showRocket();
    }
  },
  onLogoArrive: () => {
    rocketGroup.visible = true;
    trail.visible = true;

    if (bookingSceneController) {
      bookingSceneController.hideRocket();
    }
  },
});

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  applyResponsiveLayout();
  setTimeout(() => {
    const btn2 = document.getElementById("open-booking-btn-2");
    const mainBtn = document.getElementById("open-booking-btn");

    if (btn2 && mainBtn) {
      btn2.addEventListener("click", () => {
        mainBtn.click();
      });
    }
  }, 0);
  if (bookingSceneController?.onResize) {
    bookingSceneController.onResize();
  }
});
