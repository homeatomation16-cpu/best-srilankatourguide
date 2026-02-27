"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { TOURS } from "../../data/tours";

export default function OneDayTours() {
  const oneDayTours = TOURS.filter((tour) => tour.duration === 1);

  return (
    <section className="py-16 sm:py-20 lg:py-32 px-5 sm:px-8 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-orange-600 text-sm sm:text-base tracking-wider uppercase mb-3">
            Luxury Day Trips
          </p>

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight">
            One Day Tour Packages
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {oneDayTours.map((tour) => (
            <div
              key={tour.id}
              className="group relative rounded-3xl overflow-hidden bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div className="relative h-60 sm:h-64 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                {/* PRICE */}
                <div className="absolute bottom-4 right-4 bg-white px-4 py-1.5 rounded-full text-sm font-semibold shadow">
                  From ${tour.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                  {tour.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-600 text-sm mb-6">
                  <Users className="w-4 h-4 text-orange-500" />
                  Up to {tour.maxPeople} Guests
                </div>

                <Link href={`/tours/${tour.id}`}>
                  <button className="w-full py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-linear-to-r from-orange-600 to-amber-500 transition hover:scale-[1.03] hover:shadow-md">
                    Explore Tour
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 sm:mt-20">
          <Link
            href="/contact"
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold bg-black text-white transition hover:scale-105 hover:shadow-xl"
          >
            Plan a Private Day Tour
          </Link>
        </div>

      </div>
    </section>
  );
}