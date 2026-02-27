"use client";

import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS } from "../../data/destinations";

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-amber-50 px-6 py-20">

      {/* HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Sri Lanka Destinations
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the most beautiful places across Sri Lanka.
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {DESTINATIONS.map((d) => (
          <Link
            key={d.id}
            href={`/destinations/${d.id}`}
            className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300"
          >

            {/* IMAGE */}
            <div className="relative h-64 w-full">
              <Image
                src={d.image}
                alt={d.title}
                fill
                priority
                sizes="100vw"
                
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h2 className="text-2xl font-bold mb-2">
                {d.title}
              </h2>

              <p className="text-gray-600 text-sm line-clamp-2">
                {d.description}
              </p>

              <div className="mt-4 text-amber-600 font-semibold">
                Explore →
              </div>

            </div>

          </Link>
        ))}

      </div>
    </div>
  );
}