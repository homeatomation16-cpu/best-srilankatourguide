"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Navigation, Car, Truck,
  ArrowUpRight, Phone, Send, ChevronDown,
} from "lucide-react";
import { destinations } from "../../data/packagePrice";

/* ── real data from the page content (Airport CMB rates) ── */
const airportRates = [
  { destination: "Aluthgama",            car: 28000, van: 36000, duration: "1.4 Hours (Toll Road)",   km: 105 },
  { destination: "Anuradhapura",         car: 36000, van: 43000, duration: "3.45 Hours",              km: 175 },
  { destination: "Arugam Bay",           car: 75000, van: 84000, duration: "6.4 Hours (Toll Road)",   km: 415 },
  { destination: "Beruwala",             car: 26000, van: 32000, duration: "1.3 Hours (Toll Road)",   km: 100 },
  { destination: "Colombo",             car: 13000, van: 15000, duration: "1 Hour (Toll Road)",       km: 35  },
  { destination: "Dambulla",             car: 30000, van: 38000, duration: "2.45 Hours (Toll Road)",  km: 130 },
  { destination: "Ella",                 car: 53000, van: 63000, duration: "5 Hours (Toll Road)",     km: 335 },
  { destination: "Galle",               car: 32000, van: 39000, duration: "2.2 Hours (Toll Road)",   km: 155 },
  { destination: "Hikkaduwa",           car: 30000, van: 36000, duration: "2.15 Hours (Toll Road)",  km: 145 },
  { destination: "Jaffna",              car: 63000, van: 70000, duration: "7.3 Hours",               km: 365 },
  { destination: "Kalpitiya",           car: 34000, van: 39000, duration: "3.3 Hours",               km: 140 },
  { destination: "Kalutara",            car: 25000, van: 33000, duration: "1.3 Hours (Toll Road)",   km: 85  },
  { destination: "Kandy",               car: 28000, van: 35000, duration: "3 Hours (Toll Road)",     km: 115 },
  { destination: "Mirissa",             car: 37000, van: 43000, duration: "2.45 Hours (Toll Road)",  km: 180 },
  { destination: "Negombo",             car: 9000,  van: 11000, duration: "0.3 Hours",               km: 10  },
  { destination: "Nuwara Eliya",        car: 38000, van: 43000, duration: "5 Hours",                 km: 160 },
  { destination: "Pasikuda",            car: 55000, van: 63000, duration: "5.3 Hours (Toll Road)",   km: 270 },
  { destination: "Pinnawala",           car: 27000, van: 32000, duration: "2.1 Hours",               km: 80  },
  { destination: "Sigiriya (Habarana)", car: 33000, van: 41000, duration: "3.2 Hours (Toll Road)",   km: 150 },
  { destination: "Tissamaharama (Yala)",car: 42000, van: 50000, duration: "4 Hours (Toll Road)",     km: 290 },
  { destination: "Trincomalee",         car: 46000, van: 54000, duration: "5 Hours (Toll Road)",     km: 235 },
  { destination: "Udawalawa",           car: 48000, van: 57000, duration: "3.45 Hours (Toll Road)",  km: 260 },
];

const TIMES = [
  "12:30 AM","01:00 AM","01:30 AM","02:00 AM","02:30 AM","03:00 AM","03:30 AM","04:00 AM",
  "04:30 AM","05:00 AM","05:30 AM","06:00 AM","06:30 AM","07:00 AM","07:30 AM","08:00 AM",
  "08:30 AM","09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 NOON",
  "12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM",
  "04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM",
  "08:30 PM","09:00 PM","09:30 PM","10:00 PM","10:30 PM","11:00 PM","11:30 PM","12:00 MN",
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

/* ── reusable styled select ── */
function StyledSelect({ label, required, children, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          className="w-full appearance-none px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition pr-10"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
}

/* ── reusable styled input ── */
function StyledInput({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
          {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
      />
    </div>
  );
}

export default function PackagePrice() {
  const [form, setForm] = useState({
    destination: "",
    vehicle: "",
    email: "",
    whatsapp: "",
    date: "",
    time: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // wire up your form submission here
    setSubmitted(true);
  };

  return (
    <main className="bg-white overflow-hidden">

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}
      <section className="relative bg-linear-to-r from-orange-500 to-amber-500 py-16 px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/70 text-xs font-semibold uppercase tracking-[0.25em] mb-3"
          >
            From Airport (CMB)
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Our Rates
          </motion.h1>
        </div>
      </section>

      {/* ══════════════════════════════════
          RATES TABLE
      ══════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-150 h-125 bg-orange-50 rounded-full blur-[130px] opacity-70" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-100 h-87.5 bg-amber-50 rounded-full blur-[100px] opacity-60" />

        <div className="relative max-w-7xl mx-auto">

          {/* header */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">Private Transfers</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Transfer{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                  Package Prices
                </span>
              </h2>
              <p className="text-gray-400 text-sm max-w-xs leading-relaxed lg:text-right">
                All prices are per vehicle, one way, from Bandaranaike International Airport (CMB).
              </p>
            </div>
          </motion.div>

          {/* vehicle legend */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: Car,   label: "Car", sub: "1–3 pax" },
              { icon: Truck, label: "Van", sub: "4–8 pax" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100 bg-white shadow-sm text-sm">
                <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span className="font-semibold text-gray-700">{label}</span>
                <span className="text-gray-400 text-xs">{sub}</span>
              </div>
            ))}
          </motion.div>

          {/* table */}
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-linear-to-r from-orange-500 to-amber-500">
                    {[
                      { icon: MapPin,     label: "Destination" },
                      { icon: Car,        label: "Car (LKR)" },
                      { icon: Truck,      label: "Van (LKR)" },
                      { icon: Clock,      label: "Duration" },
                      { icon: Navigation, label: "Distance" },
                    ].map(({ icon: Icon, label }) => (
                      <th key={label} className="px-6 py-5 text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />{label}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <motion.tbody variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  {airportRates.map((item, i) => (
                    <motion.tr
                      key={item.destination}
                      variants={reveal}
                      className={`group border-b border-gray-50 transition-colors duration-200 hover:bg-orange-50/60 ${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="font-semibold text-gray-800 text-sm">{item.destination}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-orange-600 font-bold text-sm">
                          {item.car.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-600 font-bold text-sm">
                          {item.van.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          {item.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Navigation className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                          {item.km} Km
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* footer */}
            <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xs text-gray-400">
                All prices per vehicle (one way). Prices include driver & fuel.
              </p>
              <a href="/contact" className="text-xs text-orange-500 font-semibold hover:text-orange-600 transition-colors inline-flex items-center gap-1">
                Need a custom quote? Contact us <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════
          BOOKING FORM
      ══════════════════════════════════ */}
      <section className="py-24 px-6 bg-gray-50/60">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">Book Now</span>
              <div className="h-px w-8 bg-orange-500" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Plan Your Transfer{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                With Us
              </span>
            </h2>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              From Airport (CMB) — Fill in the details below and we'll confirm your booking promptly.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-10"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                <p className="text-gray-400 text-sm">We'll confirm your transfer within the hour via WhatsApp or email.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Destination + Vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <StyledSelect label="Destination" required name="destination" value={form.destination} onChange={handleChange}>
                    <option value="">— Select destination —</option>
                    {airportRates.map((d) => (
                      <option key={d.destination} value={d.destination}>{d.destination}</option>
                    ))}
                  </StyledSelect>

                  <StyledSelect label="Vehicle Type" required name="vehicle" value={form.vehicle} onChange={handleChange}>
                    <option value="">— Please choose an option —</option>
                    <option value="car">Car (1–3 pax)</option>
                    <option value="van">Van (4–8 pax)</option>
                  </StyledSelect>
                </div>

                {/* Price preview */}
                {form.destination && form.vehicle && (() => {
                  const rate = airportRates.find((d) => d.destination === form.destination);
                  const price = rate ? (form.vehicle === "car" ? rate.car : rate.van) : null;
                  return price ? (
                    <div className="flex items-center justify-between px-5 py-3.5 rounded-xl bg-orange-50 border border-orange-100">
                      <span className="text-sm text-gray-600 font-medium">Estimated price for {form.destination}</span>
                      <span className="text-orange-600 font-black text-lg">LKR {price.toLocaleString()}</span>
                    </div>
                  ) : null;
                })()}

                {/* Email + WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <StyledInput label="Email" required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      WhatsApp Number<span className="text-orange-500 ml-0.5">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm font-medium shrink-0">
                        +94
                      </div>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={form.whatsapp}
                        onChange={handleChange}
                        placeholder="769 300 334"
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <StyledInput label="Date" required type="date" name="date" value={form.date} onChange={handleChange} />
                  <StyledSelect label="Time" required name="time" value={form.time} onChange={handleChange}>
                    <option value="">— Select time —</option>
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </StyledSelect>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Special Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Flight number, number of passengers, luggage details..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md shadow-orange-100 hover:shadow-lg hover:shadow-orange-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Booking Request
                </button>

                <p className="text-center text-xs text-gray-400">
                  Or call us directly:{" "}
                  <a href="tel:+94769300334" className="text-orange-500 font-semibold hover:underline inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" />(+94) 769 300 334
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

    </main>
  );
}