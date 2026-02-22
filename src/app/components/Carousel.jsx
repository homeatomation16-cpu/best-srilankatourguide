"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { TOURS } from "../../data/tours";

export default function Carousel() {
  const ref = useRef(null);

  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollLeft += dir === "left" ? -320 : 320;
  };

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        // go back to start when reached end
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollLeft += 320;
      }
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-14">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Tours
      </h2>

      <div className="relative">
        {/* LEFT */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-4 py-2 rounded-full"
        >
          ◀
        </button>

        {/* SCROLL AREA */}
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-12"
        >
          {TOURS.map((tour) => (
            <div
              key={tour.id}
              className="relative min-w-75 h-55 snap-start rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-lg">
                {tour.title}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow px-4 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </div>
  );
}