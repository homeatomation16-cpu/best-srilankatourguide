// ================= COMMON DATA =================

const commonDriver = {
  experience: "10 Years",
  languages: [
    "English",
    "Sinhala",
    "Tamil",
    "Chinese",
    "Japanese",
    "Korean",
    "Russian",
    "French",
    "German",
  ],
};

const commonOverview =
  "Hire a professional private driver in Sri Lanka. Available for round tours, sightseeing, day excursions, culture & heritage tours, and wildlife safaris.";

const commonPaymentPolicy = [
  "Full payment first day OR daily payment based on mileage",
  "Minimum booking: 3 days",
  "170km included per day",
  "Extra mileage charges apply",
];

// ================= VEHICLES =================

export const vehicles = [
  // =====================================================
  // HONDA FIT SHUTTLE
  // =====================================================

  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Car",
    price: "$55",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image: "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",

    gallery: [
      "/honda-fit-shuttle/honda-fit-shuttle-1.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-2.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-3.jpeg",
      "/honda-fit-shuttle/honda-fit-shuttle-4.jpeg",
    ],

    features: [
      "Air Conditioning",
      "Comfort seats",
      "Fuel efficient",
      "Ideal for city tours",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // TOYOTA PRIUS
  // =====================================================

  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Car",
    price: "$80",
    passengers: 3,
    fuel: "Hybrid",
    transmission: "Auto",

    image: "/images/1-1.jpeg",

    gallery: [
      "/images/1-1.jpeg",
      "/images/1-2.jpeg",
      "/images/1-3.jpeg",
      "/images/1-4.jpeg",
    ],

    features: [
      "Eco friendly hybrid",
      "Smooth driving",
      "Air Conditioning",
      "Comfort interior",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // TOYOTA AXIO
  // =====================================================

  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Car",
    price: "$60",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image: "/toyota-axio/toyota-axio-1.jpeg",

    gallery: [
      "/toyota-axio/toyota-axio-1.jpeg",
      "/toyota-axio/toyota-axio-2.jpeg",
      "/toyota-axio/toyota-axio-3.jpeg",
      "/toyota-axio/toyota-axio-4.jpeg",
    ],

    features: [
      "Fuel efficient",
      "Smooth ride",
      "Air Conditioning",
      "Perfect for city travel",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // HONDA GRACE
  // =====================================================

  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Car",
    price: "$65",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image: "/honda-grace/honda-grace-1.jpeg",

    gallery: [
      "/honda-grace/honda-grace-1.jpeg",
      "/honda-grace/honda-grace-2.jpeg",
      "/honda-grace/honda-grace-3.jpeg",
      "/honda-grace/honda-grace-4.jpeg",
      "/honda-grace/honda-grace-5.jpeg",
      "/honda-grace/honda-grace-6.jpeg",
    ],

    features: [
      "Luxury interior",
      "Silent hybrid drive",
      "Air Conditioning",
      "Comfort travel",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // TOYOTA KDH HIGHROOF VAN
  // =====================================================

  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Van",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manual",

    image: "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",

    gallery: [
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-1.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-2.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-3.jpeg",
      "/toyota-kdh-highroof-van/toyota-kdh-highroof-4.jpeg",
    ],

    features: [
      "High roof",
      "Large luggage space",
      "Tour ready",
      "Family friendly",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // TOYOTA KDH FLATROOF VIP VAN
  // =====================================================

  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Van",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manual",

    image: "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",

    gallery: [
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-1.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-2.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-3.jpeg",
      "/toyota-kdh-flatroof-vip-van/toyota-kdh-flatroof-vip-4.jpeg",
    ],

    features: [
      "VIP seating",
      "Flat roof design",
      "Extra comfort interior",
      "Perfect for private tours",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },

  // =====================================================
  // TOYOTA COASTER AC BUS
  // =====================================================

  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Bus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manual",

    image: "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",

    gallery: [
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-1.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-2.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-3.jpeg",
      "/toyota-coaster-ac-bus/toyota-coaster-ac-bus-4.jpeg",
    ],

    features: [
      "Full Air Conditioning",
      "Comfortable seats",
      "Large luggage space",
      "Ideal for group tours",
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy,
  },
];