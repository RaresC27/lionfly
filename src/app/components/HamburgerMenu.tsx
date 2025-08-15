"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((v) => !v);

  const menuItems = ["Acasa", "Despre noi", "Portofoliu", "Contact"];

  return (
    <>
      {/* Hamburger/X button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block w-8 h-1 bg-white rounded"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-8 h-1 bg-white rounded"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block w-8 h-1 bg-white rounded"
        />
      </button>

      {/* Animated menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 z-40 bg-[rgb(247,93,57)] text-white"
          >
            {menuItems.map((item) => {
              const href =
                item === "Acasa" ? "/" : item === "Contact" ? "/contact" : "#";
              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-semibold hover:underline"
                >
                  {item}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
