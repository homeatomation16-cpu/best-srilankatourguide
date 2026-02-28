"use client";

import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS } from "../../data/destinations";

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-[#faf7f2] ">



      {/* ================= HERO SECTION ================= */}
      <header>
      <div className="relative h-screen w-full overflow-hidden">

  <Image
    src="/cover.jpg"
    alt="Sri Lanka"
    fill
    priority
    className="object-cover"
  />

  {/* Dark top overlay */}
  <div className="absolute inset-0 bg-black/40" />

  {/* Bottom fog gradient */}
  <div className="absolute bottom-0 left-0 right-0 h-64 
                  bg-linear-to-t from-white via-white/70 to-transparent" />

</div>

        {/* Hero Content */}
        <div className="relative pt-36 flex h-full flex-col items-center justify-center px-4 text-center text-white">

          <p className="mb-2 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
            Travel Guide
          </p>

          <div
            className="flex flex-row gap-4 mb-6 lg:text-3xl font-bold leading-tight "
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Sri Lanka
            <span className="block italic text-[#d4a853]">
              Destinations
            </span>
          </div>

          <div className="lg:mb-6 h-px w-24 bg-[#d4a853]" />

          <p className="mb-8 text-xs max-w-xl font-light leading-relaxed text-gray-200 md:text-lg">
            Discover the most beautiful places across the pearl of the Indian Ocean.
          </p>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#faf7f2] to-transparent" />
      </header>

      {/* ================= DESTINATIONS GRID ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d, index) => (
            <Link
              key={d.title}
              href={`/destinations/${d.slug ?? d.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Number Badge */}
              <span className="absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1209]/80 font-sans text-xs font-bold text-[#d4a853] backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-[#1a1209]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="relative p-6">

                <div className="mb-4 h-0.5 w-8 bg-[#d4a853] transition-all duration-300 group-hover:w-16" />

                <h2
                  className="mb-2 text-xl font-bold text-[#1a1209] transition-colors duration-300 group-hover:text-[#8b4513]"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {d.title}
                </h2>

                <p className="mb-5 font-sans text-sm leading-relaxed text-[#6b5e4e] line-clamp-3">
                  {d.description}
                </p>

                <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-[#d4a853] transition-all duration-300 group-hover:gap-3">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>

              {/* Bottom Gold Line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4a853] transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ACCENT ================= */}
      <div className="py-16 text-center">
        <div className="mx-auto h-px w-24 bg-[#d4a853]/40" />
        <p className="mt-4 font-sans text-xs uppercase tracking-widest text-[#9e8e7e]">
          Pearl of the Indian Ocean
        </p>
      </div>

    </main>
  );
}