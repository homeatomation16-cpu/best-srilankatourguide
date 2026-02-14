"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ======= Data (static, outside component) =======
const TOURS_DATA = [
  {
    title: "Sigiriya & Dambulla Day Tour",
    from: "Habarana (Sigiriya)",
    duration: "Full Day",
    durationHours: 10,
    price: 95,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745",
    desc: "Climb Sigiriya Lion Rock & explore ancient cave temples.",
    category: "Cultural",
    highlights: ["UNESCO Site", "Ancient Fortress", "Cave Paintings"],
  },
  {
    title: "Ella Scenic Tour",
    from: "Ella",
    duration: "Full Day",
    durationHours: 8,
    price: 80,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07",
    desc: "Nine Arch Bridge, tea plantations & waterfalls.",
    category: "Nature",
    highlights: ["Nine Arch Bridge", "Tea Factory", "Ravana Falls"],
  },
  {
    title: "Yala Safari Adventure",
    from: "Thissamaharama (Yala)",
    duration: "Full Day",
    durationHours: 8,
    price: 120,
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615",
    desc: "Leopard safari in Sri Lanka's top national park.",
    category: "Safari",
    highlights: ["Leopard Spotting", "Wildlife", "4x4 Jeep Safari"],
  },
  {
    title: "Galle Fort & Beach Tour",
    from: "Galle",
    duration: "Full Day",
    durationHours: 8,
    price: 75,
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b",
    desc: "Visit Galle Fort & explore the beach.",
    category: "Beach",
    highlights: ["Dutch Fort", "Lighthouse", "Beach Time"],
  },
  {
    title: "Colombo City Highlights",
    from: "Colombo",
    duration: "Half Day",
    durationHours: 6,
    price: 60,
    image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
    desc: "Explore Colombo city landmarks.",
    category: "Cultural",
    highlights: ["Gangaramaya Temple", "Independence Square", "Galle Face"],
  },
  {
    title: "Kandy Cultural Tour",
    from: "Kandy",
    duration: "Full Day",
    durationHours: 8,
    price: 70,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
    desc: "Temple of the Tooth & cultural show.",
    category: "Cultural",
    highlights: ["Sacred Tooth Relic", "Kandyan Dance", "Botanical Gardens"],
  },
  {
    title: "Mirissa Whale Watching",
    from: "Mirissa",
    duration: "Half Day",
    durationHours: 4,
    price: 90,
    image: "https://images.unsplash.com/photo-1552055568-c4c5c8b1e8c4",
    desc: "Whale watching & beach relaxation.",
    category: "Beach",
    highlights: ["Blue Whales", "Dolphins", "Ocean Adventure"],
  },
  {
    title: "Anuradhapura Heritage Tour",
    from: "Anuradhapura",
    duration: "Full Day",
    durationHours: 8,
    price: 75,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    desc: "Ancient stupas & sacred city tour.",
    category: "Cultural",
    highlights: ["Sacred Bo Tree", "Ancient Stupas", "UNESCO Site"],
  },
  {
    title: "Arugambay Beach Escape",
    from: "Arugambay",
    duration: "Full Day",
    durationHours: 8,
    price: 70,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
    desc: "Surfing & beach relaxation.",
    category: "Beach",
    highlights: ["Surfing Lessons", "Beach Yoga", "Sunset Views"],
  },
  {
    title: "Hikkaduwa Coral Tour",
    from: "Hikkaduwa",
    duration: "Full Day",
    durationHours: 6,
    price: 65,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
    desc: "Snorkeling & coral viewing.",
    category: "Beach",
    highlights: ["Coral Reefs", "Snorkeling", "Turtle Watching"],
  },
  {
    title: "Nuwara Eliya Tea Country",
    from: "Nuwara Eliya",
    duration: "Full Day",
    durationHours: 8,
    price: 80,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
    desc: "Tea plantations & waterfalls.",
    category: "Nature",
    highlights: ["Tea Factory Tour", "Gregory Lake", "Horton Plains"],
  },
  {
    title: "Pasikuda Beach Day",
    from: "Pasikuda",
    duration: "Full Day",
    durationHours: 8,
    price: 70,
    image: "https://images.unsplash.com/photo-1589308454676-9f3c3c5e6f57",
    desc: "Relax on calm Pasikuda beach.",
    category: "Beach",
    highlights: ["Pristine Beach", "Water Sports", "Calm Waters"],
  },
  {
    title: "Trincomalee Coastal Tour",
    from: "Trincomalee",
    duration: "Full Day",
    durationHours: 8,
    price: 75,
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9",
    desc: "Nilaveli beach & Koneswaram temple.",
    category: "Beach",
    highlights: ["Koneswaram Temple", "Nilaveli Beach", "Hot Springs"],
  },
  {
    title: "Udawalawa Safari",
    from: "Udawalawa",
    duration: "Half Day",
    durationHours: 4,
    price: 85,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32c8b4c",
    desc: "Elephant safari adventure.",
    category: "Safari",
    highlights: ["Wild Elephants", "Bird Watching", "Jeep Safari"],
  },
  {
    title: "Negombo Lagoon Tour",
    from: "Negombo",
    duration: "Half Day",
    durationHours: 4,
    price: 55,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
    desc: "Boat ride & seafood experience.",
    category: "Nature",
    highlights: ["Boat Safari", "Fresh Seafood", "Mangrove Tour"],
  },
  {
    title: "Airport Transfer Tour",
    from: "Airport (CMB)",
    duration: "Flexible",
    durationHours: 0,
    price: 50,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    desc: "Comfortable airport pickup & tours.",
    category: "Transfer",
    highlights: ["Meet & Greet", "Comfortable Vehicle", "Tour Options"],
  },
  {
    title: "Polonnaruwa Ancient City",
    from: "Polonnaruwa",
    duration: "Full Day",
    durationHours: 8,
    price: 65,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    desc: "Ancient stupas & sacred city tour.",
    category: "Cultural",
    highlights: ["Ancient Ruins", "Gal Vihara", "UNESCO Site"],
  },
  {
    title: "Jaffna Cultural Tour",
    from: "Jaffna",
    duration: "Full Day",
    durationHours: 8,
    price: 70,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    desc: "Northern heritage & island culture.",
    category: "Cultural",
    highlights: ["Nallur Temple", "Jaffna Fort", "Island Culture"],
  },
  {
    title: "Dambulla Cave Temples",
    from: "Dambulla",
    duration: "Half Day",
    durationHours: 4,
    price: 55,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
    desc: "Golden temple cave complex.",
    category: "Cultural",
    highlights: ["Cave Paintings", "Buddha Statues", "UNESCO Site"],
  },
];

const LOCATIONS_DATA = [
  {
    name: "Airport (CMB)",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
  },
  {
    name: "Anuradhapura",
    img: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
  },
  {
    name: "Arugambay",
    img: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",
  },
  {
    name: "Colombo",
    img: "https://images.unsplash.com/photo-1586500036706-41963de24d8b",
  },
  {
    name: "Ella",
    img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07",
  },
  {
    name: "Galle",
    img: "https://images.unsplash.com/photo-1588598198321-9735fd52455b",
  },
  {
    name: "Kandy",
    img: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    name: "Mirissa",
    img: "https://images.unsplash.com/photo-1552055568-c4c5c8b1e8c4",
  },
];

const CATEGORIES = ["All", "Cultural", "Beach", "Safari", "Nature", "Transfer"];

/* ======= FRAMER MOTION VARIANTS ======= */
const fadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const imageHover = { scale: 1.08, transition: { duration: 0.6, ease: "easeOut" } };
const cardHover = { y: -8, scale: 1.03, transition: { duration: 0.35 } };

export default function ExcursionsPage() {
  const [locationFilter, setLocationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [durationFilter, setDurationFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("price-low");
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // ======= filtered & sorted tours (clone TOURS_DATA to avoid mutation) =======
  const filteredTours = useMemo(() => {
    let result = [...TOURS_DATA]; // clone

    if (locationFilter !== "All") {
      result = result.filter((t) => t.from === locationFilter);
    }

    if (categoryFilter !== "All") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    result = result.filter(
      (t) => t.price >= priceRange[0] && t.price <= priceRange[1],
    );

    if (durationFilter !== "All") {
      result = result.filter((t) => t.duration === durationFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.desc.toLowerCase().includes(q) ||
          t.from.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "duration":
        result.sort((a, b) => b.durationHours - a.durationHours);
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [
    locationFilter,
    categoryFilter,
    priceRange,
    durationFilter,
    searchQuery,
    sortBy,
  ]);

  // ======= compare helpers =======
  const isInCompare = (tour) => compareList.some((t) => t.title === tour.title);

  const toggleCompare = (tour) => {
    setCompareList((prev) => {
      const exists = prev.some((t) => t.title === tour.title);
      if (exists) return prev.filter((t) => t.title !== tour.title);
      if (prev.length >= 3) return prev; // limit
      return [...prev, tour];
    });
  };

  const clearFilters = () => {
    setLocationFilter("All");
    setCategoryFilter("All");
    setPriceRange([0, 150]);
    setDurationFilter("All");
    setSearchQuery("");
  };

  // ======= safe slider handlers (ensure min <= max) =======
  const setMinPrice = (val) => {
    const min = Math.min(Number(val), priceRange[1]);
    setPriceRange([min, priceRange[1]]);
  };
  const setMaxPrice = (val) => {
    const max = Math.max(Number(val), priceRange[0]);
    setPriceRange([priceRange[0], max]);
  };

  return (
    <div className="flex h-full flex-col relative mt-16 bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 text-white">
        <div className="w-full max-w-7xl mx-auto px-6 py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-6xl font-black tracking-tight mb-4"
            >
              Discover Sri Lanka
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.12 }}
              className="text-xl md:text-2xl font-light opacity-90"
            >
              Unforgettable excursions across the pearl of the Indian Ocean
            </motion.p>
          </div>
        </div>
      </header>

      {/* Search & Filters Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-100">
        <div className="w-full max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-5 py-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    categoryFilter === cat
                      ? "bg-linear-to-r from-orange-500 to-rose-500 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 border-2 border-orange-200 hover:border-orange-400 hover:scale-105"
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
              className="px-4 py-3 rounded-2xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none bg-white font-medium"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

          {/* Advanced Filters */}
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {/* Duration Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration
              </label>
              <div className="flex gap-2">
                {["All", "Half Day", "Full Day", "Flexible"].map((dur) => (
                  <button
                    key={dur}
                    onClick={() => setDurationFilter(dur)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      durationFilter === dur
                        ? "bg-orange-500 text-white"
                        : "bg-orange-50 text-gray-700 hover:bg-orange-100"
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceRange[0]}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="flex-1 accent-orange-500"
                />
                <input
                  type="range"
                  min="0"
                  max="150"
                  value={priceRange[1]}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="flex-1 accent-orange-500"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Grid */}
      <section className="w-full max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Browse by Location
          </h2>
          <p className="text-gray-600">Click a location to see available tours</p>
        </div>

        {/* GRID with stagger + reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {LOCATIONS_DATA.map((loc, idx) => (
            <motion.div
              key={loc.name}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLocationFilter(loc.name)}
              className="group relative w-full h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Image wrapper with zoom on hover */}
              <motion.div whileHover={imageHover} className="absolute inset-0">
                <Image
                  src={loc.img}
                  fill
                  alt={loc.name}
                  className="object-cover"
                  unoptimized
                />
              </motion.div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-all duration-500" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs font-bold tracking-widest opacity-75 mb-1">
                  EXPLORE
                </p>

                <h3 className="text-2xl font-black mb-2">{loc.name}</h3>

                <div className="h-1 w-16 bg-orange-400 rounded-full group-hover:w-full transition-all duration-500" />
              </div>

              {/* Active Badge */}
              {locationFilter === loc.name && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  Active
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tours Grid */}
      <section className="w-full mx-auto px-6 pb-16 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {locationFilter !== "All"
                ? `Tours from ${locationFilter}`
                : "All Tours"}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredTours.length} {filteredTours.length === 1 ? "tour" : "tours"} available
            </p>
          </div>

          {compareList.length > 0 && (
            <motion.button
              onClick={() => setShowCompare((s) => !s)}
              whileHover={{ scale: 1.03 }}
              className="px-6 py-3 bg-linear-to-r from-purple-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform"
            >
              Compare ({compareList.length})
            </motion.button>
          )}
        </div>

        {/* Tour Cards */}
        {filteredTours.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTours.map((tour, idx) => (
              <motion.div
                key={tour.title}
                variants={fadeUp}
                whileHover={cardHover}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                    <Image
                      src={tour.image}
                      fill
                      alt={tour.title}
                      className="object-cover"
                      unoptimized
                    />
                  </motion.div>

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-orange-600 shadow-lg">
                    {tour.category}
                  </div>

                  <button
                    onClick={() => toggleCompare(tour)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isInCompare(tour) ? "bg-purple-500 text-white shadow-lg" : "bg-white/95 text-gray-600 hover:bg-purple-500 hover:text-white"}`}
                  >
                    {isInCompare(tour) ? "✓" : "+"}
                  </button>

                  <div className="absolute bottom-4 right-4 bg-linear-to-r from-orange-500 to-rose-500 text-white px-4 py-2 rounded-2xl font-black text-xl shadow-xl">
                    ${tour.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                    {tour.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 2).map((h, i) => (
                      <span
                        key={i}
                        className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="text-orange-500">📍</span>
                      <span className="font-medium">{tour.from}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-500">⏱</span>
                      <span className="font-medium">{tour.duration}</span>
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/94769300334?text=${encodeURIComponent(`Hi I want to book ${tour.title}`)}`}
                    className="block w-full bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white text-center py-3.5 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all transform"
                  >
                    Book This Tour
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No tours found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* Comparison Modal (AnimatePresence) */}
      <AnimatePresence>
        {showCompare && compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowCompare(false)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-linear-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-t-3xl flex items-center justify-between">
                <h2 className="text-2xl font-black">Compare Tours</h2>
                <button
                  onClick={() => setShowCompare(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {compareList.map((tour, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="border-2 border-purple-200 rounded-2xl p-4">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                        <Image src={tour.image} fill alt={tour.title} className="object-cover" unoptimized />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-purple-600">${tour.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">{tour.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span className="font-semibold">{tour.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-semibold text-xs">{tour.from}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCompare(tour)}
                        className="w-full mt-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))}
                </div>

                {compareList.length < 3 && (
                  <p className="text-center text-gray-500 mt-6">You can compare up to 3 tours. Add more from the tour list.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
