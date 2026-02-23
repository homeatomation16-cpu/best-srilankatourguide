import Image from "next/image";
import Link from "next/link";

export default function TailorMade() {
  return (
    <section className="relative py-28 md:py-36 bg-amber-50 overflow-hidden">

      {/* ── Subtle background pattern ── */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b45309' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Warm glow blobs ── */}
      <div className="absolute -top-24 -right-24 w-1255h-125nded-full bg-orange-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-16 w-100 h-100 rounded-full bg-amber-200/50 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* IMAGE SIDE */}
          <div className="relative">

            {/* Decorative offset frames */}
            <div className="absolute -top-5 -left-5 w-52 h-52 border border-amber-300/60 rounded-3xl pointer-events-none" />
            <div className="absolute -bottom-5 -right-5 w-36 h-36 border border-orange-300/40 rounded-2xl pointer-events-none" />

            {/* Main image */}
            <div className="relative w-full h-140h-[640px] rounded-3xl overflow-hidden group shadow-2xl shadow-amber-900/10">

              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90"
                alt="Tailor Made Tours Sri Lanka"
                fill
                priority
                className="object-cover transition-transform duration-1200 ease-out group-hover:scale-[1.04]"
              />

              {/* Cinematic gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/75 via-stone-900/15 to-transparent" />

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">
                  Time to Explore
                </p>
                <h3 className="text-white font-serif text-4xl md:text-5xl font-semibold leading-[1.1] mb-5">
                  Sri Lanka
                </h3>

                <div className="flex flex-wrap gap-2">
                  {["14 Days Average", "100% Private", "Fully Guided"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-5 top-12 bg-amber-500 text-white rounded-2xl px-5 py-4 shadow-xl shadow-amber-400/30">
              <p className="text-2xl font-bold leading-none">15+</p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-80">Years Expert</p>
            </div>

          </div>

          {/* CONTENT SIDE */}
          <div className="lg:pl-4">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em]">
                Tailor-Made Journeys
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-5xl md:text-6xl xl:text-7xl font-semibold text-stone-900 leading-[1.05] mb-8">
              Crafted Around
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #d97706, #ea580c)" }}
              >
                Your Dreams
              </span>
            </h2>

            {/* Divider */}
            <div className="w-full h-px bg-linear-to-r from-amber-300/80 via-orange-200/60 to-transparent mb-8" />

            {/* Body copy */}
            <p className="text-stone-600 text-lg leading-[1.8] mb-5">
              Discover Sri Lanka your way — journeys designed entirely around
              you. From ancient cities and misty highlands to private beach
              escapes and luxury safaris, every detail is curated to match
              your desires.
            </p>

            <p className="text-stone-600 text-lg leading-[1.8] mb-10">
              Romantic honeymoon, family adventure, or exclusive luxury escape
              — our specialists craft seamless itineraries with premium access
              and insider experiences you won't find anywhere else.
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3 mb-12">
              {[
                "Dedicated travel specialist from day one",
                "Private guides & exclusive venue access",
                "Flexible itineraries, zero compromise",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700 text-base">
                  <span className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-amber-100 border border-amber-400/50 flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/tailor-made-tours"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base tracking-wide shadow-lg shadow-orange-400/30 hover:shadow-orange-400/50 hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)" }}
              >
                Design My Journey
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-800 text-base font-medium transition-colors duration-200 group"
              >
                Talk to a specialist
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}