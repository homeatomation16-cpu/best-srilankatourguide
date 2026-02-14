"use client";

import { useState } from "react";
import Image from "next/image";

export default function VehicleSlider({ images = [] }) {

  // ✅ Hook ALWAYS top-level
  const [i, setI] = useState(0);

  // ✅ fallback image
  const safeImages =
    images?.length > 0
      ? images
      : ["/placeholder.jpg"];

  const next = () =>
    setI((prev) => (prev + 1) % safeImages.length);

  const prev = () =>
    setI((prev) => (prev - 1 + safeImages.length) % safeImages.length);

  return (
    <div className="relative">

      {/* MAIN IMAGE */}
      <div className="relative h-105 rounded-xl overflow-hidden">
        <Image
          src={safeImages[i]}
          alt="vehicle"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* ARROWS */}
      {safeImages.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow"
          >
            ◀
          </button>

          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded shadow"
          >
            ▶
          </button>
        </>
      )}

      {/* THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 mt-4">
          {safeImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setI(idx)}
              className={`
                relative w-24 h-20 cursor-pointer rounded overflow-hidden
                ${i === idx ? "ring-2 ring-orange-500" : ""}
              `}
            >
              <Image
                src={img}
                alt="thumb"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}