export function setupBookingToggle({ onOpen, onClose } = {}) {
  const openBtns = document.querySelectorAll(
    "#open-booking-btn, #open-booking-btn-2, #open-booking-btn-3"
  );

  const closeBtn = document.getElementById("close-booking-btn");
  const bookingSection = document.getElementById("booking");
  const app = document.getElementById("app");

  if (!bookingSection || !app) return;

 const openBooking = () => {
  bookingSection.classList.add("booking-open");
  app.classList.add("booking-active");

  // 🚀 scroll to booking form
  bookingSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (typeof onOpen === "function") {
    onOpen();
  }
};

 const closeBooking = () => {
  bookingSection.classList.remove("booking-open");
  app.classList.remove("booking-active");

  // ⬆️ scroll back to top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (typeof onClose === "function") {
    onClose();
  }
};
  // 🔥 attach to ALL open buttons
  openBtns.forEach((btn) => {
    btn?.addEventListener("click", openBooking);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeBooking);
  }

  return { openBooking, closeBooking };
}