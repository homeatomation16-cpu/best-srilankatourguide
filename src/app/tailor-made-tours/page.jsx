"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Image from "next/image";

/* ---------- Config / Static Data ---------- */
const initialForm = {
  travelStyle: "",
  vehicleType: "Car",
  transportMethod: "",
  holidayType: [],
  accommodation: "3 Star",
  mealPlan: "",
  additionalServices: {
    trainTickets: false,
    entranceTickets: false,
    airportTransfer: false,
  },
  additionalRequirements: "",
  adults: 1,
  children: 0,
  startDate: "",
  endDate: "",
  name: "",
  email: "",
  whatsapp: "+94",
};

const holidayOptions = [
  { name: "Nature, Wildlife & Safari", icon: "🦁", color: "emerald" },
  { name: "Cultural & Heritage", icon: "🏛️", color: "amber" },
  { name: "Beach Relaxing", icon: "🏖️", color: "cyan" },
  { name: "Trekking & Climbing", icon: "⛰️", color: "slate" },
  { name: "Activity and Game", icon: "🎯", color: "purple" },
  { name: "Boat trips & Island visits", icon: "⛵", color: "blue" },
  { name: "Train Rides", icon: "🚂", color: "orange" },
  { name: "Factory Visits", icon: "🏭", color: "gray" },
  { name: "Water Sports", icon: "🏄", color: "teal" },
  { name: "Snorkelling & Diving", icon: "🤿", color: "indigo" },
  { name: "Whales and Dolphins", icon: "🐋", color: "blue" },
];

const mealPlans = [
  "Room only",
  "Bed & Breakfast",
  "Half Board",
  "Full Board",
  "All Inclusive",
];

const travelStyles = [
  { label: "Relaxed", icon: "🌴" },
  { label: "Moderate", icon: "🚶" },
  { label: "Active", icon: "🏃" },
  { label: "Luxury", icon: "💎" },
];

/* ---------- Component ---------- */
export default function TailorMadePage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [estimatedDays, setEstimatedDays] = useState(0);

  useEffect(() => {
    if (form.startDate && form.endDate) {
      const start = new Date(form.startDate);
      const end = new Date(form.endDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      setEstimatedDays(diff > 0 ? diff : 0);
    } else {
      setEstimatedDays(0);
    }
  }, [form.startDate, form.endDate]);

  const setField = (field, value) => {
    setForm((s) => ({ ...s, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const toggleHoliday = (optionName) => {
    setForm((s) => {
      const set = new Set(s.holidayType);
      if (set.has(optionName)) set.delete(optionName);
      else set.add(optionName);
      return { ...s, holidayType: Array.from(set) };
    });
    if (errors.holidayType) setErrors((e) => ({ ...e, holidayType: null }));
  };

  const handleServiceToggle = (key) => {
    setForm((s) => ({
      ...s,
      additionalServices: {
        ...s.additionalServices,
        [key]: !s.additionalServices[key],
      },
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.travelStyle) e.travelStyle = "Please select how you want to travel.";
    if (!form.transportMethod) e.transportMethod = "Choose a transportation method.";
    if (!form.holidayType || form.holidayType.length === 0)
      e.holidayType = "Choose at least one holiday type.";
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email required.";
    if (!form.whatsapp || form.whatsapp.length < 7)
      e.whatsapp = "Valid phone number required.";
    if (!form.startDate) e.startDate = "Start date required.";
    if (!form.endDate) e.endDate = "End date required.";
    if (
      form.startDate &&
      form.endDate &&
      new Date(form.startDate) > new Date(form.endDate)
    )
      e.date = "End date must be after start date.";
    if (form.adults < 1) e.adults = "At least 1 adult required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitted(true);
    try {
      const res = await fetch("/api/tailor-made", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, estimatedDays }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();

      setShowSuccess(true);

      const message = `
🌴 Tailor Made Tour Request

Name: ${form.name}
Email: ${form.email}
WhatsApp: ${form.whatsapp}

Travel Style: ${form.travelStyle}
Vehicle: ${form.vehicleType}
Transport: ${form.transportMethod}

Holiday Types:
${form.holidayType.join(", ")}

Adults: ${form.adults}
Children: ${form.children}

From: ${form.startDate}
To: ${form.endDate}
Duration: ${estimatedDays} days
      `.trim();

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/94769300334?text=${encoded}`, "_blank");

      setTimeout(() => {
        setShowSuccess(false);
        setSubmitted(false);
        setForm(initialForm);
      }, 3000);
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
      setSubmitted(false);
    }
  };

  const calculateProgress = () => {
    const requiredFields = [
      "travelStyle",
      "transportMethod",
      "holidayType",
      "startDate",
      "endDate",
      "name",
      "email",
      "whatsapp",
    ];
    let filled = 0;
    requiredFields.forEach((field) => {
      if (field === "holidayType") {
        if (form[field] && form[field].length > 0) filled++;
      } else if (form[field] && form[field] !== "+94") {
        filled++;
      }
    });
    return (filled / requiredFields.length) * 100;
  };
  const progress = calculateProgress();

  const blobTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 8,
    ease: "easeInOut",
  };

  /* ---- Section heading component ---- */
  const SectionHead = ({ number, label, gradient }) => (
    <div className="flex items-center gap-3 mb-5">
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center text-white font-black text-base sm:text-lg shrink-0`}
      >
        {number}
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-gray-800">{label}</h3>
    </div>
  );

  return (
    <div className="flex flex-col bg-amber-50 relative min-h-screen">
      {/* ---- Hero ---- */}
      <header className="relative h-[55vh] sm:h-[70vh] w-full overflow-hidden">
        <Image
          src="/cover.jpg"
          alt="Sri Lanka Excursions"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-linear-to-t from-[#faf7f2] via-[#faf7f2]/70 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Design Your Dream
            <span className="block text-[#d4a853] italic mt-1">
              Sri Lanka Journey
            </span>
          </h1>
        </div>
      </header>

      {/* ---- Blobs ---- */}
      <motion.div
        aria-hidden
        initial={{ x: -20, y: 0, scale: 1 }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 10, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={blobTransition}
        className="pointer-events-none absolute top-20 left-4 sm:left-8 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-orange-300 mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        aria-hidden
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={{ x: [0, -40, 30, 0], y: [0, 20, -20, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ ...blobTransition, duration: 10 }}
        className="pointer-events-none absolute top-40 right-4 sm:right-8 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-yellow-300 mix-blend-multiply filter blur-3xl opacity-25"
      />

      {/* ---- Top Nav Bar ---- */}
      <div className="relative bg-white/80 backdrop-blur-lg shadow-sm border-b-4 border-orange-400 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-300 to-orange-400 flex items-center justify-center font-black text-lg shrink-0">
                ☀️
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-pink-600 leading-tight">
                  Tailor Made Tours
                </h1>
                <p className="text-gray-600 font-medium text-sm sm:text-base">
                  Design your perfect Sri Lankan adventure ✨
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1 text-sm">
              <a
                href="mailto:info@srilankatoursdriver.com"
                className="text-orange-600 hover:text-orange-700 font-medium truncate"
              >
                info@srilankatoursdriver.com
              </a>
              <span className="text-gray-600 whitespace-nowrap">(+94) 769 300 334</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-bold text-gray-700">
                Form Progress: {Math.round(progress)}%
              </span>
              <span className="text-xs text-gray-500">
                {progress === 100 ? "Ready to submit! 🎉" : "Fill all required fields"}
              </span>
            </div>
            <div className="h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-orange-500 via-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- Main Content ---- */}
      <main className="relative max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ========== FORM ========== */}
          <section className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Form header */}
              <div className="bg-linear-to-rrom-orange-500 via-pink-500 to-purple-500 p-5 sm:p-8 text-white">
                <h2 className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2">
                  Create Your Dream Tour
                </h2>
                <p className="text-white/90 text-sm sm:text-lg">
                  Tell us your preferences and we&apos;ll craft the perfect itinerary
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-8" noValidate>

                {/* ---- Section 1: Travel Preferences ---- */}
                <div className="space-y-5">
                  <SectionHead
                    number="1"
                    label="Travel Preferences"
                    gradient="from-orange-400 to-pink-500"
                  />

                  {/* Travel Style */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      How do you want to travel? *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {travelStyles.map(({ label, icon }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setField("travelStyle", label)}
                          aria-pressed={form.travelStyle === label}
                          className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 font-semibold transition-all ${
                            form.travelStyle === label
                              ? "bg-linear-to-br from-orange-500 to-pink-500 text-white border-orange-500 shadow-lg scale-105"
                              : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                          }`}
                        >
                          <div className="text-xl sm:text-2xl">{icon}</div>
                          <div className="mt-1 text-xs sm:text-sm">{label}</div>
                        </button>
                      ))}
                    </div>
                    {errors.travelStyle && (
                      <p className="text-sm text-red-600 mt-2">⚠️ {errors.travelStyle}</p>
                    )}
                  </div>

                  {/* Vehicle + Transport */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="vehicleType" className="block text-sm font-bold text-gray-700 mb-2">
                        Type of Vehicle *
                      </label>
                      <select
                        id="vehicleType"
                        value={form.vehicleType}
                        onChange={(e) => setField("vehicleType", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-sm"
                      >
                        <option value="Car">🚗 Car</option>
                        <option value="Van">🚐 Van</option>
                        <option value="Bus">🚌 Bus</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="transportMethod" className="block text-sm font-bold text-gray-700 mb-2">
                        Transportation Method *
                      </label>
                      <select
                        id="transportMethod"
                        value={form.transportMethod}
                        onChange={(e) => setField("transportMethod", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-sm"
                      >
                        <option value="">Select method...</option>
                        <option value="Private Driver">👨‍✈️ Private Driver</option>
                        <option value="Self Drive">🗺️ Self Drive</option>
                        <option value="Public Transport">🚌 Public Transport</option>
                        <option value="Combination">🔄 Combination</option>
                      </select>
                      {errors.transportMethod && (
                        <p className="text-sm text-red-600 mt-2">⚠️ {errors.transportMethod}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ---- Section 2: Holiday Activities ---- */}
                <div className="space-y-5">
                  <SectionHead
                    number="2"
                    label="Holiday Activities"
                    gradient="from-pink-400 to-purple-500"
                  />
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      What interests you? (Select all that apply) *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                      {holidayOptions.map((option) => {
                        const isSelected = form.holidayType.includes(option.name);
                        return (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() => toggleHoliday(option.name)}
                            aria-pressed={isSelected}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              isSelected
                                ? "border-orange-400 bg-orange-50 shadow-md scale-105"
                                : "bg-white border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="text-xl sm:text-2xl mb-1">{option.icon}</div>
                            <div className="text-xs font-bold text-gray-700 leading-tight">
                              {option.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {errors.holidayType && (
                      <p className="text-sm text-red-600 mt-2">⚠️ {errors.holidayType}</p>
                    )}
                    {form.holidayType.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {form.holidayType.length} selected
                      </p>
                    )}
                  </div>
                </div>

                {/* ---- Section 3: Accommodation & Dining ---- */}
                <div className="space-y-5">
                  <SectionHead
                    number="3"
                    label="Accommodation & Dining"
                    gradient="from-purple-400 to-indigo-500"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="accommodation" className="block text-sm font-bold text-gray-700 mb-2">
                        Accommodation Type *
                      </label>
                      <select
                        id="accommodation"
                        value={form.accommodation}
                        onChange={(e) => setField("accommodation", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-sm"
                      >
                        <option value="3 Star">⭐⭐⭐ 3 Star</option>
                        <option value="4 Star">⭐⭐⭐⭐ 4 Star</option>
                        <option value="5 Star">⭐⭐⭐⭐⭐ 5 Star</option>
                        <option value="I'll Arrange My Own">🏠 I&apos;ll Arrange My Own</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mealPlan" className="block text-sm font-bold text-gray-700 mb-2">
                        Meal Plan (Optional)
                      </label>
                      <select
                        id="mealPlan"
                        value={form.mealPlan}
                        onChange={(e) => setField("mealPlan", e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium text-sm"
                      >
                        <option value="">Select meal plan...</option>
                        {mealPlans.map((plan) => (
                          <option key={plan} value={plan}>
                            🍽️ {plan}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Additional Services
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { key: "trainTickets", label: "🚂 Train Tickets" },
                        { key: "entranceTickets", label: "🎫 Entrance Tickets" },
                        { key: "airportTransfer", label: "🚗 Airport Transfer" },
                      ].map(({ key, label }) => (
                        <label
                          key={key}
                          className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200"
                        >
                          <input
                            type="checkbox"
                            checked={form.additionalServices[key]}
                            onChange={() => handleServiceToggle(key)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded focus:ring-orange-500 shrink-0"
                          />
                          <span className="text-xs sm:text-sm font-semibold">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Special Requests or Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={form.additionalRequirements}
                      onChange={(e) => setField("additionalRequirements", e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none text-sm"
                      placeholder="Dietary restrictions, accessibility needs, special occasions..."
                    />
                  </div>
                </div>

                {/* ---- Section 4: Trip Details ---- */}
                <div className="space-y-5">
                  <SectionHead
                    number="4"
                    label="Trip Details"
                    gradient="from-indigo-400 to-blue-500"
                  />

                  {/* Guests */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="adults" className="block text-sm font-bold text-gray-700 mb-2">
                        Adults *
                      </label>
                      <input
                        id="adults"
                        type="number"
                        inputMode="numeric"
                        min="1"
                        max="20"
                        value={form.adults}
                        onChange={(e) => setField("adults", Math.max(1, Number(e.target.value || 1)))}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-center font-bold"
                      />
                      {errors.adults && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.adults}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="children" className="block text-sm font-bold text-gray-700 mb-2">
                        Children
                      </label>
                      <input
                        id="children"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="10"
                        value={form.children}
                        onChange={(e) => setField("children", Math.max(0, Number(e.target.value || 0)))}
                        className="w-full px-3 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-center font-bold"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        id="startDate"
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setField("startDate", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                      />
                      {errors.startDate && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.startDate}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="endDate" className="block text-sm font-bold text-gray-700 mb-2">
                        End Date *
                      </label>
                      <input
                        id="endDate"
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setField("endDate", e.target.value)}
                        min={form.startDate || new Date().toISOString().split("T")[0]}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                      />
                      {errors.endDate && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.endDate}</p>
                      )}
                      {errors.date && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.date}</p>
                      )}
                    </div>
                  </div>

                  {estimatedDays > 0 && (
                    <div className="p-3 sm:p-4 rounded-xl border-2 border-blue-200 bg-blue-50">
                      <p className="text-center font-bold text-blue-700 text-sm sm:text-base">
                        📅 Your trip duration: {estimatedDays} day{estimatedDays !== 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                </div>

                {/* ---- Section 5: Contact ---- */}
                <div className="space-y-5">
                  <SectionHead
                    number="5"
                    label="Contact Information"
                    gradient="from-blue-400 to-cyan-500"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-sm"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">⚠️ {errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp Phone Input */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      WhatsApp Number *
                    </label>
                    <div
                      className={`rounded-xl border-2 px-3 py-1 transition-all ${
                        errors.whatsapp
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200 bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200"
                      }`}
                    >
                      <PhoneInput
                        defaultCountry="LK"
                        value={form.whatsapp}
                        onChange={(value) => {
                          setField("whatsapp", value || "");
                        }}
                        className="text-sm"
                        numberInputProps={{
                          className:
                            "w-full outline-none border-none bg-transparent py-2 text-gray-800 text-sm placeholder-gray-400",
                          placeholder: "76 930 0334",
                        }}
                      />
                    </div>
                    {errors.whatsapp && (
                      <p className="text-xs text-red-600 mt-1">⚠️ {errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* ---- Submit ---- */}
                <div className="pt-5 border-t-2 border-gray-200">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitted}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 text-white text-base sm:text-lg font-black rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitted ? "Sending..." : "🚀 Send My Request"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setErrors({});
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto px-5 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-sm sm:text-base"
                    >
                      Reset Form
                    </button>

                    <div className="sm:ml-auto text-xs sm:text-sm text-gray-600 text-center sm:text-right pt-1 sm:pt-0">
                      <p className="font-semibold">Need help?</p>
                      <a
                        href="tel:+94702062697"
                        className="text-orange-600 hover:text-orange-700 font-bold"
                      >
                        (+94) 702 062 697
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </section>

          {/* ========== SIDEBAR ========== */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0 space-y-4 sm:space-y-6">
            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">📞 Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-lg shrink-0">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      No:96, Maddawaththa, Halthota, Bandaragama, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-lg shrink-0">📞</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:+94702062697" className="text-orange-600 hover:text-orange-700">
                      (+94) 702 062 697
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500 text-lg shrink-0">✉️</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <a
                      href="mailto:info@srilankatoursdriver.com"
                      className="text-orange-600 hover:text-orange-700 text-xs sm:text-sm break-all"
                    >
                      info@srilankatoursdriver.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-linear-to-br from-orange-500 to-pink-500 rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 text-white"
            >
              <h3 className="text-lg sm:text-xl font-black mb-4">✨ Why Choose Us?</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  "Licensed & experienced tour guides",
                  "Fully customizable itineraries",
                  "Best price guaranteed",
                  "24/7 customer support",
                  "Flexible payment options",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-base shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6"
            >
              <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">🌐 Follow Us</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <a
                  href="#"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition hover:scale-105"
                >
                  <FaFacebook className="text-xl" />
                  <span className="text-xs font-semibold">Facebook</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 bg-linear-to-br from-pink-500 via-red-500 to-yellow-400 text-white rounded-xl hover:opacity-90 transition hover:scale-105"
                >
                  <FaInstagram className="text-xl" />
                  <span className="text-xs font-semibold">Instagram</span>
                </a>
                <a
                  href="#"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition hover:scale-105"
                >
                  <FaYoutube className="text-xl" />
                  <span className="text-xs font-semibold">YouTube</span>
                </a>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* ---- Success Modal ---- */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center mx-4"
            >
              <div className="text-5xl sm:text-6xl mb-4">🎉</div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-800 mb-2">
                Request Sent!
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Thank you — we&apos;re opening WhatsApp so you can connect with us directly.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <FaWhatsapp className="text-xl sm:text-2xl" />
                <span className="font-semibold">Opening WhatsApp...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}