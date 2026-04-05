export function applyResponsiveLayout() {
  const content = document.getElementById("content");
  const statsGrid = document.getElementById("stats-grid");

  if (!content || !statsGrid) return;

  if (window.innerWidth < 920) {
    content.classList.add("mobile-layout");
    statsGrid.classList.add("mobile-stats");
  } else {
    content.classList.remove("mobile-layout");
    statsGrid.classList.remove("mobile-stats");
  }
}