export function getGalleryPathPoints() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return null;

  const cards = Array.from(document.querySelectorAll(".gallery-card"));
  if (!cards.length) return null;

  const galleryRect = gallery.getBoundingClientRect();
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;

  const points = cards.map((card, index) => {
    const rect = card.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const worldX = ((centerX / viewportW) - 0.5) * 28;
    const worldY = -((centerY / viewportH) - 0.5) * 18;

    // keep rocket mostly LEFT of the image cards
    const offsetX = -12.5;
    const offsetY = index % 2 === 0 ? 1.2 : -1.0;
    const offsetZ = index % 2 === 0 ? -2.2 : 2.2;

    return {
      x: worldX + offsetX,
      y: worldY + offsetY,
      z: offsetZ,
    };
  });

  const isActive =
    galleryRect.top < viewportH * 0.9 &&
    galleryRect.bottom > viewportH * 0.1;

  return {
    isActive,
    points,
  };
}