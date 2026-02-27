"use client";

import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function BookingBox({ vehicle }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: ""
  });

  const [status, setStatus] = useState("idle");

  const handle = (k, v) => setForm({ ...form, [k]: v });

  const send = async () => {

    if (!form.name || !form.email) {
      alert("Please fill required fields.");
      return;
    }

    setStatus("sending");

    try {

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          vehicle: vehicle?.name
        })
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      // WhatsApp message
      const msg = `Booking Request

Name: ${form.name}
Vehicle: ${vehicle?.name}
Phone: ${form.phone}
Date: ${form.date}
Time: ${form.time}
Notes: ${form.notes}
`;

      window.open(
        `https://wa.me/94769300334?text=${encodeURIComponent(msg)}`
      );

      setStatus("sent");

    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/[0.07] border border-amber-700/30 text-white placeholder-white/20 px-3.5 py-2.5 text-sm outline-none focus:border-amber-600/60 focus:bg-white/10 transition-colors";

  const labelClass =
    "block text-[10px] font-medium tracking-[0.15em] uppercase text-amber-400/80 mb-1.5";

  return (
    <div className="bg-stone-900 p-8 text-white max-w-md">

      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          Reserve Vehicle
        </p>
        <h3 className="font-serif text-2xl mt-2">
          {vehicle?.name}
        </h3>
      </div>

      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          className={inputClass}
          placeholder="Your name"
          value={form.name}
          onChange={e => handle("name", e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>Email Address *</label>
        <input
          type="email"
          className={inputClass}
          placeholder="you@email.com"
          value={form.email}
          onChange={e => handle("email", e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>WhatsApp Number</label>
        <div className="[&_.PhoneInput]:flex [&_.PhoneInput]:items-center [&_.PhoneInput]:bg-white/[0.07] [&_.PhoneInput]:border [&_.PhoneInput]:border-amber-700/30 [&_.PhoneInput]:px-3.5 [&_.PhoneInput]:py-2.5 [&_.PhoneInput]:gap-2 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:text-white [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:placeholder-white/20 [&_.PhoneInputCountrySelect]:bg-stone-900 [&_.PhoneInputCountrySelect]:text-amber-400 [&_.PhoneInputCountrySelect]:border-none [&_.PhoneInputCountrySelect]:text-sm">
          <PhoneInput
            defaultCountry="LK"
            value={form.phone}
            onChange={(v) => handle("phone", v || "")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={e => handle("date", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Time</label>
          <input
            type="time"
            className={inputClass}
            value={form.time}
            onChange={e => handle("time", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>Special Requests</label>
        <textarea
          rows={3}
          className={inputClass + " resize-none"}
          placeholder="Extra stops, luggage info..."
          value={form.notes}
          onChange={e => handle("notes", e.target.value)}
        />
      </div>

      <button
        onClick={send}
        disabled={status === "sending" || status === "sent"}
        className={`w-full py-3.5 mt-6 text-xs font-medium tracking-[0.12em] uppercase transition-all
          ${status === "sent"
            ? "bg-emerald-700"
            : "bg-orange-700 hover:bg-orange-800 hover:-translate-y-px"}
          disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {status === "idle" && "Book Now"}
        {status === "sending" && "Sending..."}
        {status === "sent" && "✓ Request Sent"}
        {status === "error" && "Try Again"}
      </button>

      {status === "sent" && (
        <p className="text-center text-xs text-white/40 mt-3">
          WhatsApp opened — please send to confirm.
        </p>
      )}
    </div>
  );
}