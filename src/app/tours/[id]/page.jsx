"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import emailjs from "emailjs-com";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { TOURS } from "../../../data/tours";

import TourGallery from "../../components/TourGallery";
import TourCard from "../../components/TourCard";
import PackagePrice from "../../components/PackagePrice";

/* ─────────────────────────────────────────
   Booking Form Component
───────────────────────────────────────── */
function BookingForm({ tour }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert("Please fill in your name and email.");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        "service_9fflwkc",
        "template_4fclvxr",
        {
          ...form,
          vehicle: tour.title,
          tour_title: tour.title,
        },
        "_PDrKKzoflFb6YJUT",
      );

      const message = `Booking Request\n\nTour: ${tour.title}\nName: ${form.name}\nPhone: ${form.phone || "Not provided"}\nDate: ${form.date || "Not specified"}\nTime: ${form.time || "Not specified"}\nNotes: ${form.notes || "None"}`;

      window.open(
        `https://wa.me/94769300334?text=${encodeURIComponent(message)}`,
        "_blank",
      );

      setStatus("sent");
    } catch (err) {
      console.error("Booking error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/[0.07] border border-amber-700/30 text-white placeholder-white/40 px-4 py-3 text-sm outline-none focus:border-amber-500/60 focus:bg-white/10 transition-all rounded-sm";

  const labelClass =
    "block text-[10px] font-medium tracking-[0.18em] uppercase text-amber-400/80 mb-2";

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-lg overflow-hidden sticky top-8">
      {/* Header */}
      <div className="bg-orange-700 px-8 py-7">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider text-white/70">
            from
          </span>
          <span className="font-serif text-4xl font-bold text-white leading-none">
            ${tour.price}
          </span>
          <span className="text-sm text-white/60">/ person</span>
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 mt-1">
          Reserve Your Tour
        </p>
      </div>

      {/* Form Fields */}
      <div className="px-8 pt-8 pb-6 space-y-5">
        <div>
          <label className={labelClass}>
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            className={inputClass}
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            className={inputClass}
            type="email"
            placeholder="your.email@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>WhatsApp Number</label>
          <div className="phone-input-dark">
            <PhoneInput
              defaultCountry="LK"
              value={form.phone}
              onChange={(value) => handleChange("phone", value || "")}
              international
              countryCallingCodeEditable={false}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Travel Date</label>
            <input
              className={`${inputClass} scheme-dark`}
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>Pickup Time</label>
            <input
              className={`${inputClass} scheme-dark`}
              type="time"
              value={form.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Special Requests / Notes</label>
          <textarea
            className={`${inputClass} resize-none min-h-25`}
            placeholder="Dietary requirements, accessibility needs, extra stops, number of people, etc..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={status === "sending" || status === "sent"}
          className={`w-full py-4 text-white text-sm font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2
            ${status === "sent" ? "bg-emerald-700" : "bg-orange-700 hover:bg-orange-800"}
            disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {status === "idle" && "Book This Tour"}
          {status === "sending" && "Sending Request..."}
          {status === "sent" && "✓ Request Sent"}
          {status === "error" && "Error – Try Again"}
        </button>

        {status === "sent" && (
          <p className="text-center text-xs text-emerald-300/80 mt-2">
            WhatsApp has been opened — please confirm your booking there.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-white/40 pt-2">
          <span>🔒 No payment required now</span>
          <span>·</span>
          <span>Free cancellation</span>
          <span>·</span>
          <span>Fast response</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4 border-t border-white/5 text-[11px] bg-stone-950">
        <span className="text-white/40">Or contact us directly:</span>
        <a
          href="https://wa.me/94769300334"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Tour Details Page
───────────────────────────────────────── */
export default function TourDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const tour = TOURS.find((t) => t.id === id);
  if (!tour) return notFound();

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-150 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover brightness-[0.85]"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/80" />

        <div className="absolute bottom-0 left-0 right-0 px-16 pb-16 z-10 max-w-7xl mx-auto max-lg:px-10 max-sm:px-6 max-sm:pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="block w-10 h-px bg-amber-500" />
            <span className="text-xs font-medium tracking-[0.25em] uppercase text-amber-300">
              Private Driver-Guided Tour · Sri Lanka
            </span>
          </div>

          <h1 className="font-serif text-5xl lg:text-7xl font-semibold text-white leading-tight max-w-3xl tracking-tight max-sm:text-4xl">
            {tour.title}
          </h1>

          <div className="flex flex-wrap mt-10 border-l border-white/30 divide-x divide-white/30">
            {[
              { label: "Duration", value: `${tour.duration} Days` },
              { label: "Price From", value: `$${tour.price}` },
              {
                label: "Max Group",
                value: tour.maxPeople ? `${tour.maxPeople} pax` : "10 pax",
              },
              {
                label: "Min Age",
                value: tour.minAge ? `${tour.minAge}+` : "16+",
              },
            ].map((item, i) => (
              <div key={i} className="px-8 py-5 max-sm:px-6 max-sm:py-4">
                <p className="text-[11px] uppercase tracking-wider text-white/60 mb-1">
                  {item.label}
                </p>
                <p className="font-serif text-2xl lg:text-3xl text-white font-medium">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-12 py-20 max-lg:px-8 max-sm:px-5 max-sm:py-12">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left + Center: Overview + Itinerary */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-orange-700">
                  Tour Overview
                </span>
                <div className="h-px flex-1 bg-stone-200" />
              </div>
              <p className="text-xl leading-relaxed text-stone-700 font-light">
                {tour.overview}
              </p>
            </section>

            {/* Included / Excluded */}
            <section className="grid md:grid-cols-2 gap-10">
              {tour.included?.length > 0 && (
                <div className="bg-white border border-stone-200 p-8 rounded-lg">
                  <h3 className="text-2xl font-serif font-semibold mb-6 text-stone-800">
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.included.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-stone-700"
                      >
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.excluded?.length > 0 && (
                <div className="bg-white border border-stone-200 p-8 rounded-lg">
                  <h3 className="text-2xl font-serif font-semibold mb-6 text-stone-800">
                    Not Included
                  </h3>
                  <ul className="space-y-3">
                    {tour.excluded.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-stone-700"
                      >
                        <span className="mt-1.5 w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs shrink-0">
                          ✕
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {tour.itinerary &&
              Array.isArray(tour.itinerary) &&
              tour.itinerary.length > 0 && (
                <section>
                  <div className="flex items-baseline gap-6 mb-10">
                    <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-stone-900">
                      Detailed Itinerary
                    </h2>
                    <span className="text-lg text-stone-500">
                      ({tour.itinerary.length} days)
                    </span>
                  </div>

                  <div className="space-y-8">
                    {tour.itinerary.map((day, index) => {
                      const dayNumber = day.days?.[0] || index + 1;
                      const titleParts = day.title?.split(" - ") || [];
                      const destination =
                        titleParts.length > 1
                          ? titleParts[titleParts.length - 1].trim()
                          : "";
                      const mainTitle =
                        titleParts[0]?.replace(/^Day\s*\d+\s*[-–]\s*/i, "") ||
                        day.title;

                      return (
                        <div
                          key={index}
                          className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                          <div className="grid md:grid-cols-[200px_1fr] max-sm:grid-cols-1">
                            {/* ================= IMAGE DAY BADGE ================= */}
                            <div className="relative min-h-65 overflow-hidden">
                              <Image
                                src={day.image || "/itinerary/default.jpg"}
                                alt={`Day ${dayNumber}`}
                                fill
                                className="object-cover"
                              />

                              {/* Dark overlay */}
                              <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/70" />

                              {/* Day number */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-6xl font-bold text-white/25 leading-none">
                                  {dayNumber}
                                </span>
                                <span className="text-xs uppercase tracking-[0.3em] text-amber-400 mt-2">
                                  Day
                                </span>
                              </div>
                            </div>

                            {/* ================= CONTENT ================= */}
                            <div className="p-8 max-sm:p-6">
                              {destination && (
                                <span className="inline-block bg-amber-50 text-orange-800 text-xs font-medium px-4 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                                  {destination}
                                </span>
                              )}

                              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-4">
                                {mainTitle}
                              </h3>

                              {day.description && (
                                <p className="text-stone-600 italic mb-6">
                                  {day.description}
                                </p>
                              )}

                              {day.activities?.length > 0 && (
                                <div className="flex flex-wrap gap-3 mb-6">
                                  {day.activities.map((act, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center gap-2 bg-stone-50 border border-stone-200 px-4 py-2 text-sm text-stone-700 rounded-md"
                                    >
                                      <span className="text-amber-500 text-xs">
                                        ✦
                                      </span>
                                      {act}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {day.overnight && (
                                <p className="mt-4 text-sm font-medium text-emerald-700 flex items-center gap-2">
                                  <span>🌙</span> {day.overnight}
                                </p>
                              )}

                              {day.drop && (
                                <p className="mt-3 text-sm font-medium text-orange-700 flex items-center gap-2">
                                  <span>✈</span> {day.drop}
                                </p>
                              )}

                              {day.note && (
                                <p className="mt-5 text-sm italic text-stone-500 bg-amber-50/40 border-l-4 border-amber-400 pl-4 py-2.5">
                                  Note: {day.note}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm tour={tour} />
          </div>
        </div>
      </div>

      {/* Similar Tours */}
      <div className="max-w-7xl mx-auto px-12 py-20 max-lg:px-8 max-sm:px-5 max-sm:py-12">
        <div className="flex items-baseline gap-6 mb-10">
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-stone-900">
            You Might Also Like
          </h2>
          <span className="text-lg text-stone-500">
            Similar tours we recommend
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOURS.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </div>

      <TourGallery tourId={tour.id} tourTitle={tour.title} />
      <PackagePrice />
    </div>
  );
}
