"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaHandshake,
  FaChartLine,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import HamburgerMenu from "../components/HamburgerMenu";

export default function AboutPage() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-hidden bg-[#f75d39] text-white">
      {/* HEADER - Hamburger */}
      <header className="fixed top-6 right-6 z-50 flex items-center gap-4 md:hidden">
        <HamburgerMenu />
      </header>

      {/* BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="p-6 pt-24 max-w-4xl mx-auto text-center text- font-medium"
      >
        <ol className="inline-flex items-center text-white/80 space-x-2">
          <li>
            <Link href="/" className="hover:underline text-white">
              Acasă
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-white">Despre noi</li>
        </ol>
      </nav>

      {/* HERO + Logo */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-[70vh] px-6 gap-12">
        <motion.div
          className="text-center md:text-left max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">
            Cine suntem ?
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Suntem <strong>Lionfly</strong>, o echipă pasionată care transformă
            ideile în realitate digitală. Credem în creativitate, tehnologie și
            în puterea poveștilor spuse dintr-o nouă perspectivă.
          </p>
        </motion.div>

        {/* Animated Logo */}
        <motion.img
          src="/logo.png"
          alt="Logo Lionfly"
          className="w-56 h-56"
          initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
          animate={{
            opacity: 1,
            scale: [1, 1.2, 1],
            rotate: [0, 15, -10, 0],
            filter: [
              "drop-shadow(0 0 0px #fff)",
              "drop-shadow(0 0 20px #fff)",
              "drop-shadow(0 0 0px #fff)",
            ],
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </section>

      {/* Why Us Section */}
      <section className="relative z-10 py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            icon: <FaLightbulb size={50} />,
            title: "Creativitate fără limite",
            text: "Aducem idei fresh și originale în fiecare proiect, transformând conceptele în experiențe memorabile.",
          },
          {
            icon: <FaHandshake size={50} />,
            title: "Parteneriate solide",
            text: "Nu lucrăm doar pentru clienți, ci împreună cu ei. Fiecare colaborare este o relație de încredere.",
          },
          {
            icon: <FaChartLine size={50} />,
            title: "Rezultate reale",
            text: "Ne concentrăm pe impact, nu doar pe estetică. Proiectele noastre aduc valoare și schimbare.",
          },
        ].map((value, i) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            className="flex flex-col items-center p-10 bg-white/10 rounded-3xl text-center shadow-xl transform perspective-1000 hover:rotate-3 hover:-translate-y-2 transition-transform"
          >
            <div className="mb-6 text-white">{value.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
            <p className="text-sm opacity-90">{value.text}</p>
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

      {/* Footer */}
      <footer className="p-6 pt-10 mt-16 bg-[#f75d39] text-white">
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

      {/* Background grid */}
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
