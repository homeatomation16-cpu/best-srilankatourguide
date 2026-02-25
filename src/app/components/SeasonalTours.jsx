"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TOURS } from "../../data/tours";

/* ================= VARIANTS ================= */

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SeasonalTours() {
  const scrollRef = useRef(null);

  /* ===== FILTER ONLY EAST COAST SEASONAL ===== */
  const seasonalTours = TOURS.filter(
    (t) =>
      t.duration !== "1 Day" &&
      (t.title?.toLowerCase().includes("east") ||
        t.category === "Beach")
  );

  /* ===== AUTO SCROLL ===== */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({
        left: 380,
        behavior: "smooth",
      });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 bg-linear-to-b from-white via-orange-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-orange-600 text-xl mb-4 tracking-wide">
            Elite Seasonal Collection
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Seasonal Luxury Experiences
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            Crafted around Sri Lanka’s finest travel seasons —
            delivering cinematic coastlines, elegance,
            and unforgettable moments.
          </p>
        </motion.div>

        {/* ================= AUTO CAROUSEL ================= */}
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-6"
        >
          {seasonalTours.map((tour) => (
            <motion.div
              key={tour.id}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -12 }}
              viewport={{ once: true }}
              className="relative min-w-90 rounded-4xl overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl group transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-linear-to-tr from-orange-500/20 via-transparent to-amber-400/20 blur-2xl"></div>

              {/* IMAGE */}
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* PRICE */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-6 py-2 rounded-full font-semibold shadow-lg">
                  From ${tour.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">
                  {tour.title}
                </h3>

                <div className="space-y-4 text-gray-700 mb-8">

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    {tour.duration}
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    Up to {tour.capacity || 10} Guests
                  </div>

                </div>

                <Link
                  href={`/tours/${tour.id}`}
                  className="block w-full text-center py-4 rounded-full font-semibold text-white bg-linear-to-r from-orange-600 to-amber-500 transition hover:scale-[1.05] hover:shadow-2xl"
                >
                  Explore Luxury Tour
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}