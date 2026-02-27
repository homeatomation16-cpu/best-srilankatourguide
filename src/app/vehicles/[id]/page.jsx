import { notFound } from "next/navigation";
import { vehicles } from "../../../data/vehicles";
import Carousel from "../../components/Carousel";
import VehicleSlider from "../../components/VehicleSlider";
import BookingBox from "../../components/BookingBox";

export default async function VehiclePage({ params }) {

  const { id } = await params;
  const v = vehicles.find((x) => x.id === id);

  if (!v) return notFound();

  const msg = `
Hello,
I want to book:

Vehicle: ${v.name}
Price: ${v.price}
`;

  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <div className="bg-linear-to-r from-orange-600 to-amber-500 text-white text-center p-24">
        <h1 className="text-5xl font-bold">{v.name}</h1>
        <p className="text-lg mt-2">{v.type}</p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 p-10">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-10">

          {/* SLIDER ✅ FIXED */}
          <VehicleSlider images={v.gallery} />

          {/* OVERVIEW */}
          {v.overview && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700">{v.overview}</p>
            </div>
          )}

          {/* HIGHLIGHTS */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Highlights</h2>

            <div className="grid grid-cols-2 gap-4">
              {v.passengers && <div>👥 {v.passengers} People</div>}
              {v.maxPeople && <div>👥 {v.maxPeople} People</div>}
              {v.minAge && <div>🔞 Min Age {v.minAge}</div>}
              {v.transmission && <div>⚙ {v.transmission}</div>}
              {v.fuel && <div>⛽ {v.fuel}</div>}
              <div>⭐ {v.reviews || 0} Reviews</div>
            </div>
          </div>

          {/* DRIVER */}
          {v.driver && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Driver</h2>

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

          {/* INCLUDED */}
          {v.included && (
            <div>
              <h3 className="text-2xl font-bold mb-3">Included</h3>
              {v.included.map((x, i) => (
                <p key={i}>✅ {x}</p>
              ))}
            </div>
          )}

          {/* EXCLUDED */}
          {v.excluded && (
            <div>
              <h3 className="text-2xl font-bold mb-3">Excluded</h3>
              {v.excluded.map((x, i) => (
                <p key={i}>❌ {x}</p>
              ))}
            </div>
          )}

          {/* PAYMENT POLICY */}
          {v.paymentPolicy && (
            <div>
              <h3 className="text-2xl font-bold mb-3">Payment Policy</h3>
              {v.paymentPolicy.map((p, i) => (
                <p key={i}>• {p}</p>
              ))}
            </div>
          )}

          {/* EXTRA MILEAGE */}
          {v.extraMileage && (
            <div>
              <h3 className="text-2xl font-bold mb-3">Extra Mileage</h3>
              <p>🚗 Car: {v.extraMileage.car}</p>
              <p>🚐 Van: {v.extraMileage.van}</p>
              <p>🚌 Bus: {v.extraMileage.bus}</p>
            </div>
          )}

          {/* TOUR NOTE */}
          {v.tourPlanNote && (
            <div>
              <h3 className="text-2xl font-bold mb-3">Tour Plan</h3>
              <p>{v.tourPlanNote}</p>
            </div>
          )}

        </div>

        {/* RIGHT BOOKING */}
        <div className="sticky top-10 h-fit bg-white p-6 rounded-2xl shadow-xl">

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

      {/* TOURS CAROUSEL */}
      <Carousel />

    </div>
  );
}