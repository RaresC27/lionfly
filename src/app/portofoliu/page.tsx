"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok, FaMoon, FaSun } from "react-icons/fa";

interface Project {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
  video?: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Aerial Event Poster",
    date: "2024-06-15",
    description:
      "Un poster pentru un eveniment aerian spectaculos, realizat cu o grafică de impact și detalii precise.",
    image: "/images/aerial-event-poster.jpg",
  },
  {
    id: 2,
    name: "Drone Videography",
    date: "2024-07-01",
    description:
      "Videografie realizată cu drone de ultimă generație pentru un eveniment privat în aer liber.",
    image: "/images/drone-videography.jpg",
    video: "/videos/drone-event.mp4",
  },
  {
    id: 3,
    name: "Corporate Branding",
    date: "2024-08-10",
    description:
      "Proiect de branding corporativ cu accent pe elemente moderne și profesionalism.",
    image: "/images/corporate-branding.jpg",
  },
];

export default function PortfolioPage() {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDark = localStorage.getItem("darkMode");
    if (savedDark !== null) setDarkMode(savedDark === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const openModal = (project: Project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const toggleDarkMode = () => setDarkMode((v) => !v);

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col ${
        darkMode
          ? "bg-gray-900 text-gray-200"
          : "bg-[rgb(247,93,57)] text-white"
      }`}
    >
      {/* HEADER */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
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

        <button
          onClick={toggleDarkMode}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
            darkMode
              ? "bg-gray-200 text-gray-900"
              : "bg-white text-[rgb(247,93,57)]"
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </header>

      {/* MENIU MOBILE */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-10 z-40 ${
              darkMode
                ? "bg-gray-900 text-gray-200"
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

      {/* Breadcrumb & Titlu */}
      <nav aria-label="Breadcrumb" className="w-full flex justify-center mb-10">
        <ol className="flex items-center space-x-2 text-white opacity-90 font-medium text-center">
          <li>
            <a href="/" className="hover:underline">
              Acasă
            </a>
          </li>
          <li>/</li>
          <li className="font-bold text-lg">Portofoliu</li>
        </ol>
      </nav>

      <h1 className="max-w-6xl w-full text-center text-5xl font-extrabold mb-12 drop-shadow-lg">
        Proiectele Noastre
      </h1>

      {/* Grid Proiecte */}
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 pb-20">
        {projects.map((p) => (
          <motion.div
            key={p.id}
            layout
            onClick={() => openModal(p)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer bg-white bg-opacity-30 rounded-3xl p-6 shadow-lg overflow-hidden
              flex flex-col justify-between hover:bg-opacity-50 transition-opacity duration-300"
          >
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[rgb(247,93,57)] opacity-30 mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-[rgb(247,93,57)] opacity-20 mix-blend-screen pointer-events-none"></div>

            <div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: "rgb(247,93,57)" }}
              >
                {p.name}
              </h3>

              <p className="text-sm mb-3 opacity-90 text-gray-700 drop-shadow">
                {p.date}
              </p>
              <p className="text-sm line-clamp-4 text-gray-700 drop-shadow">
                {p.description}
              </p>
            </div>

            <img
              src={p.image}
              alt={p.name}
              className="mt-6 w-full h-48 object-cover rounded-2xl shadow-md"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[rgb(247,93,57)] bg-opacity-95 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              layout
              className="relative bg-white bg-opacity-90 rounded-4xl max-w-4xl w-full max-h-[90vh] overflow-auto flex flex-col text-gray-900 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="absolute top-6 right-6 text-5xl text-[rgb(247,93,57)] hover:text-orange-600 font-bold z-20"
              >
                ×
              </button>

              <div className="w-full max-h-96 overflow-hidden rounded-t-3xl border-b-2 border-[rgb(247,93,57)]">
                {modalProject.video ? (
                  <video
                    src={modalProject.video}
                    controls
                    className="w-full object-cover max-h-96 rounded-t-3xl"
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={modalProject.image}
                    alt={modalProject.name}
                    className="w-full object-cover max-h-96 rounded-t-3xl"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="p-10 flex flex-col gap-4">
                <h2 className="text-4xl font-extrabold text-[rgb(247,93,57)]">
                  {modalProject.name}
                </h2>
                <p className="font-semibold text-lg opacity-90">
                  Data: {modalProject.date}
                </p>
                <p className="text-lg leading-relaxed">
                  {modalProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer
        className={`p-6 pt-10 ${
          darkMode
            ? "bg-gray-900 text-gray-200"
            : "bg-[rgb(247,93,57)] text-white"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex gap-6 text-2xl justify-center mb-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={darkMode ? "hover:text-gray-400" : "hover:text-white"}
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={darkMode ? "hover:text-gray-400" : "hover:text-white"}
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
