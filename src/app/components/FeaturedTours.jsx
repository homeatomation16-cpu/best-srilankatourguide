"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { TOURS } from "../../data/tours";

/* ================= ANIMATION VARIANTS ================= */

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function FeatureTours() {

  /* ✅ FIXED FILTER (Number + String Support) */
  const oneDayTours = useMemo(() => {
    return TOURS.filter(
      (tour) =>
        tour.duration === 1 ||
        tour.duration === "1 Day" ||
        tour.duration === "Full Day"
    );
  }, []);

  return (
    <section className="relative py-20 lg:py-32 px-6 bg-white overflow-hidden">

      {/* Background Blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-[120px] opacity-70" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-amber-50 rounded-full blur-[100px] opacity-60" />

      <div className="relative max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-orange-500" />
            <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">
              Private Day Experiences
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight max-w-lg">
              One Day{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                Luxury Tours
              </span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base max-w-xs leading-relaxed lg:text-right">
              Curated private journeys designed around your schedule.
              No compromises, no crowds — just you and the destination.
            </p>
          </div>
        </motion.div>

        {/* ================= GRID ================= */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {oneDayTours.map((tour, i) => (
            <motion.div
              key={tour.id}
              variants={reveal}
              className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* IMAGE */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={tour.image || "/fallback.jpg"}
                  alt={tour.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                  <span className="text-gray-500 text-xs font-semibold font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 bg-white text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-md">
                  From ${tour.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-orange-500 transition-colors duration-300">
                  {tour.title}
                </h3>

                <div className="flex items-center gap-5 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Full Day
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    Up to {tour.maxPeople || 6} guests
                  </span>
                </div>

                <div className="h-px bg-gray-100 mb-6" />

                <Link
                  href={`/tours/${tour.id}`}
                  className="group/btn flex items-center justify-between w-full"
                >
                  <span className="text-sm font-semibold text-orange-500 group-hover/btn:text-orange-600 transition-colors">
                    Explore Tour
                  </span>
                  <div className="w-8 h-8 rounded-full border border-orange-200 flex items-center justify-center group-hover/btn:bg-orange-500 group-hover/btn:border-orange-500 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover/btn:text-white transition-colors duration-300" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ================= BOTTOM CTA ================= */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-100 pt-12"
        >
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm text-center sm:text-left leading-relaxed">
            Every tour can be tailored to your itinerary, group size, and pace.
          </p>

          <Link
            href="/contact"
            className="group/cta inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Customize My Day Tour
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}