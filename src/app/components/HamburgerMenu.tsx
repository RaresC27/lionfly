"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HamburgerMenuProps {
  darkMode: boolean;
}

export default function HamburgerMenu({ darkMode }: HamburgerMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  return (
    <>
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="flex flex-col justify-between w-8 h-6 md:hidden focus:outline-none"
      >
        <span
          className={`block h-1 rounded transition-all duration-300 ${
            darkMode ? "bg-gray-200" : "bg-white"
          } ${isMenuOpen ? "rotate-45 translate-y-2 w-8" : "w-8"}`}
        />
        <span
          className={`block h-1 rounded transition-all duration-300 ${
            darkMode ? "bg-gray-200" : "bg-white"
          } ${isMenuOpen ? "opacity-0 w-5" : "w-5"}`}
        />
        <span
          className={`block h-1 rounded transition-all duration-300 ${
            darkMode ? "bg-gray-200" : "bg-white"
          } ${isMenuOpen ? "-rotate-45 -translate-y-2 w-8" : "w-4"}`}
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 z-40 ${
              darkMode
                ? "bg-black text-gray-200"
                : "bg-[rgb(247,93,57)] text-white"
            }`}
          >
            {["Acasa", "Despre noi", "Portofoliu", "Contact"].map((item) => {
              const href =
                item === "Acasa" ? "/" : item === "Contact" ? "/contact" : "#";
              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-semibold hover:underline"
                >
                  {item}
                </Link>
              );
            })}
            <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="absolute top-6 right-6 text-3xl font-bold"
            >
              ×
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
