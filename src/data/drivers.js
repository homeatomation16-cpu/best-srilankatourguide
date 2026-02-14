export const drivers = [
  {
    id: "nuwan-perera",

    name: "Nuwan Perera",
    rating: 4.9,
    totalReviews: 247,
    experience: "12+ Years",
    location: "Colombo, Sri Lanka",

    /* ✅ languages as objects */
    languages: [
      { name: "English", flag: "🇬🇧" },
      { name: "Sinhala", flag: "🇱🇰" },
      { name: "Tamil", flag: "🇱🇰" },
      { name: "Hindi", flag: "🇮🇳" }
    ],

    verified: true,
    responseTime: "Within 1 hour",

    vehicleTypes: [
      "Luxury Cars",
      "SUVs",
      "Vans (1-10 passengers)"
    ],

    specialties: [
      "Cultural Heritage Tours",
      "Wildlife Safaris",
      "Beach Destinations",
      "Hill Country Expeditions",
      "Custom Itineraries"
    ],

    phone: "+94769300334",
    whatsapp: "+94769300334",
    email: "info@srilankatoursdriver.com",

    bio: "Licensed professional tour guide with over 12 years of experience showing travelers the beauty of Sri Lanka.",

    /* ✅ ALWAYS have image */
    image: "/driver.jpg",
    profileImage: "/driver-profile.jpg",
    coverImage: "/sri-lanka-cover.jpg",

    gallery: [
      "/gallery1.jpg",
      "/gallery2.jpg",
      "/gallery3.jpg",
      "/gallery4.jpg"
    ],

    /* ⭐ Reviews */
    reviews: [
      {
        id: 1,
        name: "Sarah Johnson",
        country: "United States",
        rating: 5,
        date: "January 2026",
        comment: "Absolutely fantastic experience!"
      },
      {
        id: 2,
        name: "Michael Chen",
        country: "Singapore",
        rating: 5,
        date: "December 2025",
        comment: "Best tour guide we've ever had!"
      }
    ],

    /* ⭐ Tours */
    tours: [
      {
        id: 1,
        title: "5 Days Down South Tour",
        duration: "5 Days",
        price: "$283.50",
        highlights: [
          "Sigiriya Rock",
          "Temple of Tooth",
          "Ella Train",
          "Mirissa Beach"
        ]
      }
    ]
  }
];
