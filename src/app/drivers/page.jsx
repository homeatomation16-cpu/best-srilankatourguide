"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { vehicles } from "@/data/vehicles";

import VehicleGallery from "../components/VehicleGallery";
import BookingBox from "../components/BookingBox";

import { Users, Fuel, Settings } from "lucide-react";

export default function VehiclePage({ params }) {

  const { id } = use(params);

  const vehicle = vehicles.find(v=>v.id===id);
  if(!vehicle) return notFound();

  const images = vehicle.gallery || [
    vehicle.image,
    vehicle.image,
    vehicle.image
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="bg-linear-to-r from-orange-600 to-amber-500 text-white p-12">
        <h1 className="text-5xl font-bold">
          {vehicle.name}
        </h1>
        <p>{vehicle.type}</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 p-10">

        {/* LEFT */}
        <div className="md:col-span-2">

          <VehicleGallery images={images}/>

          {/* INFO */}
          <div className="bg-white p-8 rounded-2xl shadow mt-8">

            <h3 className="text-2xl font-bold mb-4">
              Vehicle Details
            </h3>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="flex gap-2">
                <Users/> {vehicle.passengers} passengers
              </div>

              <div className="flex gap-2">
                <Fuel/> {vehicle.fuel}
              </div>

              <div className="flex gap-2">
                <Settings/> {vehicle.transmission}
              </div>

            </div>

            <h4 className="font-bold mt-6 mb-2">
              Features
            </h4>

            <ul className="grid md:grid-cols-2 gap-2">
              {vehicle.features.map((f,i)=>(
                <li key={i}>✅ {f}</li>
              ))}
            </ul>

          </div>
        </div>

        {/* RIGHT */}
        <BookingBox vehicle={vehicle}/>

      </div>
    </div>
  );
}
