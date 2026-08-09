"use client";

export default function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement;

    // Si ya había selección manual, regresar al sistema
    if (root.hasAttribute("data-theme")) {
      root.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      return;
    }

    // Si estaba automático, elegir manualmente el tema contrario
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const nextTheme = systemDark ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Cambiar tema"
      title="Cambiar tema"
      onClick={toggleTheme}
    >
      <svg
        className="theme-icon theme-icon-sun"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
      </svg>

      <svg
        className="theme-icon theme-icon-moon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
      </svg>
    </button>
  );
}
