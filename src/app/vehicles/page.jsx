"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { vehicles } from "@/data/vehicles";

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-orange-50 px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Our Vehicles
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from our modern, comfortable and well-maintained fleet.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

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