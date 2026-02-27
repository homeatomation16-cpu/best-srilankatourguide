"use client";

import Image from "next/image";
import Link from "next/link";
import { EXCURSIONS } from "../../data/excursions";

export default function ExcursionsPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] font-serif">
      {/* HERO HEADER */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden text-center">
        {/* Background Image */}
        <Image
          src="/excursions-cover.jpg"
          alt="Sri Lanka Excursions"
          fill
          priority
          className="object-fill absolute top-0 transition-transform duration-700 hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-white">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#d4a853]">
            Explore Sri Lanka
          </p>

          <h1
            className="mb-5 text-5xl font-bold leading-tight md:text-7xl"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Excursions
          </h1>

          <div className="mb-5 h-px w-20 bg-[#d4a853]" />

          <p className="max-w-md font-sans text-sm font-light leading-relaxed text-gray-200 md:text-base">
            Discover the most beautiful experiences across the pearl of the
            Indian Ocean.
          </p>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#faf7f2] to-transparent" />
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6">
          {EXCURSIONS.map((item, index) => (
            <Link
              key={item.id}
              href={`/excursions/${item.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-40 w-full sm:h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Permanent dark gradient at bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1209]/80 via-[#1a1209]/20 to-transparent" />

                {/* Hover overlay brightens slightly */}
                <div className="absolute inset-0 bg-[#d4a853]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Number badge */}
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a1209]/70 font-sans text-[10px] font-bold text-[#d4a853] backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                {/* Gold accent line */}
                <div className="mb-1.5 h-px w-5 bg-[#d4a853] transition-all duration-300 group-hover:w-10" />
                <p className="font-sans text-xs font-semibold leading-snug text-white drop-shadow-sm sm:text-sm">
                  {item.title}
                </p>
                <span className="mt-1 inline-flex items-center gap-1 font-sans text-[10px] font-medium uppercase tracking-widest text-[#d4a853] opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </div>

              {/* Bottom border sweep */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4a853] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* Footer accent */}
      <div className="pb-14 text-center">
        <div className="mx-auto h-px w-20 bg-[#d4a853]/40" />
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-[#9e8e7e]">
          Pearl of the Indian Ocean
        </p>
      </div>
    </main>
  );
}
