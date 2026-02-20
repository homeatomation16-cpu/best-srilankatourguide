"use client";

import Image from "next/image";
import Link from "next/link";
import { TOURS } from "@/data/tours";

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 to-orange-600 py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Tours</h1>
        <p className="text-lg opacity-90">
          Discover unforgettable multi-day journeys across Sri Lanka
        </p>
      </div>

      {/* Tours List */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-8">
        {TOURS.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image */}
            <div className="relative md:w-1/3 h-64 md:h-auto">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">
                    {tour.duration} Days
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {tour.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  Visit Sri Lanka and book an amazing tour package with us.
                  Sri Lanka is a tropical paradise filled with culture,
                  beaches, wildlife, and breathtaking landscapes.
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-sm text-gray-500">From USD</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${tour.price.toFixed(2)}
                  </p>
                </div>

                <Link
                  href={`/tours/${tour.id}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}