"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Users,
  Award,
  Heart,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── animation helpers ── */
const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── stats ── */
const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Happy Travelers" },
  { value: "24/7", label: "Available Support" },
  { value: "100%", label: "Licensed & Certified" },
];

/* ── why choose us ── */
const REASONS = [
  {
    icon: Shield,
    title: "Licensed Tour Guides",
    desc: "All our guides are government-licensed professionals based in Colombo, Sri Lanka.",
  },
  {
    icon: Star,
    title: "5-Star Rated Service",
    desc: "Consistently praised on TripAdvisor for exceptional hospitality and local knowledge.",
  },
  {
    icon: Users,
    title: "Private & Personalized",
    desc: "Every journey is tailored to your group — no shared buses, no strangers.",
  },
  {
    icon: Heart,
    title: "Passionate About Sri Lanka",
    desc: "We're locals who love this island and want you to experience it at its finest.",
  },
  {
    icon: Award,
    title: "PATA & Tourism Certified",
    desc: "Recognized members of Sri Lanka Tourism and the Pacific Asia Travel Association.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Pricing",
    desc: "No hidden fees. Clear, upfront pricing so you can travel with complete peace of mind.",
  },
];

/* ── partner logos (text-based since we don't have assets) ── */
const PARTNERS = [
  { name: "Sri Lanka Tourism", short: "srilanka" },
  { name: "TripAdvisor", short: "tripadvisor" },
  { name: "Sri Lanka Tourism Board", short: "SLTB" },
  { name: "PATA", short: "PATA" },
  { name: "SKAL", short: "SKAL" },
];

export default function AboutPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ════════════════════════════
          HERO BANNER  (matches site orange header)
      ════════════════════════════ */}
      <section className="relative bg-linear-to-rrom-orange-500 to-amber-500 py-16 px-6 overflow-hidden">
        {/* diagonal stripe texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "14px 14px",
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl lg:text-5xl font-bold text-white tracking-tight"
          >
            About Sri Lanka Tours Driver
          </motion.h1>
        </div>
      </section>

      {/* ════════════════════════════
          MAIN ABOUT SECTION
      ════════════════════════════ */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">

        {/* warm blobs */}
        <div className="pointer-events-none absolute top-0 right-0 w-150 h-150 bg-orange-50 rounded-full blur-[140px] opacity-70" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-87.5 h-87.5 bg-amber-50 rounded-full blur-[100px] opacity-60" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ── */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-4/5 max-w-md mx-auto lg:mx-0 shadow-2xl shadow-orange-100">
              <Image
                src="/gallery/gallery1.jpg"
                alt="Happy travelers in Sri Lanka"
                fill
                className="object-cover"
              />
              {/* overlay tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <p className="text-orange-500 font-bold text-2xl italic leading-tight">
                  Time to
                </p>
                <p className="text-orange-600 font-black text-4xl italic leading-tight">
                  explore
                </p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -right-4 top-12 bg-white rounded-2xl shadow-xl border border-orange-100 px-5 py-4 hidden lg:block">
              <p className="text-3xl font-black text-orange-500">5000+</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">Happy Travelers</p>
            </div>

            {/* Floating rating card */}
            <div className="absolute -left-4 bottom-24 bg-white rounded-2xl shadow-xl border border-orange-100 px-5 py-4 hidden lg:block">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-medium">TripAdvisor Rated</p>
            </div>
          </motion.div>

          {/* ── Text side ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">
                About Us
              </span>
            </motion.div>

            <motion.h2
              variants={reveal}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.08] tracking-tight mb-6"
            >
              We Help You{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                Planning
              </span>
              <br />
              Your Journey
            </motion.h2>

            <motion.p variants={reveal} className="text-gray-500 leading-relaxed mb-6">
              A smiling sun all year round, golden beaches, ancient cities, safaris, lovely people
              in a tropical paradise, mouth watering foods — Sri Lanka offers an unforgettable
              travelling experience you can ever imagine. We are a licensed tour guide team
              based in Colombo, Sri Lanka.
            </motion.p>

            <motion.p variants={reveal} className="text-gray-500 leading-relaxed mb-10">
              With over a decade of experience, we craft private, personalized journeys that
              connect you with the real heart of Sri Lanka — from misty hill country to
              ancient temples, wildlife-rich national parks to pristine coastlines.
            </motion.p>

            {/* Checklist */}
            <motion.ul variants={stagger} className="space-y-3 mb-10">
              {[
                "Government-licensed professional guides",
                "Private tours — no shared groups",
                "Available 24/7 for your assistance",
                "Transparent, all-inclusive pricing",
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={reveal}
                  className="flex items-center gap-3 text-gray-700 text-sm font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={reveal}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md shadow-orange-100 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
              >
                Contact Us
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          STATS STRIP
      ════════════════════════════ */}
      <section className="px-6 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STATS.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={reveal}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <p className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500 mb-1">
                {value}
              </p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════
          WHY CHOOSE US
      ════════════════════════════ */}
      <section className="relative py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-orange-50 rounded-full blur-[120px] opacity-60" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">
                Why Choose Us
              </span>
              <div className="h-px w-8 bg-orange-500" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Travel With{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                Confidence
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {REASONS.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={reveal}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          PARTNER LOGOS
      ════════════════════════════ */}
      <section className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-xs font-semibold text-gray-300 uppercase tracking-[0.3em] mb-10"
          >
            Recognized & Certified By
          </motion.p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {PARTNERS.map(({ name, short }) => (
              <motion.div
                key={name}
                variants={reveal}
                className="opacity-40 hover:opacity-70 transition-opacity duration-300"
              >
                <span className="text-xl font-black text-gray-600 tracking-tight">
                  {short}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          BOTTOM CTA STRIP  (matches existing site pattern)
      ════════════════════════════ */}
      <section className="px-6 pb-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-3xl bg-linear-to-r from-orange-500 to-amber-500 px-10 py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
              backgroundSize: "14px 14px",
            }}
          />
          <div className="relative">
            <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
              Don't wait any longer
            </p>
            <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Contact us anytime!
            </h3>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="tel:+94769300334"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-orange-600 font-bold text-sm hover:scale-105 transition-transform shadow-lg"
            >
              <Phone className="w-4 h-4" />
              (+94) 769 300 334
            </a>
            <a
              href="mailto:info@srilankatoursdriver.com"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition"
            >
              <Mail className="w-4 h-4" />
              info@srilankatoursdriver.com
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}