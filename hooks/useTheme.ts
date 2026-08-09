"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "pomelo-theme";
const THEME_EVENT = "pomelo-theme-change";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getTheme(): Theme {
  const selectedTheme = document.documentElement.dataset.theme;

  if (selectedTheme === "light" || selectedTheme === "dark") {
    return selectedTheme;
  }

  return getSystemTheme();
}

function getServerTheme(): Theme {
  return "light";
}

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleSystemChange = () => {
    const selectedTheme = document.documentElement.dataset.theme;

    if (!selectedTheme) {
      callback();
    }
  };

  const handleThemeChange = () => {
    callback();
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) {
      return;
    }

    if (event.newValue === "light" || event.newValue === "dark") {
      document.documentElement.dataset.theme = event.newValue;
    } else {
      delete document.documentElement.dataset.theme;
    }

    callback();
  };

  mediaQuery.addEventListener("change", handleSystemChange);

  window.addEventListener(THEME_EVENT, handleThemeChange);

  window.addEventListener("storage", handleStorageChange);

  return () => {
    mediaQuery.removeEventListener("change", handleSystemChange);

    window.removeEventListener(THEME_EVENT, handleThemeChange);

    window.removeEventListener("storage", handleStorageChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;

    localStorage.setItem(STORAGE_KEY, nextTheme);

    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const useSystemTheme = () => {
    delete document.documentElement.dataset.theme;
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return {
    theme,
    toggleTheme,
    useSystemTheme,
  };
}
