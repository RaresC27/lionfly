"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import HamburgerMenu from "../components/HamburgerMenu";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setName("");
        setEmail("");
        setMessage("");

        // Mesajul dispare după 3 secunde
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "A apărut o eroare.");
      }
    } catch {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-[rgb(247,93,57)] text-white">
      {/* HEADER */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
        <HamburgerMenu />
      </header>

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
          className="flex flex-col gap-5 w-full max-w-lg relative"
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
            disabled={loading}
            className="font-semibold px-6 py-3 rounded-md transition-colors duration-300 bg-white text-[rgb(247,93,57)] hover:bg-gray-200 flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Se trimite..." : "Trimite"}
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
