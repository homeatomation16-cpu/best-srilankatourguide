"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Mail,
  Clock,
  ArrowUpRight,
  Phone,
  Send,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

/* ── animation helpers ── */
const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── contact info cards ── */
const INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "No:96, Maddawaththa, Halthota,\nBandaragama, Sri Lanka, 12530.",
    href: "https://maps.google.com/?q=Bandaragama,Sri+Lanka",
    cta: "View on Map",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "(+94) 769 300 334",
    href: "https://wa.me/94769300334",
    cta: "Start Chat",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@srilankatoursdriver.com",
    href: "mailto:info@srilankatoursdriver.com",
    cta: "Send Email",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Open 24 Hours\n7 Days a Week",
    href: null,
    cta: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hook up your form submission logic here
    setSubmitted(true);
  };

  return (
    <main className="relative bg-white overflow-hidden">

      {/* ════════════════════════════════════
          HERO BANNER
      ════════════════════════════════════ */}
      <section className="relative py-28 lg:py-40 px-6 bg-white overflow-hidden">

        {/* warm blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-175 h-175 bg-orange-50 rounded-full blur-[160px] opacity-80" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-100 h-100 bg-amber-50 rounded-full blur-[120px] opacity-60" />

        {/* diagonal stripe accent */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #f97316 0, #f97316 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={reveal} className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.25em] uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h1
              variants={reveal}
              className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.02] tracking-tight mb-6"
            >
              Let's Plan Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-amber-500">
                Sri Lanka
              </span>{" "}
              Adventure
            </motion.h1>

            <motion.p variants={reveal} className="text-gray-400 text-lg leading-relaxed">
              We're available around the clock — reach out via WhatsApp, email, or
              the form below and we'll respond within the hour.
            </motion.p>

            <motion.div variants={reveal} className="mt-8 flex items-center gap-3">
              <a
                href="tel:+94769300334"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-100"
              >
                <Phone className="w-4 h-4" />
                (+94) 769 300 334
              </a>
              <a
                href="https://wa.me/94769300334"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-semibold text-sm hover:border-orange-300 hover:text-orange-500 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          INFO CARDS
      ════════════════════════════════════ */}
      <section className="px-6 pb-0">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {INFO.map(({ icon: Icon, label, value, href, cta }) => (
              <motion.div
                key={label}
                variants={reveal}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2">
                  {label}
                </p>
                <p className="text-gray-800 font-medium text-sm leading-relaxed whitespace-pre-line mb-4">
                  {value}
                </p>
                {href && cta && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    {cta}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FORM + MAP
      ════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── FORM ── */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-3xl border border-gray-100 bg-white shadow-sm p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-orange-500" />
              <span className="text-orange-500 text-xs font-semibold tracking-[0.2em] uppercase">
                Send a Message
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              How can we help you?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              For questions or queries, fill out the form below or email us at{" "}
              <a
                href="mailto:info@srilankatoursdriver.com"
                className="text-orange-500 hover:underline"
              >
                info@srilankatoursdriver.com
              </a>
            </p>

            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">
                  We'll get back to you within the hour.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="John Smith"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    Your Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your trip plans, dates, group size..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md shadow-orange-100 hover:shadow-lg hover:shadow-orange-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* ── MAP + EXTRA INFO ── */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Map embed */}
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-80 lg:h-96">
              <iframe
                title="Sri Lanka Tours Driver Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3!2d80.01!3d6.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDInMzYuMCJOIDgwwrAwMCczNi4wIkU!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick contact strip */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                  Call us anytime
                </p>
                <a
                  href="tel:+94769300334"
                  className="text-2xl font-bold text-gray-900 hover:text-orange-500 transition-colors"
                >
                  (+94) 769 300 334
                </a>
              </div>
              <a
                href="https://wa.me/94769300334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:brightness-110 transition shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
                  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
                  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
                  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
                ].map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 ${color} hover:border-current transition-all duration-200`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BOTTOM CTA STRIP
      ════════════════════════════════════ */}
      <section className="px-6 pb-24">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto rounded-3xl bg-linear-to-r from-orange-500 to-amber-500 px-10 py-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 relative overflow-hidden"
        >
          {/* stripe texture */}
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
              Email Us
            </a>
          </div>
        </motion.div>
      </section>

    </main>
  );
}