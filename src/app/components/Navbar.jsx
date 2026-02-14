"use client";

import { useEffect, useState } from "react";
import { Menu, PhoneIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Destinations", href: "/destinations" },
    { label: "Excursions", href: "/excursions" },
    { label: "Offers", href: "#offers" },
    { label: "Vehiles", href: "/vehicles" },
    { label: "Tailor Made", href: "/tailor-made" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500
      ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl text-neutral-900 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sri Lanka Tours Driver"
            width={70}
            height={70}
            priority
            className="rounded-full"
          />

          <div className="hidden sm:block leading-tight">
            <p className="font-bold text-amber-400 text-xl">
              Sri Lanka Tours
            </p>
            <p className="text-xs text-gray-800 tracking-wide">
              Luxury Travel Experience
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">

          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-medium text-gray-800 hover:text-orange-500 transition"
            >
              {item.label}

              {/* underline hover */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* CTA */}
          <a
            href="tel:+94769300334"
            className="bg-linear-to-r from-orange-500 to-amber-400 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg hover:scale-105 transition"
          >
            Call Now <PhoneIcon className="inline ml-2" size={16} />
          </a>

        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/50 backdrop-blur-xl shadow-xl"
          >
            <div className="px-6 py-8 space-y-6">

              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-medium text-gray-800 hover:text-orange-500"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href="tel:+94769300334"
                className="block bg-orange-500 text-white text-center py-3 rounded-full font-semibold"
              >
                Call Now
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
