window.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;

  // ======================
  // THEME TOGGLE (Desktop + Mobile)
  // ======================
  const themeToggleBtns = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ].filter(Boolean) as HTMLElement[];
  // need to filter it because TS thinks it can be null

  const themeIcons = {
    desktop: document.getElementById("theme-icon"),
    mobile: document.getElementById("theme-icon-mobile"),
  };

  // Update icon according to theme
  function updateThemeIcons() {
    const isDark = html.classList.contains("dark");
    const addIcon = isDark ? "fa-moon" : "fa-sun";
    const removeIcon = isDark ? "fa-sun" : "fa-moon";

    Object.values(themeIcons).forEach((icon) => {
      if (icon) {
        icon.classList.remove(removeIcon);
        icon.classList.add(addIcon);
      }
    });
  }

  // Apply saved preference on load
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }
  updateThemeIcons();

  // Attach toggle events
  themeToggleBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        html.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeIcons();
    })
  );

  // ======================
  // INTERACTABLE LOGO (SFX)
  // ======================
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

  // ======================
  // SCROLL DOWN ARROW
  // ======================
  document.getElementById("scroll-down")?.addEventListener("click", () => {
    const nextSection = document.querySelector("main section:nth-child(2)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  });

  // ======================
  // HAMBURGER MENU TOGGLE
  // ======================
  const hamburger = document.getElementById("hamburger") as HTMLButtonElement;
  const mobileMenu = document.getElementById("mobile-menu") as HTMLDivElement;

  let menuOpen = false;

  // ======================
  // MENU ANIMATION
  // ======================
  function toggleMenu(forceClose = false) {
    menuOpen = forceClose ? false : !menuOpen;

    const links = document.getElementById("mobile-menu-links");
    const appearance = document.getElementById("mobile-menu-appearance");

    if (menuOpen) {
      // Fade in background
      mobileMenu.classList.remove("opacity-0", "pointer-events-none");
      mobileMenu.classList.add("opacity-100", "pointer-events-auto");

      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }

      // Animate links + appearance (sliding down & fading in)
      requestAnimationFrame(() => {
        links?.classList.remove("opacity-0", "translate-y-[-20px]");
        links?.classList.add("opacity-100", "translate-y-0");

        appearance?.classList.remove("opacity-0", "translate-y-[-20px]");
        appearance?.classList.add("opacity-100", "translate-y-0");
      });
    } else {
      // Fade out background
      mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
      mobileMenu.classList.add("opacity-0", "pointer-events-none");

      const icon = hamburger.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }

      // Reset links + appearance instantly (so they re-animate next time)
      links?.classList.add("opacity-0", "translate-y-[-20px]");
      links?.classList.remove("opacity-100", "translate-y-0");

      appearance?.classList.add("opacity-0", "translate-y-[-20px]");
      appearance?.classList.remove("opacity-100", "translate-y-0");
    }
  }

  // Close menu when clicking a link
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => toggleMenu());
    mobileMenu
      .querySelectorAll("a")
      .forEach((link) =>
        link.addEventListener("click", () => toggleMenu(true))
      );
  }

  // Close menu on window resize if above md breakpoint
  window.addEventListener("resize", () => {
    // Tailwind's md breakpoint is 768px
    if (window.innerWidth >= 768 && menuOpen) {
      toggleMenu(true); // force close
    }
  });
});
