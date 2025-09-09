window.addEventListener("DOMContentLoaded", () => {
  // DARK MODE TOGGLE
  const html = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleIcon = document.getElementById("theme-icon");

  if (!themeToggleBtn) {
    console.error("Theme toggle button not found!");
    return;
  }

  // A helper to update the icon based on current theme
  function updateThemeIcon() {
    if (!themeToggleIcon) {
      console.error("Theme toggle icon not found!");
      return;
    }

    if (html.classList.contains("dark")) {
      themeToggleIcon.classList.remove("fa-sun");
      themeToggleIcon.classList.add("fa-moon");
    } else {
      themeToggleIcon.classList.remove("fa-moon");
      themeToggleIcon.classList.add("fa-sun");
    }
  }

  // Apply saved preference on load
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }
  updateThemeIcon();

  // Handle click toggle
  themeToggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");

    // Save preference
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );

    updateThemeIcon();
  });

  // INTERACTABLE LOGO CLICK SOUND
  const interactLogo = document.getElementById("interact-logo");

  if (interactLogo) {
    interactLogo.addEventListener("click", () => {
      const sounds = [
        "./src/assets/audio/huh.m4a",
        "./src/assets/audio/scream.m4a",
      ];

      const sfxRandomIndex = Math.floor(Math.random() * sounds.length);
      new Audio(sounds[sfxRandomIndex]).play();
    });
  }

  document.getElementById("scroll-down")?.addEventListener("click", () => {
    const nextSection = document.querySelector("main section:nth-child(2)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  });
  //TODO: HAMBURGER MENU TOGGLE
});
