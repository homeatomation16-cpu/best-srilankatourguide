'use client';

import Image from "next/image";
import { Users } from "lucide-react";

export default function OneDayTours() {
  const oneDayTours = [
    {
      name: "Galle One Day Tour",
      capacity: "6",
      price: "$80",
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1400&q=80",
      tag: "Coastal Escape",
    },
    {
      name: "Kandy One Day Tour",
      capacity: "6",
      price: "$130",
      image:
        "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=1400&q=80",
      tag: "Cultural Tour",
    },
    {
      name: "Sigiriya One Day Tour",
      capacity: "6",
      price: "$150",
      image:
        "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1400&q=80",
      tag: "Heritage",
    },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-orange-600 text-xl mb-4 tracking-wide">
            Luxury Day Trips
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
            One Day Tour Packages
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {oneDayTours.map((tour, index) => (
            <div
              key={index}
              className="
                group relative
                rounded-[28px]
                overflow-hidden
                bg-white/65
                backdrop-blur-xl
                border border-white/40
                shadow-xl
                transition
                hover:-translate-y-3
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.15)]
              "
            >

              {/* TAG */}
              <div className="
                absolute top-6 left-6
                bg-white/85 backdrop-blur
                px-4 py-1.5
                rounded-full
                text-xs font-semibold
                shadow-md
                z-20
              ">
                {tour.tag}
              </div>

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="
                    object-cover
                    transition duration-1000
                    group-hover:scale-110
                  "
                />

                {/* cinematic overlay */}
                <div className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/60 via-black/10 to-transparent
                " />

                {/* PRICE BADGE */}
                <div className="
                  absolute bottom-6 right-6
                  bg-white/90 backdrop-blur
                  px-5 py-2
                  rounded-full
                  font-semibold
                  text-black
                  shadow-md
                ">
                  From {tour.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h3 className="text-2xl font-bold text-gray-900 mb-5">
                  {tour.name}
                </h3>

                <div className="flex items-center gap-3 text-gray-700 mb-8">
                  <Users className="w-5 h-5 text-orange-500" />
                  Up to {tour.capacity} Guests
                </div>

                <button className="
                  w-full py-4
                  rounded-full
                  font-semibold
                  text-white
                  bg-linear-to-r
                  from-orange-600 to-amber-500
                  transition
                  hover:scale-[1.05]
                  hover:shadow-lg
                ">
                  Explore Tour
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <a
            href="#contact"
            className="
              inline-block
              px-14 py-5
              rounded-full
              text-lg font-semibold
              bg-black text-white
              transition
              hover:scale-110
              hover:shadow-2xl
            "
          >
            Plan a Private Day Tour
          </a>
        </div>

      </div>
    </section>
  );
}
