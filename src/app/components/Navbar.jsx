"use client";

import { useEffect, useState } from "react";
import { Menu, PhoneIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 40);
      setHidden(currentY > lastY && currentY > 120);

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "Excursions", href: "/excursions" },
    { label: "Offers", href: "#offers" },
    { label: "Vehicles", href: "/vehicles" },
    { label: "Tailor Made", href: "/tailor-made-tours" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sri Lanka Tours"
            width={60}
            height={60}
            priority
            className="rounded-full border border-amber-400/40"
          />

          <div className="hidden sm:block leading-tight">
            <p className="font-bold text-amber-400 text-xs tracking-wide">
              Sri Lanka Tours
            </p>
            <p className="text-xs text-white/70 tracking-widest uppercase">
              Luxury Experience
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 xl:gap-14">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative text-xs font-semibold tracking-wide transition ${
                scrolled ? "text-white" : "text-white"
              }`}
            >
              {item.label}

              {/* Gold underline */}
              <span className="absolute left-0 -bottom-2 w-0 h-px bg-linear-to-r from-amber-400 to-yellow-200 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {/* CALL CTA */}
          <a
            href="tel:+94769300334"
            className="
              bg-linear-to-rrom-amber-500 via-yellow-400 to-amber-500
              text-black
              px-8 py-3
              rounded-full
              font-semibold
              tracking-wide
              shadow-lg
              hover:scale-105
              hover:shadow-amber-400/40
              transition
              flex items-center gap-2
            "
          >
            Call
            <PhoneIcon size={16} />
          </a>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-amber-400/20"
          >
            <div className="px-6 py-10 space-y-8 text-center">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg text-white/90 tracking-wide hover:text-amber-400 transition"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="tel:+94769300334"
                className="inline-block bg-linear-to-r from-amber-500 to-yellow-300 text-black px-8 py-3 rounded-full font-semibold"
              >
                Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}