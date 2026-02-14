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
    ]
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
    ]
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
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=1200",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1200"
    ],

    driver: {
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
        "German"
      ]
    },

    overview:
      "Hire a professional private driver in Sri Lanka. Available for round tours, sightseeing, day excursions, culture & heritage tours, and wildlife safaris.",

    bookingOptions: [
      "Booking Form",
      "Email: info@srilankatoursdriver.com",
      "WhatsApp: +94 769 300 334"
    ],

    paymentPolicy: [
      "Full payment first day OR daily payment based on mileage",
      "Minimum booking: 3 days",
      "170km included per day",
      "Extra mileage charges apply"
    ],

    extraMileage: {
      car: "100 LKR/km",
      van: "150 LKR/km",
      bus: "190 LKR/km"
    },

    included: [
      "Airport/Hotel Pickup",
      "Air-Conditioned Car",
      "Driver Meals & Accommodation",
      "Fuel & Parking",
      "Toll Fees",
      "24/7 Service"
    ],

    excluded: [
      "Your Accommodation",
      "Your Meals",
      "Entrance Tickets",
      "Activity Fees"
    ],

    tourPlanNote:
      "Tailor-made tours available via Email or WhatsApp."
  }

];