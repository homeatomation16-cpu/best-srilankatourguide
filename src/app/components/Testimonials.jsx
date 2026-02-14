"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Testimonials() {
  const sliderRef = useRef(null);

  const reviews = [
    {
      name: "Vairavelu R",
      text: "Perfectly organized tour. Smooth experience and very professional team.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Bhairavi V",
      text: "Amazing driver and great communication. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Melania M",
      text: "Fantastic service and unforgettable memories in Sri Lanka.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Daniel K",
      text: "Luxury level comfort and very caring staff.",
      img: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  // AUTO SCROLL
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let x = 0;

    const i = setInterval(() => {
      x += 0.4;
      if (x >= el.scrollWidth / 2) x = 0;
      el.scrollLeft = x;
    }, 16);

    return () => clearInterval(i);
  }, []);

  return (
    <section className="py-32 bg-linear-to-b from-white via-gray-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-orange-500 tracking-widest mb-4">
            TESTIMONIALS
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold">
            Loved by Travelers
          </h2>

          <p className="text-gray-500 mt-4">
            Real experiences from our guests
          </p>
        </div>

        {/* TRUST BAR */}
        <div className="
          bg-white/70 backdrop-blur-xl
          border border-gray-200
          rounded-[30px]
          shadow-xl
          p-10
          flex flex-col lg:flex-row
          justify-between
          items-center
          gap-10
          mb-20
        ">
          <TrustBlock label="Google Reviews" score="4.9" total="1,200+" />
          <TrustBlock label="TripAdvisor" score="5.0" total="800+" />
          <TrustBlock label="Happy Travelers" score="98%" total="Satisfaction" />
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="overflow-hidden whitespace-nowrap"
        >
          <div className="inline-flex gap-10">

            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={i}
                className="
                  min-w-85 lg:min-w-115
                  bg-white/60 backdrop-blur-xl
                  border border-white/40
                  shadow-xl
                  rounded-[30px]
                  p-10
                  hover:scale-[1.03]
                  transition
                "
              >
                <Stars />

                <p className="my-6 text-gray-700 leading-relaxed">
                  “{r.text}”
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <Image
                    src={r.img}
                    alt={r.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <div>
                    <p className="font-semibold">
                      {r.name}
                    </p>

                    <p className="text-sm text-green-600">
                      ✔ Verified Traveler
                    </p>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}

/* ⭐ STARS */
function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

/* TRUST BLOCK */
function TrustBlock({ label, score, total }) {
  return (
    <div className="text-center">
      <p className="text-gray-500 mb-2">{label}</p>

      <Stars />

      <p className="text-3xl font-bold mt-2">
        {score}
      </p>

      <p className="text-gray-400 text-sm">
        {total}
      </p>
    </div>
  );
}
