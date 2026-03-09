"use client";

import { useMemo } from "react";
import { TOURS } from "../../data/tours"; // adjust path if needed
import Image from "next/image";
import Link from "next/link";

export default function Tours() {

  const downSouthTours = useMemo(() => {
    return TOURS.filter((tour) =>
      [
        "05-days-down-south",
        "08-days-down-south",
        "10-days-down-south",
      ].includes(tour.id)
    );
  }, []);

  

  // Show only first 6 tours on homepage
  const featuredTours = TOURS.slice(0, 6);

  return (
    <section className="py-20 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center gap-0.5 mb-14">
            <h1 className="text-amber-900 font-thea text-4xl py-2">Recommended </h1>
            <h1 className="font-poppins text-5xl py-4">Featured Tour Packages</h1>
            <h2 className="font-bold text-4xl text-orange-500 py-5">(November to April)</h2>
            <p>
The best time to visit Sri Lanka’s South Coast is between November and mid-May, offering perfect weather and calm seas for swimmable beaches. These months provide ideal conditions for relaxation and exploration.

However, Sri Lanka is a year-round destination, with its diverse climate ensuring amazing experiences no matter when you visit!</p>
          <p className="text-sm uppercase tracking-[0.3em] text-orange-500 font-semibold">
            Discover Sri Lanka
          </p>
          
          <div className="mt-4 h-1 w-24 bg-orange-500 mx-auto rounded-full" />
        </div>

        {/* Tours Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {downSouthTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Price Badge */}
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md">
                  From ${tour.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">
                  {tour.title}
                </h3>

                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>{tour.duration} Day{tour.duration > 1 && "s"}</span>
                  <span>Max {tour.maxPeople} People</span>
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/tours"
            className="inline-block px-8 py-4 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition"
          >
            View All Tours
          </Link>
        </div>

      </div>
    </section>
  );
}