"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const mealPlans = ["Room only", "Bed & Breakfast", "Half Board", "Full Board", "All Inclusive"];

/* Static mapping for Tailwind classes (keeps classes static so JIT picks them up) */
const holidayColorClasses = {
  emerald: "bg-emerald-50 border-emerald-400",
  amber: "bg-amber-50 border-amber-400",
  cyan: "bg-cyan-50 border-cyan-400",
  slate: "bg-slate-50 border-slate-400",
  purple: "bg-purple-50 border-purple-400",
  blue: "bg-blue-50 border-blue-400",
  orange: "bg-orange-50 border-orange-400",
  gray: "bg-gray-50 border-gray-300",
  teal: "bg-teal-50 border-teal-400",
  indigo: "bg-indigo-50 border-indigo-400",
};

/* ---------- Component ---------- */
export default function TailorMadePage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [estimatedDays, setEstimatedDays] = useState(0);

  // calculate estimated days (safe)
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

  // update field + clear its error
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
      additionalServices: { ...s.additionalServices, [key]: !s.additionalServices[key] },
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.travelStyle) e.travelStyle = "Please select how you want to travel.";
    if (!form.transportMethod) e.transportMethod = "Choose a transportation method.";
    if (!form.holidayType || form.holidayType.length === 0) e.holidayType = "Choose at least one holiday type.";
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.whatsapp.trim() || !/^\+?[0-9\s\-()]{6,20}$/.test(form.whatsapp)) e.whatsapp = "Valid phone required.";
    if (!form.startDate) e.startDate = "Start date required.";
    if (!form.endDate) e.endDate = "End date required.";
    if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) e.date = "End date must be after start date.";
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
    setShowSuccess(true);

    // Build message and open WhatsApp
    const message = `
🌴 *Tailor Made Tour Request*

👤 *Personal Details:*
Name: ${form.name}
Email: ${form.email}
WhatsApp: ${form.whatsapp}

🎯 *Travel Preferences:*
Style: ${form.travelStyle}
Vehicle: ${form.vehicleType}
Transport: ${form.transportMethod}

🏖️ *Holiday Types:*
${form.holidayType.join(", ")}

🏨 *Accommodation:*
Type: ${form.accommodation}
Meal Plan: ${form.mealPlan || "Not specified"}

👥 *Travelers:*
Adults: ${form.adults}
Children: ${form.children}

📅 *Dates:*
From: ${form.startDate}
To: ${form.endDate}
Duration: ${estimatedDays} days

🎫 *Additional Services:*
${form.additionalServices.trainTickets ? "✓ Train Tickets" : ""}
${form.additionalServices.entranceTickets ? "✓ Entrance Tickets" : ""}
${form.additionalServices.airportTransfer ? "✓ Airport Transfer" : ""}

📝 *Additional Requirements:*
${form.additionalRequirements || "None"}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/94769300334?text=${encodedMessage}`;

    // try open in new tab
    window.open(whatsappUrl, "_blank");

    // reset after short delay
    setTimeout(() => {
      setShowSuccess(false);
      setSubmitted(false);
      setForm(initialForm);
    }, 3000);
  };

  // progress calculation for header bar
  const calculateProgress = () => {
    const requiredFields = ["travelStyle", "transportMethod", "holidayType", "startDate", "endDate", "name", "email", "whatsapp"];
    let filled = 0;
    requiredFields.forEach((field) => {
      if (field === "holidayType") {
        if (form[field] && form[field].length > 0) filled++;
      } else if (form[field]) {
        filled++;
      }
    });
    return (filled / requiredFields.length) * 100;
  };
  const progress = calculateProgress();

  /* motion blobs animation variants */
  const blobTransition = {
    repeat: Infinity,
    repeatType: "reverse",
    duration: 8,
    ease: "easeInOut",
  };

  return (
    <div className="flex mt-18 flex-col bg-linear-to-b from-orange-50 via-amber-50 to-yellow-50 min-h-screen relative">
      {/* Animated blobs using framer-motion (no style jsx) */}
      <motion.div
        aria-hidden
        initial={{ x: -20, y: 0, scale: 1 }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 10, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={blobTransition}
        className="pointer-events-none absolute top-20 left-8 w-72 h-72 rounded-full bg-orange-300 mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        aria-hidden
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={{ x: [0, -40, 30, 0], y: [0, 20, -20, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ ...blobTransition, duration: 10 }}
        className="pointer-events-none absolute top-40 right-8 w-72 h-72 rounded-full bg-yellow-300 mix-blend-multiply filter blur-3xl opacity-28"
      />
      <motion.div
        aria-hidden
        initial={{ x: 0, y: 0, scale: 1 }}
        animate={{ x: [-10, 30, -30, -10], y: [0, -20, 30, 0], scale: [1, 1.04, 0.96, 1] }}
        transition={{ ...blobTransition, duration: 9 }}
        className="pointer-events-none absolute bottom-20 left-1/2 w-72 h-72 rounded-full bg-pink-300 mix-blend-multiply filter blur-3xl opacity-24"
      />

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-lg shadow-sm border-b-4 border-orange-400 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Small inline logo */}
              <div aria-hidden className="w-12 h-12 rounded-full bg-linear-to-br from-yellow-300 to-orange-400 flex items-center justify-center text-white font-black">
                ☀️
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-pink-600">
                  Tailor Made Tours
                </h1>
                <p className="text-gray-600 font-medium mt-1">Design your perfect Sri Lankan adventure ✨</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <a href="mailto:info@srilankatoursdriver.com" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                info@srilankatoursdriver.com
              </a>
              <span className="text-sm text-gray-600">(+94) 769 300 334</span>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">Form Progress: {Math.round(progress)}%</span>
              <span className="text-xs text-gray-500">{progress === 100 ? "Ready to submit! 🎉" : "Fill all required fields"}</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-orange-500 via-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Use flex + wrap for responsive layout (no grid columns) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form (left/top) */}
          <section className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 p-8 text-white">
                <h2 className="text-3xl font-black mb-2">Create Your Dream Tour</h2>
                <p className="text-white/90 text-lg">Tell us your preferences and we&apos;ll craft the perfect itinerary for you</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8" noValidate>
                {/* 1: Travel Preferences */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-black text-lg">1</div>
                    <h3 className="text-2xl font-black text-gray-800">Travel Preferences</h3>
                  </div>

                  <div>
                    <label htmlFor="travelStyle" className="block text-sm font-bold text-gray-700 mb-3">How do you want to travel? *</label>

                    {/* flex wrap instead of grid */}
                    <div id="travelStyle" className="flex flex-wrap gap-3">
                      {["Relaxed", "Moderate", "Active", "Luxury"].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setField("travelStyle", style)}
                          aria-pressed={form.travelStyle === style}
                          className={`p-4 rounded-2xl border-2 font-semibold transition-all transform hover:scale-105 ${
                            form.travelStyle === style ? "bg-linear-to-br from-orange-500 to-pink-500 text-white border-orange-500 shadow-lg" : "bg-white border-gray-200 text-gray-700 hover:border-orange-300"
                          } w-1/2 sm:w-1/4`}
                        >
                          <div className="text-lg">
                            {style === "Relaxed" ? "🌴" : style === "Moderate" ? "🚶" : style === "Active" ? "🏃" : "💎"}
                          </div>
                          <div className="mt-1">{style}</div>
                        </button>
                      ))}
                    </div>
                    {errors.travelStyle && <p className="text-sm text-red-600 mt-2">⚠️ {errors.travelStyle}</p>}
                  </div>

                  {/* Vehicle + Transport (flex) */}
                  <div className="flex flex-wrap gap-6">
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="vehicleType" className="block text-sm font-bold text-gray-700 mb-3">Type of Vehicle *</label>
                      <select id="vehicleType" value={form.vehicleType} onChange={(e) => setField("vehicleType", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium">
                        <option value="Car">🚗 Car</option>
                        <option value="Van">🚐 Van</option>
                        <option value="Bus">🚌 Bus</option>
                      </select>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label htmlFor="transportMethod" className="block text-sm font-bold text-gray-700 mb-3">Transportation Method *</label>
                      <select id="transportMethod" value={form.transportMethod} onChange={(e) => setField("transportMethod", e.target.value)} aria-invalid={!!errors.transportMethod} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium">
                        <option value="">Select method...</option>
                        <option value="Private Driver">👨‍✈️ Private Driver</option>
                        <option value="Self Drive">🗺️ Self Drive</option>
                        <option value="Public Transport">🚌 Public Transport</option>
                        <option value="Combination">🔄 Combination</option>
                      </select>
                      {errors.transportMethod && <p className="text-sm text-red-600 mt-2">⚠️ {errors.transportMethod}</p>}
                    </div>
                  </div>
                </div>

                {/* 2: Holiday Activities */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-black text-lg">2</div>
                    <h3 className="text-2xl font-black text-gray-800">Holiday Activities</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">What interests you? (Select all that apply) *</label>

                    {/* flex + wrap for holiday options */}
                    <div className="flex flex-wrap gap-3">
                      {holidayOptions.map((option) => {
                        const isSelected = form.holidayType.includes(option.name);
                        const colorClass = holidayColorClasses[option.color] || "bg-gray-50 border-gray-200";
                        return (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() => toggleHoliday(option.name)}
                            aria-pressed={isSelected}
                            className={`p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${isSelected ? `${colorClass} shadow-md scale-105` : "bg-white border-gray-200 hover:border-gray-300"} w-1/2 sm:w-1/3 lg:w-1/4`}
                          >
                            <div className="text-2xl mb-1">{option.icon}</div>
                            <div className="text-xs font-bold text-gray-700">{option.name}</div>
                          </button>
                        );
                      })}
                    </div>

                    {errors.holidayType && <p className="text-sm text-red-600 mt-2">⚠️ {errors.holidayType}</p>}
                    {form.holidayType.length > 0 && <p className="text-sm text-green-600 mt-2">✓ {form.holidayType.length} selected</p>}
                  </div>
                </div>

                {/* 3: Accommodation & Meals */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-black text-lg">3</div>
                    <h3 className="text-2xl font-black text-gray-800">Accommodation & Dining</h3>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="accommodation" className="block text-sm font-bold text-gray-700 mb-3">Accommodation Type *</label>
                      <select id="accommodation" value={form.accommodation} onChange={(e) => setField("accommodation", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium">
                        <option value="3 Star">⭐⭐⭐ 3 Star</option>
                        <option value="4 Star">⭐⭐⭐⭐ 4 Star</option>
                        <option value="5 Star">⭐⭐⭐⭐⭐ 5 Star</option>
                        <option value="I'll Arrange My Own">🏠 I&apos;ll Arrange My Own</option>
                      </select>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label htmlFor="mealPlan" className="block text-sm font-bold text-gray-700 mb-3">Meal Plan (Optional)</label>
                      <select id="mealPlan" value={form.mealPlan} onChange={(e) => setField("mealPlan", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium">
                        <option value="">Select meal plan...</option>
                        {mealPlans.map((plan) => <option key={plan} value={plan}>🍽️ {plan}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Additional Services</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200 w-full sm:w-1/3">
                        <input type="checkbox" checked={form.additionalServices.trainTickets} onChange={() => handleServiceToggle("trainTickets")} className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                        <span className="text-sm font-semibold">🚂 Train Tickets</span>
                      </label>

                      <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200 w-full sm:w-1/3">
                        <input type="checkbox" checked={form.additionalServices.entranceTickets} onChange={() => handleServiceToggle("entranceTickets")} className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                        <span className="text-sm font-semibold">🎫 Entrance Tickets</span>
                      </label>

                      <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200 w-full sm:w-1/3">
                        <input type="checkbox" checked={form.additionalServices.airportTransfer} onChange={() => handleServiceToggle("airportTransfer")} className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                        <span className="text-sm font-semibold">✈️ Airport Transfer</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Special Requests or Requirements</label>
                    <textarea rows={4} value={form.additionalRequirements} onChange={(e) => setField("additionalRequirements", e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all resize-none" placeholder="Dietary restrictions, accessibility needs, special occasions..." />
                  </div>
                </div>

                {/* 4: Trip Details */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-400 to-blue-500 flex items-center justify-center text-white font-black text-lg">4</div>
                    <h3 className="text-2xl font-black text-gray-800">Trip Details</h3>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="w-full sm:w-1/2">
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="adults" className="block text-sm font-bold text-gray-700 mb-3">Adults *</label>
                          <input id="adults" type="number" min="1" max="20" value={form.adults} onChange={(e) => setField("adults", Math.max(1, Number(e.target.value || 1)))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-center" aria-invalid={!!errors.adults} />
                          {errors.adults && <p className="text-sm text-red-600 mt-2">⚠️ {errors.adults}</p>}
                        </div>

                        <div className="w-1/2">
                          <label htmlFor="children" className="block text-sm font-bold text-gray-700 mb-3">Children</label>
                          <input id="children" type="number" min="0" max="10" value={form.children} onChange={(e) => setField("children", Math.max(0, Number(e.target.value || 0)))} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all text-center" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-3">Start Date *</label>
                          <input id="startDate" type="date" value={form.startDate} onChange={(e) => setField("startDate", e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
                          {errors.startDate && <p className="text-sm text-red-600 mt-2">⚠️ {errors.startDate}</p>}
                        </div>

                        <div className="w-1/2">
                          <label htmlFor="endDate" className="block text-sm font-bold text-gray-700 mb-3">End Date *</label>
                          <input id="endDate" type="date" value={form.endDate} onChange={(e) => setField("endDate", e.target.value)} min={form.startDate || new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
                          {errors.endDate && <p className="text-sm text-red-600 mt-2">⚠️ {errors.endDate}</p>}
                          {errors.date && <p className="text-sm text-red-600 mt-2">⚠️ {errors.date}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {estimatedDays > 0 && (
                    <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50">
                      <p className="text-center font-bold text-blue-700">📅 Your trip duration: {estimatedDays} day{estimatedDays !== 1 ? "s" : ""}</p>
                    </div>
                  )}
                </div>

                {/* 5: Contact */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-black text-lg">5</div>
                    <h3 className="text-2xl font-black text-gray-800">Contact Information</h3>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <div className="w-full sm:w-1/3">
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">Your Name *</label>
                      <input id="name" type="text" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
                      {errors.name && <p className="text-sm text-red-600 mt-2">⚠️ {errors.name}</p>}
                    </div>

                    <div className="w-full sm:w-1/3">
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">Email Address *</label>
                      <input id="email" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
                      {errors.email && <p className="text-sm text-red-600 mt-2">⚠️ {errors.email}</p>}
                    </div>

                    <div className="w-full sm:w-1/3">
                      <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-700 mb-3">WhatsApp Number *</label>
                      <input id="whatsapp" type="tel" value={form.whatsapp} onChange={(e) => setField("whatsapp", e.target.value)} placeholder="+94 XXX XXX XXX" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all" />
                      {errors.whatsapp && <p className="text-sm text-red-600 mt-2">⚠️ {errors.whatsapp}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t-2 border-gray-200">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <button type="submit" disabled={submitted} className="w-full md:w-auto px-8 py-4 bg-linear-to-r from-orange-500 via-pink-500 to-purple-500 text-white text-lg font-black rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50">
                      {submitted ? "Sending..." : "🚀 Send My Request"}
                    </button>

                    <button type="button" onClick={() => { setForm(initialForm); setErrors({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all">
                      Reset Form
                    </button>

                    <div className="md:ml-auto text-sm text-gray-600">
                      <p className="font-semibold">Need help?</p>
                      <a href="tel:+94769300334" className="text-orange-600 hover:text-orange-700 font-bold">Call us: +94 769 300 334</a>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </section>

          {/* Sidebar (right/bottom) - use fixed width on lg, full width on small */}
          <aside className="w-full lg:w-1/3 shrink-0 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">📞 Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><span className="text-orange-500 text-lg">📍</span><div><p className="font-semibold">Address</p><p className="text-gray-600">No:96, Maddawaththa, Halthota, Bandaragama, Sri Lanka</p></div></div>
                <div className="flex items-start gap-3"><span className="text-orange-500 text-lg">📞</span><div><p className="font-semibold">Phone</p><a href="tel:+94769300334" className="text-orange-600 hover:text-orange-700">(+94) 769 300 334</a></div></div>
                <div className="flex items-start gap-3"><span className="text-orange-500 text-lg">✉️</span><div><p className="font-semibold">Email</p><a href="mailto:info@srilankatoursdriver.com" className="text-orange-600 hover:text-orange-700">info@srilankatoursdriver.com</a></div></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-linear-to-br from-orange-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-black mb-4">✨ Why Choose Us?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2"><span className="text-xl">✓</span><span>Licensed & experienced tour guides</span></li>
                <li className="flex items-start gap-2"><span className="text-xl">✓</span><span>Fully customizable itineraries</span></li>
                <li className="flex items-start gap-2"><span className="text-xl">✓</span><span>Best price guaranteed</span></li>
                <li className="flex items-start gap-2"><span className="text-xl">✓</span><span>24/7 customer support</span></li>
                <li className="flex items-start gap-2"><span className="text-xl">✓</span><span>Flexible payment options</span></li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">🏝️ Popular Destinations</h3>
              <div className="space-y-2 text-sm">
                {["Sigiriya Rock Fortress", "Ella & Nine Arch Bridge", "Yala National Park", "Galle Fort", "Kandy Temple", "Mirissa Beach"].map((dest, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded-lg transition-all cursor-pointer"><span className="text-orange-500">🌟</span><span className="font-medium text-gray-700">{dest}</span></div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-black text-gray-800 mb-4">🌐 Follow Us</h3>
              <div className="flex gap-3">
                <button className="flex-1 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition transform hover:scale-105"><span className="font-bold text-xs">Facebook</span></button>
                <button className="flex-1 p-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition transform hover:scale-105"><span className="font-bold text-xs">Instagram</span></button>
                <button className="flex-1 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition transform hover:scale-105"><span className="font-bold text-xs">YouTube</span></button>
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Request Sent!</h3>
              <p className="text-gray-600 mb-6">Thank you — we&apos;re opening WhatsApp so you can connect with us directly.</p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span className="font-semibold">Opening WhatsApp...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
