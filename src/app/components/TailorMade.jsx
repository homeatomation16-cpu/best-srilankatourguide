import Image from "next/image";
import Link from "next/link";

export default function TailorMade() {
  return (
    <section className="py-32 px-6 bg-linear-to-brom-white via-orange-50/30 to-white">

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE SIDE */}
          <div className="relative group">

            <div className="relative w-full h-130 rounded-[40px] overflow-hidden shadow-2xl">

              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90"
                alt="Tailor Made Tours Sri Lanka"
                fill
                priority
                className="
                  object-cover
                  group-hover:scale-105
                  transition duration-700
                "
              />

              {/* DARK CINEMATIC OVERLAY */}
              <div className="
                absolute inset-0
                bg-linear-to-t from-black/50 via-black/10 to-transparent
              "/>

              {/* LUXURY TEXT OVERLAY */}
              <div className="absolute bottom-10 left-10 text-white">

                <p className="text-lg tracking-widest opacity-80">
                  TIME TO
                </p>

                <h3 className="
                  text-5xl lg:text-6xl
                  font-bold
                  leading-tight
                ">
                  Explore Sri Lanka
                </h3>

              </div>

            </div>

          </div>

          {/* CONTENT SIDE */}
          <div>

            <span className="
              text-orange-500
              tracking-widest
              font-semibold
            ">
              TAILOR-MADE JOURNEYS
            </span>

            <h2 className="
              text-4xl lg:text-6xl
              font-bold
              mt-4 mb-8
              leading-tight
            ">
              Crafted Around
              <br/>
              <span className="text-orange-600">
                Your Dreams
              </span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Discover Sri Lanka your way with journeys designed entirely
              around you. From cultural wonders and ancient cities to private
              beach escapes and luxury safaris, every detail is curated to
              match your desires.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Whether it’s a romantic honeymoon, a family adventure, or an
              exclusive luxury escape, our specialists craft seamless
              itineraries with premium service and insider experiences.
            </p>

            <Link
              href="/tailor-made-tours"
              className="
                inline-flex items-center gap-3
                bg-linear-to-r from-orange-500 to-amber-500
                text-white
                px-10 py-5
                rounded-full
                text-lg
                font-semibold
                shadow-xl
                hover:scale-105
                transition
              "
            >
              Design My Journey →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}
