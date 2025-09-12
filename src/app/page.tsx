"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import HamburgerMenu from "./components/HamburgerMenu";

const phrases = [
  "Your vision",
  "from a",
  "whole new perspective",
  "— launching soon.",
];

export default function LandingPage() {
  const [step, setStep] = useState<"logo" | "text">("logo");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Te rugăm să introduci o adresă de email.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Adresă de email invalidă.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setEmail("");
      } else {
        setError(data.error || "A apărut o eroare la abonare.");
      }
    } catch {
      setError("Eroare de conexiune.");
    }
  };

  return (
    <div className="relative flex flex-col h-screen w-full overflow-hidden bg-[rgb(247,93,57)]">
      {/* Header */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
        <HamburgerMenu />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-16 -translate-y-8 space-y-4 relative">
        {/* Background grid doar în jurul textului */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
            WebkitMaskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "80% 80%",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 70%)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "80% 80%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        ></div>

        <AnimatePresence mode="wait">
          {step === "logo" && (
            <motion.img
              src="/logo.png"
              alt="Logo"
              key="logo"
              initial={{ x: "-100vw", opacity: 0, rotate: -15 }}
              animate={{ x: 0, opacity: 1, rotate: [0, 10, -5, 0] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                x: { duration: 2.5, ease: "easeInOut" },
                opacity: { duration: 0.8 },
                rotate: { duration: 2.5, ease: "easeInOut" },
                scale: { duration: 0.8 },
              }}
              className="w-64 h-64 relative z-10"
            />
          )}

          {step === "text" && (
            <motion.h1
              key={phrases[phraseIndex]}
              className="text-6xl font-extrabold text-center relative z-10"
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

      {/* Footer */}
      <footer className="p-6 pt-10 bg-[rgb(247,93,57)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Abonează-te la newsletter
          </h2>
          <p className="mb-4 text-sm">
            Primește cele mai noi oferte și noutăți direct pe email
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Introdu adresa ta de email"
              className="p-2 py-2.5 rounded-md text-center outline-none w-64 placeholder-opacity-70 border transition-all duration-300 bg-white/20 text-white placeholder-white border-white/40 focus:border-white"
            />

            <button
              type="submit"
              className="font-semibold px-4 py-2 rounded-md bg-white text-[rgb(247,93,57)] hover:bg-gray-200 transition-colors duration-300"
            >
              Abonează-te
            </button>
          </form>
          {error && <p className="text-white text-sm mt-2">{error}</p>}
          {success && <p className="text-white text-sm mt-2">{success}</p>}
        </div>

        <div className="mt-10 flex flex-col justify-center items-center gap-4 text-center">
          <div className="flex gap-6 text-2xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-200"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-gray-200"
            >
              <FaTiktok />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Lionfly. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
}
