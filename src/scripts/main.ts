window.addEventListener("DOMContentLoaded", () => {
  // DARK MODE TOGGLE
  const html = document.documentElement;
  const button = document.getElementById("theme-toggle");

  if (!button) {
    console.error("Theme toggle button not found! What??");
    return;
  }

  // Check system preference
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

  // INTERACTABLE LOGO CLICK SOUND
  const interactLogo = document.getElementById("interact-logo");

  if (interactLogo) {
    interactLogo.addEventListener("click", () => {
      new Audio("./src/assets/audio/huh.m4a").play();
    });
  }

  //TODO: HAMBURGER MENU TOGGLE
});
