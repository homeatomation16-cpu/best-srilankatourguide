import { Check, Star } from "lucide-react";

export default function SpecialOffer() {
  const included = [
    "Private A/C Luxury Vehicle",
    "Personal English-Speaking Chauffeur",
    "4★ & 5★ Hotels with Breakfast",
    "All Fuel, Tolls & Parking",
  ];

  const bonuses = [
    "Free Tourist SIM Card",
    "Daily Premium Water Bottles",
    "Scenic Train Experience",
  ];

  return (
    <section className="py-28 px-6 bg-linear-to-b from-orange-50 via-white to-orange-50">

      <div className="max-w-6xl mx-auto">

        <div className="
          bg-white/70 backdrop-blur-xl
          border border-white/40
          shadow-[0_20px_60px_rgba(0,0,0,0.1)]
          rounded-[36px]
          p-12 lg:p-16
          relative
          overflow-hidden
        ">

          {/* LUXURY GLOW */}
          <div className="
            absolute -top-20 -right-20
            w-72 h-72
            bg-orange-300/20
            blur-[120px]
            rounded-full
          "/>

          {/* BADGE */}
          <div className="mb-8">
            <span className="
              bg-linear-to-r from-red-500 to-orange-500
              text-white
              px-6 py-3
              rounded-full
              font-semibold
              shadow-lg
            ">
              🔥 Limited Offer — 30% OFF
            </span>
          </div>

          {/* TITLE */}
          <h2 className="
            text-4xl lg:text-6xl
            font-bold
            mb-6
          ">
            10-Day Luxury Sri Lanka Tour
          </h2>

          <p className="text-gray-600 mb-12 max-w-2xl">
            A handcrafted journey through Sri Lanka’s most beautiful
            destinations with private chauffeur, premium hotels and
            unforgettable experiences.
          </p>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-16">

            {/* INCLUDED */}
            <div>
              <h3 className="font-semibold text-xl mb-6">
                Included
              </h3>

              {included.map((i, idx) => (
                <div key={idx} className="flex gap-3 mb-4 items-center">
                  <Check className="text-green-500" />
                  <span className="text-gray-700">{i}</span>
                </div>
              ))}
            </div>

            {/* BONUSES + PRICE */}
            <div>

              <h3 className="font-semibold text-xl mb-6">
                Complimentary Bonuses
              </h3>

              {bonuses.map((b, idx) => (
                <div key={idx} className="flex gap-3 mb-4 items-center">
                  <Star className="text-amber-500" />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}

              {/* PRICE */}
              <div className="mt-10">
                <p className="text-gray-500">Exclusive Price</p>

                <p className="
                  text-5xl lg:text-6xl
                  font-bold
                  text-orange-600
                ">
                  $700
                </p>

                <p className="text-gray-500 mb-6">
                  For 2 Travelers
                </p>

                {/* CTA */}
                <button className="
                  bg-linear-to-r from-orange-500 to-amber-500
                  text-white
                  px-10 py-4
                  rounded-full
                  font-semibold
                  shadow-xl
                  hover:scale-105
                  transition
                ">
                  Reserve This Offer
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
