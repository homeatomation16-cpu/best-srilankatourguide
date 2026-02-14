"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Star, CheckCircle } from "lucide-react";
import { drivers } from "@/data/drivers";

export default function Drivers() {
  return (
    <section className="py-28 lg:py-36 px-6 bg-linear-to-brom-white to-orange-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-orange-600 text-xl mb-4 tracking-wide">
            Elite Chauffeur Service
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Luxury Drivers & Guides
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hand-picked, verified, multilingual drivers delivering
            premium comfort, safety and five-star travel experiences
            across Sri Lanka.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="
                group relative
                rounded-[30px]
                overflow-hidden
                bg-white/70
                backdrop-blur-2xl
                border border-white/40
                shadow-xl
                transition
                hover:-translate-y-3
                hover:shadow-[0_30px_70px_rgba(0,0,0,0.18)]
              "
            >

              {/* RIBBON */}
              {driver.tag && (
                <div className="
                  absolute top-6 -left-12
                  rotate-[-35deg]
                  bg-linear-to-r from-orange-600 to-amber-500
                  text-white text-xs
                  px-14 py-1
                  font-semibold
                  shadow-lg
                  z-20
                ">
                  {driver.tag}
                </div>
              )}

              {/* IMAGE */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={driver.image || "/placeholder.jpg"}
                  alt={driver.name}
                  fill
                  className="
                    object-cover
                    transition duration-1000
                    group-hover:scale-110
                  "
                />

                <div className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/60 via-black/10 to-transparent
                " />

                {/* PRICE */}
                {driver.price && (
                  <div className="
                    absolute bottom-6 right-6
                    bg-white/90 backdrop-blur
                    px-5 py-2
                    rounded-full
                    font-semibold
                    text-black
                    shadow-md
                  ">
                    {driver.price} / day
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-9">

                {/* NAME */}
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {driver.name}
                  </h3>
                  {driver.verified && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                {driver.vehicle && (
                  <p className="text-gray-600 mb-4">
                    {driver.vehicle}
                  </p>
                )}

                {/* RATING */}
                <div className="flex items-center gap-2 mb-5 text-gray-700">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">
                    {driver.rating}
                  </span>

                  <span className="text-gray-500">
                    ({driver.reviews?.length || driver.totalReviews || 0} reviews)
                  </span>
                </div>

                {/* CAPACITY */}
                {driver.capacity && (
                  <div className="flex items-center gap-3 text-gray-700 mb-6">
                    <Users className="w-5 h-5 text-orange-500" />
                    {driver.capacity} Passengers
                  </div>
                )}

                {/* LANGUAGES */}
                {driver.languages && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-3">
                      Languages Spoken
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {driver.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="
                            flex items-center gap-2
                            px-3 py-1.5
                            rounded-full
                            bg-black/5
                            border border-black/10
                            text-gray-700
                            text-sm
                          "
                        >
                          {lang.flag && (
                            <span className="text-lg">
                              {lang.flag}
                            </span>
                          )}
                          {lang.name || lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link href={`/drivers/${driver.id}`}>
                  <button className="
                    w-full py-4
                    rounded-full
                    font-semibold
                    text-white
                    bg-linear-to-r
                    from-orange-600 to-amber-500
                    transition
                    hover:scale-[1.05]
                    hover:shadow-xl
                  ">
                    Explore Driver
                  </button>
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* FINAL CTA */}
        <div className="text-center mt-28">
          <Link
            href="/drivers"
            className="
              inline-block
              px-16 py-6
              rounded-full
              text-lg font-semibold
              bg-black text-white
              transition
              hover:scale-110
              hover:shadow-2xl
            "
          >
            View All Drivers
          </Link>
        </div>

      </div>
    </section>
  );
}
