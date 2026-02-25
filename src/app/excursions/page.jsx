"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TOURS } from "../../data/tours";

const CATEGORIES = ["All", "Cultural", "Beach", "Safari", "Nature", "Transfer"];

/* ================= FRAMER VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function ExcursionsPage() {
  const [locationFilter, setLocationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  /* ================= LOCATIONS (dynamic) ================= */
  const LOCATIONS = useMemo(() => {
    const unique = [...new Set(TOURS.map((t) => t.from).filter(Boolean))];
    return ["All", ...unique];
  }, []);

  /* ================= FILTERING ================= */
  const filteredTours = useMemo(() => {
    let result = [...TOURS];

    if (locationFilter !== "All") {
      result = result.filter((t) => t.from === locationFilter);
    }

    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.title || "").toLowerCase().includes(q) ||
          (t.desc || "").toLowerCase().includes(q) ||
          (t.from || "").toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name":
        result.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
        break;
    }

    return result;
  }, [locationFilter, categoryFilter, searchQuery, sortBy]);

  /* ================= COMPARE ================= */
  const toggleCompare = (tour) => {
    setCompareList((prev) => {
      const exists = prev.find((t) => t.id === tour.id);
      if (exists) return prev.filter((t) => t.id !== tour.id);
      if (prev.length >= 3) return prev;
      return [...prev, tour];
    });
  };

  const isInCompare = (tour) =>
    compareList.some((t) => t.id === tour.id);

  return (
    <div className="mt-16 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <header className="bg-linear-to-r from-orange-600 to-rose-600 text-white py-16 text-center">
        <h1 className="text-5xl font-black mb-3">
          Discover Sri Lanka
        </h1>
        <p className="text-xl opacity-90">
          Explore unforgettable day tours & excursions
        </p>
      </header>

      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-0 z-40 bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-2 border-orange-200 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500"
          />

          {/* Category */}
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full font-semibold ${
                  categoryFilter === cat
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border-2 border-orange-200 rounded-xl px-4 py-2"
          >
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
            <option value="name">Name A → Z</option>
          </select>
        </div>
      </div>

      {/* ================= LOCATIONS ================= */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">
          Browse by Location
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LOCATIONS.map((loc) => (
            <div
              key={loc}
              onClick={() => setLocationFilter(loc)}
              className={`cursor-pointer p-6 rounded-2xl shadow-lg text-center font-bold transition ${
                locationFilter === loc
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-100"
              }`}
            >
              {loc}
            </div>
          ))}
        </div>
      </section>

      {/* ================= TOURS GRID ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {filteredTours.length} Tours Found
          </h2>

          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompare(true)}
              className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold"
            >
              Compare ({compareList.length})
            </button>
          )}
        </div>

        {filteredTours.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour) => (
              <motion.div
                key={tour.id}
                variants={fadeUp}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="relative h-60">
                  <Image
                    src={tour.image || "/gallery/gallery1.jpg"}
                    fill
                    alt={tour.title}
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {tour.title}
                  </h3>

                  <p className="text-gray-600 mb-3">
                    {tour.desc || "No description available."}
                  </p>

                  {/* Highlights Safe */}
                  {tour.highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tour.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-orange-600">
                      ${tour.price}
                    </span>

                    <button
                      onClick={() => toggleCompare(tour)}
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        isInCompare(tour)
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {isInCompare(tour) ? "Added" : "Compare"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            No tours found.
          </div>
        )}
      </section>

      {/* ================= COMPARE MODAL ================= */}
      <AnimatePresence>
        {showCompare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50"
            onClick={() => setShowCompare(false)}
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6">
                Compare Tours
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {compareList.map((tour) => (
                  <div
                    key={tour.id}
                    className="border rounded-2xl p-4"
                  >
                    <h3 className="font-bold mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-sm mb-2">
                      ${tour.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      {tour.duration}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowCompare(false)}
                className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}