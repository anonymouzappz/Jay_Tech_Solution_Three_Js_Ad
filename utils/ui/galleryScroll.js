export function setupGalleryScroll() {
  const btn = document.getElementById("gallery-btn");
  const gallery = document.getElementById("gallery");

  if (!btn || !gallery) return;

  btn.addEventListener("click", () => {
    gallery.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}