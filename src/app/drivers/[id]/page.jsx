'use client';

import { useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { drivers } from "@/data/drivers";

import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLanguage
} from "react-icons/fa";

import { IoMdStar, IoMdStarHalf } from "react-icons/io";

export default function DriverPage({ params }) {

  /* ✅ Next.js 16 param fix */
  const { id } = use(params);

  /* ✅ Hook ALWAYS before returns */
  const [tab, setTab] = useState("about");

  const driver = drivers.find(d => d.id === id);
  if (!driver) return notFound();

  /* ⭐ stars */
  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 !== 0;

    for (let i=0;i<full;i++)
      stars.push(<IoMdStar key={i} className="text-yellow-400"/>);

    if (half)
      stars.push(<IoMdStarHalf key="half" className="text-yellow-400"/>);

    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="h-72 bg-blue-700 text-white flex items-center px-10">
        <div>
          <h1 className="text-5xl font-bold">{driver.name}</h1>
          <p>Private Driver in Sri Lanka</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto -mt-16 bg-white p-8 rounded-2xl shadow">

        {/* PROFILE */}
        <div className="flex gap-6 flex-col md:flex-row">

          <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={driver.profileImage || "/placeholder.jpg"}
              alt={driver.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold">{driver.name}</h2>

            <div className="flex gap-2 mt-2">
              {renderStars(driver.rating)}
              <span>{driver.rating}</span>
            </div>

            <p className="flex gap-2 text-gray-600 mt-2">
              <FaMapMarkerAlt/> {driver.location}
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">
              <a href={`tel:${driver.phone}`} className="bg-blue-600 text-white px-4 py-2 rounded">
                <FaPhone/> Call
              </a>

              <a href={`https://wa.me/${driver.whatsapp}`} className="bg-green-600 text-white px-4 py-2 rounded">
                <FaWhatsapp/> WhatsApp
              </a>

              <a href={`mailto:${driver.email}`} className="bg-gray-600 text-white px-4 py-2 rounded">
                <FaEnvelope/> Email
              </a>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b mt-8">
          {["about","reviews","gallery"].map(t=>(
            <button key={t}
              onClick={()=>setTab(t)}
              className={`pb-3 capitalize ${
                tab===t ? "border-b-2 border-blue-600" : ""
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* ABOUT */}
        {tab==="about" && (
          <div className="mt-6">
            <p>{driver.bio}</p>

            <h3 className="font-bold mt-6 flex gap-2">
              <FaLanguage/> Languages
            </h3>

            <div className="flex gap-2 mt-2 flex-wrap">
              {driver.languages.map((l,i)=>(
                <span key={i} className="bg-blue-50 px-3 py-1 rounded">
                  {l.flag} {l.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {tab==="reviews" && (
          <div className="mt-6 space-y-4">
            {driver.reviews.map(r=>(
              <div key={r.id} className="bg-gray-50 p-4 rounded">
                <h4>{r.name}</h4>
                <div className="flex">{renderStars(r.rating)}</div>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* GALLERY */}
        {tab==="gallery" && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {driver.gallery.map((img,i)=>(
              <div key={i} className="relative h-48">
                <Image
                  src={img || "/placeholder.jpg"}
                  alt=""
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
