"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const phrases = [
  "Your vision",
  "from a",
  "whole new perspective",
  "— launching soon.",
];

export default function LandingPage() {
  const [step, setStep] = useState<"logo" | "text">("logo");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (step === "logo") {
      timer = setTimeout(() => {
        setStep("text");
        setPhraseIndex(0);
      }, 4300);
    } else {
      timer = setTimeout(() => {
        if (phraseIndex < phrases.length - 1) {
          setPhraseIndex(phraseIndex + 1);
        } else {
          setStep("logo");
        }
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [step, phraseIndex]);

  return (
    <div className="relative flex flex-col h-screen w-full bg-[rgb(247,93,57)] overflow-hidden">
      <main className="flex-grow flex flex-col items-center justify-center pt-16 -translate-y-8 space-y-4 relative">
        <AnimatePresence mode="wait">
          {step === "logo" && (
            <motion.img
              src="/logo.png"
              alt="Logo"
              initial={{ x: "-100vw", opacity: 0, rotate: -15 }}
              animate={{ x: 0, opacity: 1, rotate: [0, 10, -5, 0] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                x: { duration: 2.5, ease: "easeInOut" },
                opacity: { duration: 0.8 },
                rotate: { duration: 2.5, ease: "easeInOut" },
                scale: { duration: 0.8 },
              }}
              className="w-64 h-64"
              key="logo"
            />
          )}

          {step === "text" && (
            <motion.h1
              key={phrases[phraseIndex]}
              className="text-6xl font-extrabold text-center"
              style={{ color: "#f7f0e8", lineHeight: "1.2" }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1.1, opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.8,
                },
                opacity: { duration: 0.5 },
                y: { duration: 0.5 },
              }}
            >
              {phrases[phraseIndex]}
            </motion.h1>
          )}
        </AnimatePresence>
      </main>

      {/* Footer fixat jos */}
      <footer className="flex justify-center gap-12 p-4 fixed bottom-0 left-0 w-full bg-[rgb(247,93,57)] z-50">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white text-3xl"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="text-white text-3xl"
        >
          <FaTiktok />
        </a>
      </footer>
    </div>
  );
}
