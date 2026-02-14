"use client";
import { FaWhatsapp } from "react-icons/fa";

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <>
      {/* WhatsApp Floating Chat */}
      <a
        href="https://wa.me/94769300334"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>

      {/* Sticky Mobile Call Button */}
      <a
        href="tel:+94769300334"
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-orange-600 text-white py-4 flex items-center justify-center gap-3 font-bold text-lg shadow-2xl"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
        Call Now
      </a>
    </>
  );
}
