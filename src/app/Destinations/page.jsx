"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DestinationsPage() {
  const destinations = [
    {
      name: "Sigiriya",
      slug: "sigiriya",
      image:
        "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&q=80",
      desc: "Ancient Rock Fortress",
    },
    {
      name: "Kandy",
      slug: "kandy",
      image:
        "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=800&q=80",
      desc: "Cultural Capital",
    },
    {
      name: "Ella",
      slug: "ella",
      image:
        "https://images.unsplash.com/photo-1557129458-8e1a9c5e9d0d?w=800&q=80",
      desc: "Hill Country Beauty",
    },
  ];

  return (
    <section className="py-24 px-6 bg-linear-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-orange-500 font-semibold text-lg">
            Choose Your
          </span>

          <h2 className="text-5xl font-bold tracking-tight mt-2">
            Destinations
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Discover Sri Lanka’s most breathtaking places with
            comfort and style.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            >
              <Link
                href={`/destinations/${dest.slug}`}
                className="group block"
              >
                <div className="relative h-95 rounded-3xl overflow-hidden shadow-xl">

                  {/* IMAGE */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                    unoptimized
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  {/* TEXT */}
                  <div className="absolute bottom-0 p-8 text-white">
                    <h3 className="text-3xl font-bold">
                      {dest.name}
                    </h3>

                    <p className="text-white/80 mt-2">
                      {dest.desc}
                    </p>

                    <span className="inline-block mt-4 text-sm bg-white/20 backdrop-blur px-4 py-1 rounded-full">
                      Explore →
                    </span>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
