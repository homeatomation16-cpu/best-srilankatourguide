const commonDriver = {
  experience: "10 Years",
  languages: [
    "English","Sinhala","Tamil",
    "Chinese","Japanese","Korean",
    "Russian","French","German"
  ]
};

const commonOverview =
  "Hire a professional private driver in Sri Lanka. Available for round tours, sightseeing, day excursions, culture & heritage tours, and wildlife safaris.";

const commonPaymentPolicy = [
  "Full payment first day OR daily payment based on mileage",
  "Minimum booking: 3 days",
  "170km included per day",
  "Extra mileage charges apply"
];

export const vehicles = [

  {
    id: "honda-fit",
    name: "Honda Fit Shuttle",
    type: "Car",
    price: "$55",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1200"
    ],

    features: [
      "Air Conditioning",
      "Comfort seats",
      "Fuel efficient",
      "Ideal for city tours"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "toyota-kdh",
    name: "Toyota KDH Highroof",
    type: "Van",
    price: "$110",
    passengers: 10,
    fuel: "Diesel",
    transmission: "Manual",

    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200"
    ],

    features: [
      "High roof",
      "Large luggage space",
      "Tour ready",
      "Family friendly"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "toyota-prius",
    name: "Toyota Prius",
    type: "Car",
    price: "$80",
    maxPeople: 3,
    minAge: 16,
    duration: "Per Day",
    tourType: "Private Driver Hire",
    reviews: 0,

    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1200",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200",
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1200"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "toyota-coaster",
    name: "Toyota Coaster AC Bus",
    type: "Bus",
    price: "$180",
    passengers: 25,
    fuel: "Diesel",
    transmission: "Manual",

    image:
      "https://images.unsplash.com/photo-1590335895229-6e75511892c8?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1590335895229-6e75511892c8?q=80&w=1200",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200"
    ],

    features: [
      "Full Air Conditioning",
      "Comfortable seats",
      "Large luggage space",
      "Ideal for group tours"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "toyota-axio",
    name: "Toyota Axio",
    type: "Car",
    price: "$60",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200"
    ],

    features: [
      "Fuel efficient",
      "Smooth ride",
      "Air Conditioning",
      "Perfect for city travel"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "honda-grace",
    name: "Honda Grace",
    type: "Car",
    price: "$65",
    passengers: 4,
    fuel: "Hybrid",
    transmission: "Auto",

    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1200",
      "https://images.unsplash.com/photo-1583267746897-2cf415887172?q=80&w=1200"
    ],

    features: [
      "Luxury interior",
      "Silent hybrid drive",
      "Air Conditioning",
      "Comfort travel"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  },

  {
    id: "kdh-vip-flatroof",
    name: "Toyota KDH Flatroof VIP Van",
    type: "Van",
    price: "$130",
    passengers: 8,
    fuel: "Diesel",
    transmission: "Manual",

    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200",

    gallery: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200",
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200"
    ],

    features: [
      "VIP seating",
      "Flat roof design",
      "Extra comfort interior",
      "Perfect for private tours"
    ],

    driver: commonDriver,
    overview: commonOverview,
    paymentPolicy: commonPaymentPolicy
  }

];