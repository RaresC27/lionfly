"use client";

import { FaMoon, FaSun } from "react-icons/fa";

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function DarkModeToggle({
  darkMode,
  toggleDarkMode,
}: DarkModeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      className={`flex items-center justify-center rounded-full transition-colors duration-300
        ${
          darkMode
            ? "w-8 h-8 bg-gray-200 text-gray-900"
            : "w-8 h-8 bg-white text-[rgb(247,93,57)]"
        }
      `}
      title={darkMode ? "Light mode" : "Dark mode"}
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}
