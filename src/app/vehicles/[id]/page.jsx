import { notFound } from "next/navigation";
import { vehicles } from "../../../data/vehicles";
import Carousel from "../../components/Carousel";
import VehicleSlider from "../../components/VehicleSlider";
import BookingBox from "../../components/BookingBox";

export default async function VehiclePage({ params }) {

  const { id } = await params; // ✅ Next.js 15 fix

  const v = vehicles.find((x) => String(x.id) === id);

  if (!v) return notFound();

  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <div className="bg-linear-to-r from-orange-600 to-amber-500 text-white text-center py-14 px-6 sm:py-20 lg:py-24">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          {v.name}
        </h1>

        <p className="text-sm sm:text-lg mt-2 opacity-90">
          {v.type}
        </p>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-10">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">

          <VehicleSlider images={v.gallery} />

          {v.overview && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {v.overview}
              </p>
            </div>
          )}

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              {v.passengers && <div>👥 {v.passengers} People</div>}
              {v.maxPeople && <div>👥 {v.maxPeople} People</div>}
              {v.minAge && <div>🔞 Min Age {v.minAge}</div>}
              {v.transmission && <div>⚙ {v.transmission}</div>}
              {v.fuel && <div>⛽ {v.fuel}</div>}
              <div>⭐ {v.reviews || 0} Reviews</div>
            </div>
          </div>

          {v.driver && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Driver
              </h2>

              <p>Experience: {v.driver.experience}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {v.driver.languages?.map((l, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          {v.included && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Included
              </h3>
              {v.included.map((x, i) => (
                <p key={i}>✅ {x}</p>
              ))}
            </div>
          )}

          {v.excluded && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Excluded
              </h3>
              {v.excluded.map((x, i) => (
                <p key={i}>❌ {x}</p>
              ))}
            </div>
          )}

        </div>

        {/* RIGHT */}
        <div className="lg:sticky lg:top-10 h-fit bg-white p-6 rounded-2xl shadow-xl">

          <h3 className="text-2xl font-bold">
            From {v.price}
          </h3>

          <p className="mt-2">
            Duration: {v.duration || "Per Day"}
          </p>

          <p className="mt-2">
            Location: {v.location || "Online"}
          </p>

          <BookingBox vehicle={v} />

        </div>

      </div>

      <Carousel />

    </div>
  );
}