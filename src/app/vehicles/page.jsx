"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { vehicles } from "../../data/vehicles";
import { useEffect, useState } from "react";

export default function VehiclesPage() {
  const languageDrivers = [
    "English Speaking",
    "French Speaking",
    "German Speaking",
    "Hindi Speaking",
    "Spanish Speaking",
    "Italian Speaking",
  ];

  const [currentLang, setCurrentLang] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) =>
        prev === languageDrivers.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-orange-50">

      {/* ================= HERO ================= */}
      <div className="relative h-[45vh] md:h-[55vh] min-h-100 overflow-hidden">

        <Image
          src="/vehicles.jpg"
          alt="Vehicles"
          fill
          priority
          sizes="100vw"
          className="object-fill"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/80 via-stone-900/40 to-transparent" />

        {/* Centered Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our Vehicles
          </h1>

          <h2 className="text-xl md:text-2xl font-playfair mb-4">
            Recommended Drivers & Guides
          </h2>

          <h3 className="text-sm md:text-base font-medium text-white/90">
            We have{" "}
            <span
              key={currentLang}
              className="text-orange-400 font-semibold animate-fadeUp"
            >
              {languageDrivers[currentLang]}
            </span>{" "}
            Drivers
          </h3>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent" />
      </div>

      {/* ================= INTRO TEXT ================= */}
      <div className="text-center px-6 py-12">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our modern, comfortable and well-maintained fleet.
          Travel with comfort and confidence across Sri Lanka with our
          experienced drivers and multilingual guides.
        </p>
      </div>

      {/* ================= VEHICLE GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {vehicles.map((v) => (
          <Link
            key={v.id}
            href={`/vehicles/${v.id}`}
            className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-64 w-full">
              <Image
                src={v.image || "/placeholder.jpg"}
                alt={v.name || "Vehicle"}
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

              {v.price && (
                <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-1.5 rounded-full font-semibold text-sm">
                  {v.price} / day
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-2xl font-bold mb-1">
                {v.name}
              </h2>

              <p className="text-gray-600 mb-3">
                {v.type || "Vehicle"}
              </p>

              {/* PASSENGERS */}
              {v.passengers && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  {v.passengers} passengers
                </div>
              )}

              {/* FUEL & TRANSMISSION */}
              <div className="text-sm text-gray-500 mb-4">
                {v.transmission || "Auto"} • {v.fuel || "Petrol"}
              </div>

              {/* FEATURES */}
              {v.features && (
                <div className="flex flex-wrap gap-2">
                  {v.features.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* BUTTON */}
              <div className="mt-6">
                <div className="w-full text-center py-3 rounded-full bg-linear-to-r from-orange-600 to-amber-500 text-white font-semibold">
                  View Vehicle
                </div>
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}