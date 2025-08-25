const html = document.documentElement;

window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("theme-toggle");

  if (!button) {
    console.error("Theme toggle button not found! What??");
    return;
  }

  button.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  });

  // Apply saved preference
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }
});
