"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TOURS } from "../../data/tours";

const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SeasonalTours() {
  const scrollRef = useRef(null);

  const seasonalTours = TOURS.filter(
    (t) =>
      t.duration !== "1 Day" &&
      (t.title?.toLowerCase().includes("east") ||
        t.category === "Beach")
  );

  /* ===== AUTO SCROLL WITH TOUCH PAUSE ===== */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isUserScrolling = false;

    const onTouchStart = () => (isUserScrolling = true);
    const onTouchEnd = () => (isUserScrolling = false);

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchend", onTouchEnd);

    const interval = setInterval(() => {
      if (isUserScrolling) return;

      container.scrollBy({ left: 320, behavior: "smooth" });

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      {/* ===== HEADER ===== */}
      <motion.div
        className="text-center max-w-2xl mx-auto px-6 mb-14"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <span className="inline-block text-xs tracking-[0.25em] uppercase text-amber-700 border border-amber-600/40 px-4 py-1 rounded-full mb-5">
          Elite Seasonal Collection
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-700 mb-4">
          Seasonal Luxury Experiences
        </h2>

        <p className="text-stone-900/60 text-sm sm:text-base leading-relaxed">
          Crafted around Sri Lanka's finest travel seasons —
          cinematic coastlines, elegance and unforgettable moments.
        </p>
      </motion.div>

      {/* ===== CAROUSEL ===== */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-center px-6 x-scollbar-hide"
        >
          {seasonalTours.map((tour) => (
            <div
              key={tour.id}
              className="relative snap-center shrink-0 w-[78%] max-w-[320px] sm:w-75 lg:w-90 h-100 lg:h-115 rounded-2xl overflow-hidden bg-neutral-900"
            >
              {/* IMAGE */}
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                sizes="(max-width:768px) 78vw, 360px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

              {/* PRICE BADGE */}
              <div className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full z-10 shadow">
                From ${tour.price}
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-3">
                <h3 className="text-white font-semibold text-lg leading-snug">
                  {tour.title}
                </h3>

                <div className="flex gap-4 text-white/70 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {tour.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    Up to {tour.capacity || 10}
                  </span>
                </div>

                <Link
                  href={`/tours/${tour.slug || tour.id}`}
                  className="inline-block bg-amber-400 text-black text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full w-fit hover:opacity-90 transition"
                >
                  Explore Tour
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}