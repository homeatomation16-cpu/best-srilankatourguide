"use client";

import Image from "next/image";
import Link from "next/link";

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <div className="relative h-60">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {tour.title}
        </h3>

        <p className="text-gray-500 mb-4">
          {tour.duration} Days
        </p>

        <p className="font-bold text-orange-600 mb-4">
          From ${tour.price}
        </p>

        <Link
          href={`/tours/${tour.id}`}
          className="inline-block px-6 py-2 bg-orange-600 text-white rounded-full"
        >
          View Tour
        </Link>
      </div>
    </div>
  );
}