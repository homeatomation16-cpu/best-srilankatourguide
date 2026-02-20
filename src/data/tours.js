export const TOURS = [
  {
    id: "05-days-down-south",
    title: "05 Days Down South Tour",
    duration: 5,
    price: 283.5,
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b",

    overview: `
Experience the beauty of Sri Lanka’s southern coastline.
Visit Galle Fort, Mirissa Beach, Bentota River and Udawalawa National Park.
Enjoy scenic beaches, wildlife safaris and cultural heritage sites.
    `,

    vehicleInfo: {
      car: "1–3 Persons → Car",
      van: "4–10 Persons → KDH Van",
      note: "Minimum two persons required",
    },

    included: [
      "Air-Conditioned Private Vehicle",
      "English Speaking Professional Driver",
      "Fuel & Parking Fees",
      "Water Bottles",
      "24 Hours Service",
    ],

    excluded: [
      "Accommodation & Meals",
      "Entrance Fees",
      "Personal Expenses",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival & Bentota",
        activities: [
          "Airport Pickup",
          "Bentota Beach Relaxation",
          "River Safari",
        ],
      },
      {
        day: 2,
        title: "Galle & Mirissa",
        activities: [
          "Galle Dutch Fort",
          "Mirissa Beach",
          "Whale Watching (Optional)",
        ],
      },
    ],
  },

  {
    id: "10-days-east-coast",
    title: "10 Days East Coast Tour",
    duration: 10,
    price: 640,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",

    overview: `
Discover Sri Lanka’s breathtaking East Coast.
Explore Trincomalee, Pasikuda, Polonnaruwa, Sigiriya, Kandy and Ella.
Enjoy cultural landmarks, pristine beaches and scenic hill country.
    `,

    vehicleInfo: {
      car: "1–3 Persons → Car",
      van: "4–10 Persons → KDH Van",
      note: "Minimum two persons required",
    },

    included: [
      "Private Air-Conditioned Vehicle",
      "Professional English Speaking Driver",
      "Fuel & Parking Fees",
      "Driver Accommodation",
      "Freeway (Toll) Charges",
      "Water Bottles",
    ],

    excluded: [
      "Accommodation & Meals",
      "Entrance Fees",
      "Train Tickets",
      "Personal Expenses",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival & Negombo",
        activities: [
          "Airport Pickup",
          "Negombo Beach",
          "Overnight Stay",
        ],
      },
      {
        day: 2,
        title: "Kandy",
        activities: [
          "Temple of the Tooth Relic",
          "Botanical Gardens",
          "Cultural Dance Show",
        ],
      },
      {
        day: 3,
        title: "Sigiriya",
        activities: [
          "Sigiriya Rock Fortress",
          "Village Safari",
        ],
      },
    ],
  },

  {
    id: "12-days-east-coast-hotels",
    title: "12 Days East Coast Tour with Hotels",
    duration: 12,
    price: 970,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6",

    overview: `
A complete East Coast luxury experience including hotel stays.
Explore beaches, heritage cities, hill country and wildlife safaris.
Perfect for families and couples seeking comfort and adventure.
    `,

    vehicleInfo: {
      car: "1–3 Persons → Car",
      van: "4–10 Persons → KDH Van",
      note: "Minimum two persons required",
    },

    included: [
      "Private Vehicle with Driver",
      "Hotel Accommodation",
      "Fuel & Parking Fees",
      "Driver Expenses",
      "24/7 Assistance",
    ],

    excluded: [
      "Entrance Tickets",
      "Personal Expenses",
      "Optional Activities",
    ],

    itinerary: [
      {
        day: 1,
        title: "Airport & Colombo",
        activities: [
          "Airport Pickup",
          "Colombo City Tour",
        ],
      },
      {
        day: 2,
        title: "Kandy",
        activities: [
          "Temple of the Tooth",
          "Tea Plantation Visit",
        ],
      },
    ],
  },
];