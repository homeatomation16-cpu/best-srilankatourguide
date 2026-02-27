"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { EXCURSIONS } from "../../../data/excursions";
import PackagePrice from "../../components/PackagePrice";

export default function ExcursionSinglePage() {
  const { id } = useParams();
  const excursion = EXCURSIONS.find((e) => e.id === id);

  if (!excursion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2]">
        <div className="text-center">
          <p className="mb-2 font-sans text-xs uppercase tracking-widest text-[#d4a853]">404</p>
          <h2 className="font-serif text-3xl font-bold text-[#1a1209]">Excursion not found</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] font-serif">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#1a1209] px-6 py-20 text-center">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, #d4a853 0%, transparent 55%),
                              radial-gradient(circle at 75% 30%, #8b4513 0%, transparent 45%)`,
          }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #d4a853 0px, #d4a853 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-[#d4a853]">
            Excursion
          </p>
          <h1
            className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
          >
            {excursion.title}
          </h1>
          <div className="mx-auto mt-5 h-px w-20 bg-[#d4a853]" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-[#faf7f2] to-transparent" />
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-6xl px-4 py-14 lg:grid lg:grid-cols-3 lg:gap-12">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">

          <h2
            className="mb-5 text-2xl font-bold text-[#1a1209]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {excursion.subtitle}
          </h2>

          {/* Image */}
          <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
            <Image
              src={excursion.image}
              alt={excursion.title}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#1a1209]/30 to-transparent" />
          </div>

          {/* Description */}
          <p className="mb-12 font-sans text-base leading-relaxed text-[#5c4e3d]">
            {excursion.description}
          </p>

          {/* Rates */}
          <div className="mb-4 flex items-center gap-4">
            <h3
              className="text-xl font-bold text-[#1a1209]"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
            >
              Our Rates
            </h3>
            <div className="h-px flex-1 bg-[#d4a853]/30" />
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#e8ddd0] bg-white shadow-sm">
            <PackagePrice />
          </div>

        </div>

        {/* RIGHT BOOKING FORM */}
        <BookingForm tour={excursion} />

      </section>
    </main>
  );
}

/* ================= BOOKING FORM ================= */

function BookingForm({ tour }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const [status, setStatus] = useState("idle");

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
      await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          itemName: tour.title,
          bookingType: "Excursion",
        }),
      });

      const message = `Booking Request\n\nExcursion: ${tour.title}\nName: ${form.name}\nPhone: ${form.phone || "Not provided"}\nDate: ${form.date || "Not specified"}\nTime: ${form.time || "Not specified"}\nNotes: ${form.notes || "None"}`;

      window.open(
        `https://wa.me/94769300334?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#e8ddd0] bg-[#fdfaf6] px-4 py-3 font-sans text-sm text-[#1a1209] placeholder-[#a89880] outline-none transition focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20";

  return (
    <div className="mt-12 lg:mt-0">
      <div className="sticky top-8 rounded-2xl border border-[#e8ddd0] bg-white p-8 shadow-xl">

        {/* Form header */}
        <div className="mb-6 border-b border-[#e8ddd0] pb-5">
          <p className="mb-1 font-sans text-xs font-semibold uppercase tracking-widest text-[#d4a853]">
            Ready to explore?
          </p>
          <h3
            className="text-xl font-bold text-[#1a1209]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Book This Excursion
          </h3>
        </div>

        <div className="space-y-4">

          <input
            className={inputClass}
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            className={inputClass}
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <div className="rounded-xl border border-[#e8ddd0] bg-[#fdfaf6] px-3 py-2 focus-within:border-[#d4a853] focus-within:ring-2 focus-within:ring-[#d4a853]/20 transition">
            <PhoneInput
              defaultCountry="LK"
              value={form.phone}
              onChange={(value) => handleChange("phone", value || "")}
              className="font-sans text-sm text-[#1a1209]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <input
                className={inputClass}
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
            <div className="relative">
              <input
                className={inputClass}
                type="time"
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>

          <textarea
            className={`${inputClass} min-h-27.5 resize-none`}
            placeholder="Special requests or notes..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={status === "sending" || status === "sent"}
            className="group relative w-full overflow-hidden rounded-xl bg-[#1a1209] py-3.5 font-sans text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#2d1f0e] disabled:opacity-60"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {status === "sending" && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {status === "sent" ? "✓ Request Sent!" : status === "sending" ? "Sending..." : "Submit Booking Request"}
            </span>
            {/* Gold shimmer on hover */}
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-[#d4a853]/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </button>

          {status === "sent" && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-center font-sans text-xs text-green-700">
              Your request was submitted. We'll be in touch shortly!
            </p>
          )}
          {status === "error" && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-center font-sans text-xs text-red-600">
              Something went wrong. Please try again.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}