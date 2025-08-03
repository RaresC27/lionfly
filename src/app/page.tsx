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
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Te rugăm să introduci o adresă de email.");
    } else if (!validateEmail(email)) {
      setError("Adresă de email invalidă.");
    } else {
      setError("");
      setSuccess("Te-ai abonat cu succes!");
      console.log("Email trimis:", email);
      setEmail("");
    }
  };

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
      <footer className="bg-[rgb(247,93,57)] text-white p-6 pt-10">
        {/* Newsletter */}
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
              className="p-2 py-2.5 rounded-md text-white bg-white/20 placeholder-white text-center w-64 outline-none"
            />
            <button
              type="submit"
              className="bg-white text-[rgb(247,93,57)] font-semibold px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Abonează-te
            </button>
          </form>
          {error && <p className="text-red-200 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-200 text-sm mt-2">{success}</p>}
        </div>

        {/* Social + Drepturi */}
        <div className="mt-10 flex flex-col justify-center items-center gap-4 text-center">
          <div className="flex gap-6 text-2xl">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
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
