import Image from "next/image";
import { Calendar, Users } from "lucide-react";

export default function SeasonalTours() {
  const packages = [
    {
      name: "05 Days East Coast Escape",
      duration: "5 Days",
      pax: "1",
      price: "$340",
      image:
        "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=1400&q=80",
      ribbon: "Limited Season",
    },
    {
      name: "08 Days East Coast Luxury",
      duration: "8 Days",
      pax: "1",
      price: "$510",
      image:
        "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=1400&q=80",
      ribbon: "Best Seller",
    },
    {
      name: "10 Days Grand East Tour",
      duration: "10 Days",
      pax: "1",
      price: "$640",
      image:
        "https://images.unsplash.com/photo-1540202404-d0c7fe46a087?w=1400&q=80",
      ribbon: "Premium",
    },
  ];

  return (
    <section className="py-24 lg:py-32 px-6 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-orange-600 text-xl mb-4 tracking-wide">
            Elite Seasonal Collection
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Seasonal Luxury Tours
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Designed around Sri Lanka’s perfect travel seasons —
            delivering premium comfort, scenic beauty,
            and unforgettable memories.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="
                group relative
                rounded-[28px]
                overflow-hidden
                bg-white/60
                backdrop-blur-2xl
                border border-white/40
                shadow-xl
                transition
                hover:-translate-y-3
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.15)]
              "
            >

              {/* RIBBON */}
              <div className="
                absolute top-6 -left-10
                rotate-[-35deg]
                bg-linear-to-r from-orange-600 to-amber-500
                text-white text-xs
                px-12 py-1
                font-semibold
                shadow-lg
                z-20
              ">
                {pkg.ribbon}
              </div>

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  fill
                  className="
                    object-cover
                    transition duration-1000
                    group-hover:scale-110
                  "
                />

                {/* cinematic overlay */}
                <div className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/60 via-black/10 to-transparent
                " />

                {/* PRICE BADGE */}
                <div className="
                  absolute bottom-6 right-6
                  bg-white/85 backdrop-blur
                  px-5 py-2
                  rounded-full
                  font-semibold
                  text-black
                  shadow-md
                ">
                  From {pkg.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {pkg.name}
                </h3>

                <div className="space-y-4 text-gray-700 mb-8">

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    {pkg.duration}
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-orange-500" />
                    {pkg.pax} Person
                  </div>

                </div>

                <button className="
                  w-full py-4
                  rounded-full
                  font-semibold
                  text-white
                  bg-linear-to-r
                  from-orange-600 to-amber-500
                  transition
                  hover:scale-[1.04]
                  hover:shadow-lg
                ">
                  View Luxury Tour
                </button>

              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-24">

          <p className="text-xl text-gray-700 mb-8">
            Want a private custom-designed luxury itinerary?
          </p>

          <a
            href="#contact"
            className="
              inline-block
              px-14 py-5
              rounded-full
              text-lg font-semibold
              bg-black text-white
              transition
              hover:scale-110
              hover:shadow-2xl
            "
          >
            Design My Luxury Trip
          </a>

        </div>

      </div>
    </section>
  );
}
