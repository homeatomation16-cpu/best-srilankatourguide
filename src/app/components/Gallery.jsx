"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { TOUR_GALLERIES } from "../../data/gallery";

export default function Gallery() {
  const sliderRef = useRef(null);

  // 🔥 Combine ALL gallery arrays into one single array
  const images = Object.values(TOUR_GALLERIES).flat();

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let scroll = 0;
    let animationFrame;

    const animate = () => {
      scroll += 0.5;

      if (scroll >= el.scrollWidth / 2) {
        scroll = 0;
      }

      el.scrollLeft = scroll;
      animationFrame = requestAnimationFrame(animate);
    };

    const start = () => {
      animationFrame = requestAnimationFrame(animate);
    };

    const stop = () => {
      cancelAnimationFrame(animationFrame);
    };

    start();

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);

    return () => {
      stop();
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
    };
  }, []);

  return (
    <section className="py-28 bg-linear-to-brom-white to-gray-50">
      <div className="  x-overflow-hidden mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-orange-500 tracking-widest mb-3">
            GALLERY
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold">
            Travel Moments
          </h2>
        </div>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="overflow-x-hidden whitespace-nowrap relative"
        >
          <div className="inline-flex gap-6">

            {[...images, ...images].map((item, i) => (
              <Link
                key={i}
                href="#"
                target="_blank"
                className="
                  relative
                  min-w-70 lg:min-w-105
                  h-90
                  rounded-[28px]
                  overflow-hidden
                  shadow-xl
                  group
                "
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Luxury Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-linear-to-t
                    from-black/40
                    via-black/10
                    to-transparent
                  "
                />

                {/* Caption */}
                <div
                  className="
                    absolute bottom-5 left-5
                    bg-white/20 backdrop-blur-md
                    text-white
                    px-4 py-2
                    rounded-full
                    text-sm
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                >
                  {item.caption}
                </div>

              </Link>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}