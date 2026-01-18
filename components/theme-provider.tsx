"use client";

import { ReactNode, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      {children}
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
        className="fixed bottom-4 right-4 rounded-full border border-border bg-card px-4 py-2 text-xs"
      >
        {theme === "dark" ? "Mode clair" : "Mode sombre"}
      </button>
    </div>
  );
};
