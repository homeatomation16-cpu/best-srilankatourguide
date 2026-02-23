import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS } from "../../../data/destinations";

export function generateStaticParams() {
  return DESTINATIONS.map((item) => ({ id: item.id }));
}

export default async function DestinationPage({ params }) {
  const { id } = await params;

  const destination = DESTINATIONS.find(
    (item) => item.id?.trim().toLowerCase() === id?.trim().toLowerCase()
  );

  if (!destination) return notFound();

  const relatedDestinations = DESTINATIONS.filter(
    (item) => item.id !== destination.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] min-h-105 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-900/85 via-stone-900/20 to-stone-900/10" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-8 z-10">
          <nav className="flex items-center gap-2 text-xs font-medium">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/destinations" className="text-white/60 hover:text-white transition-colors">Destinations</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/90">{destination.title}</span>
          </nav>
        </div>

        {/* Hero text — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-14 pb-10">
          {destination.category && (
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              {destination.category}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            {destination.title}
          </h1>
          {destination.location && (
            <p className="mt-3 text-white/70 text-sm flex items-center gap-2 font-medium">
              <span>📍</span>
              {destination.location}
            </p>
          )}
        </div>

        {/* Bottom white bleed */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white/15 to-transparent pointer-events-none" />
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Amber accent line */}
        <div className="flex items-center gap-3 py-10">
          <div className="h-px w-12 bg-amber-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="h-px flex-1 bg-stone-100" />
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-12 lg:gap-16 pb-20">

          {/* Left — description + CTAs */}
          <div>
            <p className="text-stone-600 text-base md:text-lg leading-[1.9] font-light">
              {destination.description}
            </p>

            {/* Tags */}
            {destination.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {destination.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-xs font-medium border border-stone-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/tailor-made-tours"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg shadow-amber-200 hover:-translate-y-0.5 hover:shadow-amber-300 transition-all duration-200"
                style={{ background: "linear-gradient(135deg,#f59e0b,#ea580c)" }}
              >
                Plan a Tour Here
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-stone-500 hover:text-stone-800 font-medium text-sm border border-stone-200 hover:border-stone-300 bg-white transition-all duration-200"
              >
                ← All Destinations
              </Link>
            </div>
          </div>

          {/* Right — visit info card */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-6">
              <p className="text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">Plan Your Visit</p>
              <div className="space-y-3 text-sm text-stone-600">
                {destination.location && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">📍</span>
                    <span>{destination.location}</span>
                  </div>
                )}
                {destination.openHours && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🕐</span>
                    <span>{destination.openHours}</span>
                  </div>
                )}
                {destination.entryFee && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🎟️</span>
                    <span>{destination.entryFee}</span>
                  </div>
                )}
                {destination.bestTime && (
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5">🌤️</span>
                    <span>Best time: {destination.bestTime}</span>
                  </div>
                )}
                {!destination.location && !destination.openHours && !destination.entryFee && (
                  <p className="text-amber-700/60 text-xs italic">Contact us for visit details</p>
                )}
              </div>
            </div>

            {/* Contact nudge */}
            <div className="rounded-2xl bg-stone-900 p-6 text-center">
              <p className="text-white/70 text-xs mb-1">Need help planning?</p>
              <p className="text-white font-semibold text-sm mb-4">Speak to our Sri Lanka specialists</p>
              <a
                href="tel:+94769300334"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-xs transition-colors"
              >
                📞 +94 769 300 334
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Destinations ── */}
      {relatedDestinations.length > 0 && (
        <div className="border-t border-stone-100 bg-stone-50 py-16">
          <div className="max-w-5xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-stone-900">More Destinations</h2>
              <Link href="/destinations" className="text-amber-600 hover:text-amber-700 text-sm font-semibold transition-colors">
                View all →
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {relatedDestinations.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/destinations/${rel.id}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="font-serif font-bold text-stone-800 text-sm group-hover:text-amber-700 transition-colors">
                      {rel.title}
                    </p>
                    {rel.location && (
                      <p className="text-stone-400 text-xs mt-0.5">📍 {rel.location}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}