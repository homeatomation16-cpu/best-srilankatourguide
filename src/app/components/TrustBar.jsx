import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTripadvisor,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

/* ── Data ── */
const partners = [
  { img: "/images/sri-lanka-logo.webp",    link: "https://www.srilanka.travel/",  alt: "Sri Lanka Tourism" },
  { img: "/images/trip-advisor-logo.webp", link: "https://tripadvisor.com",        alt: "TripAdvisor" },
  { img: "/images/sltsm-logo.webp",        link: "https://www.sltda.gov.lk/",     alt: "SLTDA" },
  { img: "/images/pata-logo.webp",         link: "https://www.pata.org/",          alt: "PATA" },
  { img: "/images/taasl-logo.webp",        link: "https://taasl.lk/",             alt: "TAASL" },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/srilankatoursdriver",
    icon: FaFacebook,
    label: "Facebook",
    hoverBg: "hover:bg-blue-600",
    iconColor: "text-blue-600 group-hover:text-white",
  },
  {
    href: "https://www.instagram.com/srilankatoursdriver/",
    icon: FaInstagram,
    label: "Instagram",
    hoverBg: "hover:bg-pink-500",
    iconColor: "text-pink-500 group-hover:text-white",
  },
  {
    href: "https://www.youtube.com/@srilankatoursdriver",
    icon: FaYoutube,
    label: "YouTube",
    hoverBg: "hover:bg-red-600",
    iconColor: "text-red-600 group-hover:text-white",
  },
  {
    href: "https://www.tripadvisor.com/Profile/srilankatoursdriver",
    icon: FaTripadvisor,
    label: "TripAdvisor",
    hoverBg: "hover:bg-green-600",
    iconColor: "text-green-500 group-hover:text-white",
  },
];

const contactItems = [
  {
    href: "tel:+94702062697",
    icon: FaPhone,
    label: "(+94) 702 062 697",
    subLabel: "Call us anytime",
    external: false,
  },
  {
    href: "mailto:info@srilankatoursdriver.com",
    icon: FaEnvelope,
    label: "info@srilankatoursdriver.com",
    subLabel: "Email us",
    external: false,
  },
  {
    href: "https://wa.me/94702062697",
    icon: FaWhatsapp,
    label: "WhatsApp Us",
    subLabel: "Quick replies guaranteed",
    external: true,
  },
];

/* ── Component ── */
export default function TrustBar() {
  return (
    <>
      {/* ══════════════════════════════════════
          SECTION 1 — Trust & Social
      ══════════════════════════════════════ */}
      <section className="relative bg-white overflow-hidden">
        {/* Top accent */}
        <div className="h-1 w-full bg-linear-to-r from-orange-400 via-pink-400 to-amber-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

          {/* ── Trusted by Authorities ── */}
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-orange-500 uppercase mb-3">
              Accredited &amp; Recognized
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800">
              Trusted by Travel Authorities
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-linear-to-r from-orange-400 to-pink-400" />
          </div>

          {/* Partner logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {partners.map((p, i) => (
              <Link
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center p-5 sm:p-6 bg-gray-50
                           border border-gray-100 rounded-2xl hover:border-orange-200
                           hover:bg-orange-50 hover:shadow-md transition-all duration-300
                           hover:scale-105"
              >
                <Image
                  src={p.img}
                  alt={p.alt}
                  width={130}
                  height={55}
                  className="object-contain mx-auto opacity-60 group-hover:opacity-100
                             transition-opacity duration-300"
                />
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-12 sm:my-14 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-300 text-lg select-none">✦</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* ── Social Media ── */}
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-orange-500 uppercase mb-3">
              Stay Connected
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-8 sm:mb-10">
              Follow Us on Social Media
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {socialLinks.map(({ href, icon: Icon, label, hoverBg, iconColor }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl
                              border border-gray-200 bg-white shadow-sm
                              transition-all duration-300
                              hover:scale-105 hover:shadow-md hover:border-transparent
                              hover:text-white ${hoverBg}`}
                >
                  <Icon className={`text-xl transition-colors duration-300 ${iconColor}`} />
                  <span className="text-sm font-semibold text-gray-700 transition-colors duration-300 group-hover:text-white">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />
      </section>

      {/* ══════════════════════════════════════
          SECTION 2 — Contact CTA
      ══════════════════════════════════════ */}
      <section
        id="contact"
        className="relative py-6 sm:py-8 px-4 sm:px-6 bg-linear-to-br
                   from-orange-600 via-amber-600 to-yellow-500 text-white overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">

          {/* Title */}
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase opacity-80 mb-3">
            We&apos;re here for you 24/7
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight">
            Let&apos;s Plan Your Dream Trip
          </h2>
          <p className="opacity-90 mb-12 text-base sm:text-lg max-w-xl mx-auto">
            Our team is ready to craft your perfect Sri Lanka journey — reach out any way you like.
          </p>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {contactItems.map(({ href, icon: Icon, label, subLabel, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group bg-white/15 backdrop-blur-xl border border-white/30
                           p-6 sm:p-8 rounded-2xl flex flex-col items-center gap-3
                           hover:bg-white hover:text-gray-800 transition-all duration-300
                           shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Icon className="text-3xl group-hover:text-orange-500 transition-colors duration-300" />
                <span className="text-base font-bold leading-snug text-center break-all">
                  {label}
                </span>
                <span className="text-xs opacity-70 group-hover:opacity-60">
                  {subLabel}
                </span>
              </a>
            ))}
          </div>

          {/* Bottom tagline */}
          <p className="mt-12 text-sm opacity-80">
            ⚡ Quick replies on WhatsApp &nbsp;•&nbsp; Personalised tour planning &nbsp;•&nbsp; Best price guarantee
          </p>
        </div>
      </section>
    </>
  );
}