export function setupGalleryInteractive() {
  const items = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("gallery-modal");
  const closeBtn = document.getElementById("gallery-modal-close");
  const modalImage = document.getElementById("gallery-modal-image");
  const modalVideo = document.getElementById("gallery-modal-video");

  if (!items.length || !modal || !closeBtn || !modalImage || !modalVideo) return;

  const clearActive = () => {
    items.forEach((item) => item.classList.remove("is-active"));
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    modalImage.classList.remove("is-active");
    modalVideo.classList.remove("is-active");

    modalImage.removeAttribute("src");
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();

    document.body.style.overflow = "";
    clearActive();
  };

  const openModal = (item) => {
    const type = item.dataset.type;
    const src = item.dataset.src;

    clearActive();
    item.classList.add("is-active");

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (type === "video") {
      modalImage.classList.remove("is-active");
      modalImage.removeAttribute("src");

      modalVideo.src = src;
      modalVideo.classList.add("is-active");
      modalVideo.load();
      modalVideo.play().catch(() => {});
    } else {
      modalVideo.classList.remove("is-active");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();

      modalImage.src = src;
      modalImage.classList.add("is-active");
    }
  };

  items.forEach((item) => {
    item.addEventListener("click", () => openModal(item));

    const video = item.querySelector("video");
    if (video) {
      item.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
      });

      item.addEventListener("mouseleave", () => {
        video.play().catch(() => {});
      });
    }
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}