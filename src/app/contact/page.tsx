"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Te rugăm să introduci numele tău.");
      setSuccess("");
      return;
    }
    if (!email.trim()) {
      setError("Te rugăm să introduci o adresă de email.");
      setSuccess("");
      return;
    }
    if (!validateEmail(email)) {
      setError("Adresă de email invalidă.");
      setSuccess("");
      return;
    }
    if (!message.trim()) {
      setError("Te rugăm să introduci un mesaj.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Mesajul a fost trimis cu succes!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-[rgb(247,93,57)] text-white">
      {/* HEADER */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
        {/* Burger menu */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="flex flex-col justify-between w-8 h-6 focus:outline-none"
        >
          <span
            className={`block h-1 rounded bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2 w-8" : "w-8"
            }`}
          />
          <span
            className={`block h-1 rounded bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0 w-5" : "w-5"
            }`}
          />
          <span
            className={`block h-1 rounded bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2 w-8" : "w-4"
            }`}
          />
        </button>
      </header>

      {/* MENIU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 z-40 bg-[rgb(247,93,57)] text-white"
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
          </motion.nav>
        )}
      </AnimatePresence>

      {/* BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="p-6 pt-24 max-w-4xl mx-auto text-m font-medium"
      >
        <ol className="flex text-gray-200 space-x-2">
          <li>
            <Link href="/" className="hover:underline text-white">
              Acasa
            </Link>
          </li>
          <li>
            <span>/</span>
          </li>
          <li className="font-semibold text-white">Contact</li>
        </ol>
      </nav>

      {/* MAIN */}
      <main className="flex-grow flex flex-col items-center justify-start max-w-4xl mx-auto px-6 w-full">
        <motion.h1
          className="text-4xl font-extrabold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Contactează-ne
        </motion.h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Numele tău"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
              setSuccess("");
            }}
            className="p-2 py-2.5 rounded-md text-center outline-none w-full placeholder-opacity-70 border transition-all duration-300 bg-white/20 text-white placeholder-white border-white/40 focus:border-white"
          />

          <input
            type="email"
            placeholder="Adresa ta de email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setSuccess("");
            }}
            className="p-2 py-2.5 rounded-md text-center outline-none w-full placeholder-opacity-70 border transition-all duration-300 bg-white/20 text-white placeholder-white border-white/40 focus:border-white"
          />

          <textarea
            placeholder="Mesajul tău"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
              setSuccess("");
            }}
            rows={6}
            className="p-2 py-2.5 rounded-md text-center outline-none w-full resize-none placeholder-opacity-70 border transition-all duration-300 bg-white/20 text-white placeholder-white border-white/40 focus:border-white"
          />

          <button
            type="submit"
            className="font-semibold px-6 py-3 rounded-md transition-colors duration-300 bg-white text-[rgb(247,93,57)] hover:bg-gray-200"
          >
            Trimite
          </button>
        </form>

        {error && (
          <p className="text-white text-sm mt-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-white text-sm mt-4 text-center">{success}</p>
        )}

        <div className="mt-10 text-center text-l font-medium space-x-3">
          <a
            href="mailto:contact@lionfly.ro"
            className="hover:underline text-white"
          >
            contact@lionfly.ro
          </a>
          <span>|</span>
          <a
            href="https://wa.me/40722340899"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-white"
          >
            0722 340 899
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="p-6 pt-10 mt-16 bg-[rgb(247,93,57)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex gap-6 text-2xl justify-center mb-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-white"
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
