"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { vehicles } from "../../data/vehicles";
import { useRef, useEffect, useState } from "react";

export default function VehiclesSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = vehicles.slice(0, 6);

  /* ───────────────── Auto Scroll ───────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const gap = 24;

    const getCardWidth = () => {
      const card = el.querySelector("a");
      return card ? card.offsetWidth + gap : 0;
    };

    const interval = setInterval(() => {
      const cardWidth = getCardWidth();
      if (!cardWidth) return;

      const nextIndex =
        activeIndex === featured.length - 1 ? 0 : activeIndex + 1;

      el.scrollTo({
        left: nextIndex * cardWidth,
        behavior: "smooth",
      });

      setActiveIndex(nextIndex);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [activeIndex, featured.length]);

  /* ───────────────── Manual Scroll Tracking ───────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const card = el.querySelector("a");
      if (!card) return;
      const gap = 24;
      const cardWidth = card.offsetWidth + gap;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i) => {
    const el = scrollRef.current;
    const card = el?.querySelector("a");
    if (!el || !card) return;

    const gap = 24;
    const cardWidth = card.offsetWidth + gap;

    el.scrollTo({
      left: i * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">
              Our Fleet
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-stone-800">
              Travel in{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-400">
                Style
              </span>
            </h2>

            <p className="mt-4 text-sm text-stone-500 max-w-sm leading-relaxed">
              Handpicked vehicles maintained to the highest standard.
            </p>
          </div>

          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm font-semibold border border-stone-300 rounded-full px-6 py-3 text-stone-600 hover:text-orange-600 hover:border-orange-400 bg-white shadow-sm hover:shadow-md transition-all duration-300 group whitespace-nowrap"
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {featured.map((v) => (
            <Link
              key={v.id}
              href={`/vehicles/${v.id}`}
              className="flex-none w-72 md:w-80 snap-start rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={v.image || "/placeholder.jpg"}
                  alt={v.name || "Vehicle"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                {v.price && (
                  <div className="absolute top-3 right-3 bg-white/95 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {v.price}/day
                  </div>
                )}

                <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {v.type || "Vehicle"}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-stone-800 mb-3">
                  {v.name}
                </h3>

                <div className="flex items-center gap-4 text-xs text-stone-500 mb-4">
                  {v.passengers && (
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      {v.passengers} pax
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Settings className="w-3.5 h-3.5 text-amber-500" />
                    {v.transmission || "Auto"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-amber-500" />
                    {v.fuel || "Petrol"}
                  </span>
                </div>

                <div className="w-full text-center py-2.5 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white text-xs font-bold uppercase tracking-wider">
                  Book Now
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dots */}
        {featured.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-7 h-2 bg-orange-500"
                    : "w-2 h-2 bg-stone-300 hover:bg-orange-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}