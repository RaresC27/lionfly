"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import HamburgerMenu from "../components/HamburgerMenu";

const projects = [
  {
    title: "Titlu proiect unu",
    description: "Descriere proiect unu",
    image: "/project1.jpg",
  },
  {
    title: "Titlu proiect doi",
    description: "Descriere proiect doi",
    image: "/project2.jpg",
  },
  {
    title: "Titlu proiect trei",
    description: "Descriere proiect trei",
    image: "/project3.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-[#f75d39] text-white">
      {/* HEADER - Hamburger */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
        <HamburgerMenu />
      </header>
      {/* BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="p-6 pt-24 max-w-4xl mx-auto text-center font-medium"
      >
        <ol className="inline-flex items-center text-white/80 space-x-2">
          <li>
            <Link href="/" className="hover:underline text-white">
              Acasă
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-white">Proiecte</li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
        <motion.h1
          className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Proiectele noastre
        </motion.h1>

        {/* Text animat litere cu litere */}
        <motion.div className="flex justify-center overflow-hidden">
          {"Fly your vision to the sky with our projects!"
            .split("")
            .map((char, i) => (
              <motion.span
                key={i}
                className="text-white text-lg md:text-2xl font-poppins font-bold"
                variants={{
                  hidden: { opacity: 0, y: 20, rotate: -10 },
                  visible: { opacity: 1, y: 0, rotate: 0 },
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.3, delay: 1 + i * 0.05 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </motion.div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-20 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="group relative rounded-3xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <div className="h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-sm opacity-90">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section: Vrei să colaborăm? */}
      <section className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 text-center bg-white/10 rounded-3xl max-w-4xl mx-auto my-12">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Vrei să colaborăm?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Suntem gata să aducem ideile tale la viață. Hai să creăm împreună ceva
          extraordinar!
        </motion.p>
        <motion.a
          href="/contact"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-md bg-white text-[#f75d39] hover:bg-gray-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contactează-ne
        </motion.a>
      </section>

      {/* FOOTER */}
      <footer className="p-6 pt-10 mt-16 bg-[#f75d39] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex gap-6 text-2xl justify-center mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Lionfly. Toate drepturile rezervate.
          </p>
        </div>
      </footer>

      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "moveGrid 20s linear infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes moveGrid {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 100px 100px;
          }
        }
      `}</style>
    </div>
  );
}
