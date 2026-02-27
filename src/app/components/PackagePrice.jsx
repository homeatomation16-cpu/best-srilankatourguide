"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Navigation, Car, Truck,
  ArrowUpRight, Phone, Send, ChevronDown,
} from "lucide-react";

/* ================= USD CONVERSION ================= */

const USD_RATE = 300; // 1 USD = 300 LKR

const convertToUSD = (lkr) => {
  return (lkr / USD_RATE).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

/* ================= AIRPORT RATES ================= */

const airportRates = [
  { destination: "Aluthgama", car: 28000, van: 36000, duration: "1.4 Hours (Toll Road)", km: 105 },
  { destination: "Anuradhapura", car: 36000, van: 43000, duration: "3.45 Hours", km: 175 },
  { destination: "Arugam Bay", car: 75000, van: 84000, duration: "6.4 Hours (Toll Road)", km: 415 },
  { destination: "Beruwala", car: 26000, van: 32000, duration: "1.3 Hours (Toll Road)", km: 100 },
  { destination: "Colombo", car: 13000, van: 15000, duration: "1 Hour (Toll Road)", km: 35 },
  { destination: "Dambulla", car: 30000, van: 38000, duration: "2.45 Hours (Toll Road)", km: 130 },
  { destination: "Ella", car: 53000, van: 63000, duration: "5 Hours (Toll Road)", km: 335 },
  { destination: "Galle", car: 32000, van: 39000, duration: "2.2 Hours (Toll Road)", km: 155 },
  { destination: "Hikkaduwa", car: 30000, van: 36000, duration: "2.15 Hours (Toll Road)", km: 145 },
  { destination: "Jaffna", car: 63000, van: 70000, duration: "7.3 Hours", km: 365 },
  { destination: "Kalpitiya", car: 34000, van: 39000, duration: "3.3 Hours", km: 140 },
  { destination: "Kalutara", car: 25000, van: 33000, duration: "1.3 Hours (Toll Road)", km: 85 },
  { destination: "Kandy", car: 28000, van: 35000, duration: "3 Hours (Toll Road)", km: 115 },
  { destination: "Mirissa", car: 37000, van: 43000, duration: "2.45 Hours (Toll Road)", km: 180 },
  { destination: "Negombo", car: 9000, van: 11000, duration: "0.3 Hours", km: 10 },
  { destination: "Nuwara Eliya", car: 38000, van: 43000, duration: "5 Hours", km: 160 },
  { destination: "Pasikuda", car: 55000, van: 63000, duration: "5.3 Hours (Toll Road)", km: 270 },
  { destination: "Pinnawala", car: 27000, van: 32000, duration: "2.1 Hours", km: 80 },
  { destination: "Sigiriya (Habarana)", car: 33000, van: 41000, duration: "3.2 Hours (Toll Road)", km: 150 },
  { destination: "Tissamaharama (Yala)", car: 42000, van: 50000, duration: "4 Hours (Toll Road)", km: 290 },
  { destination: "Trincomalee", car: 46000, van: 54000, duration: "5 Hours (Toll Road)", km: 235 },
  { destination: "Udawalawa", car: 48000, van: 57000, duration: "3.45 Hours (Toll Road)", km: 260 },
];

/* ================= COMPONENT ================= */

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
    setSubmitted(true);
  };

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="bg-linear-to-r from-orange-500 to-amber-500 py-16 px-6 text-center">
        <p className="text-white/70 text-xs uppercase tracking-[0.25em] mb-3">
          From Airport (CMB)
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold text-white">
          Our Rates (USD)
        </h1>
      </section>

      {/* TABLE */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">

          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs uppercase tracking-widest">
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Car (USD)</th>
                <th className="px-6 py-4">Van (USD)</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Distance</th>
              </tr>
            </thead>

            <tbody>
              {airportRates.map((item, i) => (
                <tr key={item.destination} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.destination}
                  </td>

                  <td className="px-6 py-4 text-orange-600 font-bold">
                    ${convertToUSD(item.car)}
                  </td>

                  <td className="px-6 py-4 text-amber-600 font-bold">
                    ${convertToUSD(item.van)}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {item.duration}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {item.km} Km
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </section>

      {/* BOOKING FORM */}
      
    </main>
  );
}