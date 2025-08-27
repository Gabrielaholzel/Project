/* ============================================================================
   THEME + FONT SIZE TOGGLE
   - Theme: Light/Dark
   - Font Size: Adjustable via "-" and "+"
   - Both settings saved in localStorage, persist across pages
============================================================================ */

/* -------------------------------
   THEME TOGGLE
-------------------------------- */
const THEME_KEY = "theme"; // Storage key for theme
const LIGHT = "light";
const DARK = "dark";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeToggleUI(theme);
}

function updateThemeToggleUI(theme) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.textContent = theme === DARK ? "☀️" : "🌙";
}

function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}

function loadTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (_) { return null; }
}

/* -------------------------------
   FONT SIZE TOGGLE
-------------------------------- */
const FONT_KEY = "fontsize"; // Storage key for font size
const MIN_SIZE = 0.8;        // Smallest allowed (rem)
const MAX_SIZE = 1.5;        // Largest allowed (rem)
const STEP = 0.1;            // Change per click

function applyFontSize(size) {
  document.documentElement.style.setProperty("--font-size-base", `${size}rem`);
}

function saveFontSize(size) {
  try { localStorage.setItem(FONT_KEY, size); } catch (_) {}
}

function loadFontSize() {
  try { return parseFloat(localStorage.getItem(FONT_KEY)); } catch (_) { return null; }
}

/* -------------------------------
   INIT
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* THEME INIT */
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = loadTheme();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? DARK : LIGHT);
  applyTheme(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = document.documentElement.getAttribute("data-theme") === DARK ? LIGHT : DARK;
      applyTheme(newTheme);
      saveTheme(newTheme);
    });
  }

  /* FONT SIZE INIT */
  const fontMinus = document.getElementById("fontsize-minus");
  const fontPlus = document.getElementById("fontsize-plus");
  const savedSize = loadFontSize() || 1.0; // Default size
  applyFontSize(savedSize);

  if (fontMinus) {
    fontMinus.addEventListener("click", () => {
      let current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size-base"));
      let newSize = Math.max(MIN_SIZE, current - STEP);
      applyFontSize(newSize);
      saveFontSize(newSize);
    });
  }

  if (fontPlus) {
    fontPlus.addEventListener("click", () => {
      let current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--font-size-base"));
      let newSize = Math.min(MAX_SIZE, current + STEP);
      applyFontSize(newSize);
      saveFontSize(newSize);
    });
  }

  /* SYNC ACROSS TABS */
  window.addEventListener("storage", (e) => {
    if (e.key === THEME_KEY && e.newValue) {
      applyTheme(e.newValue);
    }
    if (e.key === FONT_KEY && e.newValue) {
      applyFontSize(parseFloat(e.newValue));
    }
  });
});
