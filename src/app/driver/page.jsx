'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FaStar, 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaCar, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaLanguage,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaQuoteLeft,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTripadvisor,
  FaShieldAlt,
  FaAward,
  FaHeart
} from 'react-icons/fa';
import { MdVerified, MdLocalOffer } from 'react-icons/md';
import { IoMdStar, IoMdStarHalf } from 'react-icons/io';
import { BiSolidBadgeCheck } from 'react-icons/bi';

export default function DriverProfile() {
  const [selectedTab, setSelectedTab] = useState('about');

  // Sample driver data
  const driver = {
    name: "Nuwan Perera",
    rating: 4.9,
    totalReviews: 247,
    experience: "12+ Years",
    location: "Colombo, Sri Lanka",
    languages: ["English", "Sinhala", "Tamil", "Hindi"],
    verified: true,
    responseTime: "Within 1 hour",
    vehicleTypes: ["Luxury Cars", "SUVs", "Vans (1-10 passengers)"],
    specialties: [
      "Cultural Heritage Tours",
      "Wildlife Safaris", 
      "Beach Destinations",
      "Hill Country Expeditions",
      "Custom Itineraries"
    ],
    phone: "+94 769 300 334",
    email: "info@srilankatoursdriver.com",
    whatsapp: "+94769300334",
    bio: "Licensed professional tour guide with over 12 years of experience showing travelers the beauty of Sri Lanka. I'm passionate about sharing my country's rich culture, stunning landscapes, and hidden gems with visitors from around the world. Your safety and satisfaction are my top priorities.",
    profileImage: "/driver-profile.jpg",
    coverImage: "/sri-lanka-cover.jpg",
    gallery: [
      "/gallery1.jpg",
      "/gallery2.png", 
      "/gallery3.png",
      "/gallery4.png",
    ]
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "United States",
      rating: 5,
      date: "January 2026",
      comment: "Absolutely fantastic experience! Nuwan was knowledgeable, friendly, and went above and beyond to make our trip memorable. Highly recommend!",
      avatar: "/avatar1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      country: "Singapore",
      rating: 5,
      date: "December 2025",
      comment: "Best tour guide we've ever had! His knowledge of Sri Lankan history and culture is impressive. The trip was perfectly organized.",
      avatar: "/avatar2.jpg"
    },
    {
      id: 3,
      name: "Emma Williams",
      country: "United Kingdom",
      rating: 4.5,
      date: "November 2025",
      comment: "Great driver and guide. Very punctual, safe driving, and excellent English. Made our 8-day tour stress-free and enjoyable.",
      avatar: "/avatar3.jpg"
    }
  ];

  const popularTours = [
    {
      id: 1,
      title: "5 Days Down South Tour",
      duration: "5 Days",
      price: "$283.50",
      image: "/tour1.jpg",
      highlights: ["Sigiriya Rock", "Temple of Tooth", "Ella Train Journey", "Mirissa Beach"]
    },
    {
      id: 2,
      title: "8 Days Complete Sri Lanka",
      duration: "8 Days",
      price: "$453.60",
      image: "/tour2.jpg",
      highlights: ["Ancient Cities", "Hill Country", "Wildlife Safari", "Beach Relaxation"]
    },
    {
      id: 3,
      title: "5 Days East Coast Adventure",
      duration: "5 Days",
      price: "$297.00",
      image: "/tour3.jpg",
      highlights: ["Trincomalee", "Arugam Bay", "Pasikuda Beach", "Cultural Triangle"]
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IoMdStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<IoMdStarHalf key="half" className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image Section */}
      <div className="relative h-80 w-full bg-linear-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Professional Sri Lanka Tour Guide</h1>
            <p className="text-xl text-gray-200">Explore the Pearl of the Indian Ocean with an Expert</p>
          </div>
        </div>
      </div>

      {/* Driver Profile Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="shrink-0">
                <div className="relative w-40 h-40 mx-auto md:mx-0">
                  <div className="w-40 h-40 rounded-full bg-linear-to-br from-blue-500 to-blue-700 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                      <div className="w-full h-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                        NP
                      </div>
                    </div>
                  </div>
                  {driver.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2">
                      <MdVerified className="text-white text-2xl" />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold text-gray-900">{driver.name}</h2>
                      {driver.verified && (
                        <BiSolidBadgeCheck className="text-blue-600 text-2xl" title="Verified Driver" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {renderStars(driver.rating)}
                      </div>
                      <span className="text-lg font-semibold text-gray-900">{driver.rating}</span>
                      <span className="text-gray-500">({driver.totalReviews} reviews)</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" />
                        <span>{driver.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaAward className="text-blue-600" />
                        <span>{driver.experience} Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-600" />
                        <span>{driver.responseTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <FaShieldAlt /> Licensed & Insured
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <FaCheckCircle /> 24/7 Emergency Service
                      </span>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex flex-col gap-3 md:min-w-50">
                    <a 
                      href={`tel:${driver.phone}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <FaPhone /> Call Now
                    </a>
                    <a 
                      href={`https://wa.me/${driver.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a 
                      href={`mailto:${driver.email}`}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      <FaEnvelope /> Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              {['about', 'tours', 'reviews', 'gallery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
                    selectedTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {/* About Tab */}
            {selectedTab === 'about' && (
              <div className="space-y-8">
                {/* Bio */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About Me</h3>
                  <p className="text-gray-700 leading-relaxed">{driver.bio}</p>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaLanguage className="text-blue-600" /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {driver.languages.map((lang, index) => (
                      <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vehicle Types */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FaCar className="text-blue-600" /> Available Vehicles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {driver.vehicleTypes.map((vehicle, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                          <FaCar className="text-2xl text-blue-600" />
                          <span className="font-medium text-gray-800">{vehicle}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Specialties</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {driver.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaCheckCircle className="text-green-600 shrink-0" />
                        <span className="text-gray-800">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center p-4">
                    <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Health & Safety</h4>
                    <p className="text-sm text-gray-600">Certified Safe Travel</p>
                  </div>
                  <div className="text-center p-4">
                    <FaCar className="text-4xl text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">AC Vehicles</h4>
                    <p className="text-sm text-gray-600">Comfortable & Clean</p>
                  </div>
                  <div className="text-center p-4">
                    <FaUsers className="text-4xl text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Groups Welcome</h4>
                    <p className="text-sm text-gray-600">1-10 Passengers</p>
                  </div>
                  <div className="text-center p-4">
                    <MdLocalOffer className="text-4xl text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Best Prices</h4>
                    <p className="text-sm text-gray-600">Competitive Rates</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tours Tab */}
            {selectedTab === 'tours' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Tour Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularTours.map((tour) => (
                    <div key={tour.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="h-48 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                        Tour Image
                      </div>
                      <div className="p-5">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{tour.title}</h4>
                        <div className="flex items-center justify-between mb-4">
                          <span className="flex items-center gap-2 text-gray-600">
                            <FaClock /> {tour.duration}
                          </span>
                          <span className="text-2xl font-bold text-blue-600">{tour.price}</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          {tour.highlights.slice(0, 3).map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                              <FaCheckCircle className="text-green-600 mt-0.5 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{driver.rating}</div>
                    <div className="flex items-center justify-end gap-1 text-yellow-400">
                      {renderStars(driver.rating)}
                    </div>
                    <div className="text-sm text-gray-600">{driver.totalReviews} reviews</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900">{review.name}</h4>
                              <p className="text-sm text-gray-600">{review.country}</p>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3 text-yellow-400">
                            {renderStars(review.rating)}
                          </div>
                          <div className="relative">
                            <FaQuoteLeft className="absolute -left-2 -top-2 text-blue-200 text-2xl" />
                            <p className="text-gray-700 leading-relaxed pl-6">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}

            {/* Gallery Tab */}
            {selectedTab === 'gallery' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-video bg-linear-to-br from-blue-400 to-blue-600 rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer flex items-center justify-center text-white font-semibold">
                      Gallery Image {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="mt-8 bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Sri Lanka?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book your unforgettable tour today and discover the beauty of the Pearl of the Indian Ocean
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`https://wa.me/${driver.whatsapp}`}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> Book via WhatsApp
              </a>
              <a 
                href={`tel:${driver.phone}`}
                className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-bold text-lg flex items-center justify-center gap-2 border-2 border-white"
              >
                <FaPhone /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Trust Badges */}
        <div className="mt-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebook />
                  </a>
                  <a href="#" className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="#" className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <FaYoutube />
                  </a>
                  <a href="#" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                    <FaTripadvisor />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-6 text-center md:text-left">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{driver.totalReviews}+</div>
                  <div className="text-sm text-gray-600">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">{driver.rating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">12+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}