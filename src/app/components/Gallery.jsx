"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Gallery() {
  const sliderRef = useRef(null);

  const images = [
    "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=1200&q=90",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=90",
    "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200&q=90",
    "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=1200&q=90",
  ];

  // AUTO SCROLL
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    let scroll = 0;

    const auto = setInterval(() => {
      scroll += 0.5;
      if (scroll >= el.scrollWidth / 2) {
        scroll = 0;
      }
      el.scrollLeft = scroll;
    }, 16);

    // Pause on hover
    el.addEventListener("mouseenter", () => clearInterval(auto));

    return () => clearInterval(auto);
  }, []);

  return (
    <section className="py-28 bg-linear-to-b from-white to-gray-50">

      <div className="max-w-7xl mx-auto px-6">

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
          className="
            overflow-x-hidden
            whitespace-nowrap
            relative
          "
        >
          <div className="inline-flex gap-6">

            {[...images, ...images].map((img, i) => (
              <Link
                key={i}
                href="https://www.instagram.com/srilankatoursdriver/"
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
                  src={img}
                  alt=""
                  fill
                  className="
                    object-cover
                    group-hover:scale-110
                    transition duration-700
                  "
                />

                {/* Luxury Overlay */}
                <div className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/40
                  via-black/10
                  to-transparent
                "/>

                {/* Label */}
                <div className="
                  absolute bottom-5 left-5
                  bg-white/20 backdrop-blur-md
                  text-white
                  px-4 py-2
                  rounded-full
                  text-sm
                  opacity-0
                  group-hover:opacity-100
                  transition
                ">
                  View Journey
                </div>

              </Link>
            ))}

          </div>
        </div>

      </div>

    </section>
  );
}
