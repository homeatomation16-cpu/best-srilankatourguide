"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { vehicles } from "../../data/vehicles";
import { useEffect, useState } from "react";

export default function VehiclesSection() {
  const languageDrivers = [
    "English Speaking",
    "French Speaking",
    "German Speaking",
    "Hindi Speaking",
    "Spanish Speaking",
    "Italian Speaking",
  ];

  const featured = vehicles.slice(0, 6);

  const [currentLang, setCurrentLang] = useState(0);

  /* ───────────────── Language Auto Change ───────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLang((prev) =>
        prev === languageDrivers.length - 1 ? 0 : prev + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [languageDrivers.length]);

  return (
    <section className="py-24 bg-linear-to-b from-white to-orange-50 relative overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* ───────────────── Section Header ───────────────── */}
        <div className="text-center mb-16">
          <h1 className="text-amber-900 font-thea text-4xl py-2">
            What’s new
          </h1>

          <h2 className="font-poppins font-bold text-5xl py-4">
            Recommended Drivers & Vehicles
          </h2>

          <p className="max-w-3xl font-semibold text-xl mx-auto text-gray-600 leading-relaxed mt-6">
            We provide professional drivers fluent in
            <span
              key={currentLang}
              className="text-orange-500 font-semibold mx-2 transition-all duration-500"
            >
              {languageDrivers[currentLang]}
            </span>
            Travel with comfort and confidence with our recommended drivers and guides. Choose from a range of vehicle types to suit your journey, and enjoy the company of expert guides fluent in multiple languages, ensuring a seamless and enriching experience across Sri Lanka.
          </p>

          <div className="mt-6 h-1 w-24 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* ───────────────── Vehicles Grid ───────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((v) => (
            <Link
              key={v.id}
              href={`/vehicles/${v.id}`}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={v.image || "/placeholder.jpg"}
                  alt={v.name || "Vehicle"}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Price Badge */}
                {v.price && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                    {v.price}/day
                  </div>
                )}

                {/* Vehicle Type */}
                <div className="absolute bottom-4 left-4 bg-white/90 text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {v.type || "Vehicle"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">
                  {v.name}
                </h3>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  {v.passengers && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-orange-500" />
                      {v.passengers} pax
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Settings className="w-4 h-4 text-orange-500" />
                    {v.transmission || "Auto"}
                  </span>

                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4 text-orange-500" />
                    {v.fuel || "Petrol"}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="inline-block bg-orange-100 text-orange-600 text-sm px-4 py-2 rounded-full font-medium group-hover:bg-orange-500 group-hover:text-white transition">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ───────────────── CTA Button ───────────────── */}
        <div className="text-center mt-16">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition"
          >
            View All Vehicles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}