"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const destinations = [
  {
    name: "Sigiriya",
    slug: "sigiriya",
    image:
      "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=1200&q=80",
    description:
      "Sigiriya is an ancient rock fortress and UNESCO World Heritage Site located in central Sri Lanka. Rising dramatically above the plains, it once served as a royal palace. Today it offers breathtaking panoramic views and legendary frescoes.",
  },
  {
    name: "Kandy",
    slug: "kandy",
    image:
      "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?w=1200&q=80",
    description:
      "Kandy is the cultural capital of Sri Lanka, home to the Temple of the Tooth Relic. Surrounded by mountains and a serene lake, it blends spirituality with natural beauty.",
  },
  {
    name: "Ella",
    slug: "ella",
    image:
      "https://images.unsplash.com/photo-1557129458-8e1a9c5e9d0d?w=1200&q=80",
    description:
      "Ella is a peaceful hill-country town known for scenic train rides, tea plantations, waterfalls, and the famous Nine Arches Bridge.",
  },
];

export default function DestinationDetail({ params }) {
  const destination = destinations.find(
    (d) => d.slug === params.slug
  );

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Destination not found
        </h1>
      </div>
    );
  }

  return (
    <section className="bg-white">

      {/* 🍏 CINEMATIC HERO */}
      <div className="relative h-[80vh] overflow-hidden">

        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute inset-0"
        >
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            priority
            className="object-cover"
            unoptimized
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            {destination.name}
          </h1>

          <p className="mt-6 max-w-2xl text-white/90 text-lg">
            Discover the story, beauty and magic of Sri Lanka
          </p>
        </motion.div>

      </div>

      {/* 🍏 STORY SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold mb-6">
          The Story
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          {destination.description}
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mt-6">
          Travel through history, culture, and nature as you
          explore this remarkable destination with our
          experienced local drivers and guides.
        </p>
      </motion.div>

      {/* 🍏 PREMIUM CTA */}
      <div className="bg-gray-100 py-16 text-center">

        <h3 className="text-3xl font-bold">
          Ready to Visit {destination.name}?
        </h3>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">

          <a
            href={`https://wa.me/94769300334?text=Hi I want to visit ${destination.name}`}
            className="bg-black text-white px-10 py-4 rounded-full text-lg hover:scale-105 transition"
          >
            Book on WhatsApp
          </a>

          <Link
            href="/destinations"
            className="border-2 border-black px-10 py-4 rounded-full text-lg hover:bg-black hover:text-white transition"
          >
            Back to Destinations
          </Link>

        </div>
      </div>

    </section>
  );
}
