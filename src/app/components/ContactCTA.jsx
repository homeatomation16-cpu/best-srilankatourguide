import { Phone, Mail } from "lucide-react";

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-linear-to-br from-orange-600 via-amber-600 to-yellow-500 text-white"
    >
      <div className="max-w-5xl mx-auto text-center">

        {/* TITLE */}
        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          Let’s Plan Your Dream Trip
        </h2>

        <p className="opacity-90 mb-14 text-lg">
          Our team is available 24/7 to craft your perfect Sri Lanka journey
        </p>

        {/* CONTACT CARDS */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* PHONE */}
          <a
            href="tel:+94769300334"
            className="group bg-white/15 backdrop-blur-xl border border-white/30 
                       p-8 rounded-2xl flex items-center justify-center gap-4
                       hover:bg-white hover:text-black transition-all duration-300
                       shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Phone className="w-6 h-6 group-hover:text-orange-600" />
            <span className="text-lg font-semibold">
              (+94) 769 300 334
            </span>
          </a>

          {/* EMAIL */}
          <a
            href="mailto:info@srilankatoursdriver.com"
            className="group bg-white/15 backdrop-blur-xl border border-white/30 
                       p-8 rounded-2xl flex items-center justify-center gap-4
                       hover:bg-white hover:text-black transition-all duration-300
                       shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <Mail className="w-6 h-6 group-hover:text-orange-600" />
            <span className="text-lg font-semibold">
              info@srilankatoursdriver.com
            </span>
          </a>

        </div>

        {/* BONUS LINE */}
        <p className="mt-14 text-sm opacity-90">
          ⚡ Quick replies on WhatsApp • Personalized tour planning • Best price guarantee
        </p>

      </div>
    </section>
  );
}
