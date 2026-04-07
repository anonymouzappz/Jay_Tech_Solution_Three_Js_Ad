export function setupBookingForm() {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("booking-status");

  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // ✅ fallback values (prevents undefined)
    const name = data.name || "N/A";
    const email = data.email || "N/A";
    const phone = data.phone || "N/A";
    const service = data.service || "N/A";
    const date = data.date || "N/A";
    const time = data.time || "N/A";
    const message = data.message || "N/A";

    const subject = "New Booking Request";

    const body = `
New Booking Request

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}

Details:
${message}
`;

    // ✅ encode for safe URL
    const mailtoLink = `mailto:jpolo239@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // ✅ update UI before redirect
    status.textContent = "Opening email app...";
    status.style.color = "#a78bfa";

    // 🚀 trigger email client
    window.location.href = mailtoLink;

    // optional reset after short delay
    setTimeout(() => {
      form.reset();
      status.textContent = "Fill out the form to book your service.";
      status.style.color = "";
    }, 2000);
  });
}