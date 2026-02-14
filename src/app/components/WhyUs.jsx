import {
  Star,
  MapPin,
  Sliders,
  Car,
  BadgeCheck,
  Zap,
} from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      title: "Best Travel Agent",
      description:
        "A leading luxury tour operator delivering premium travel experiences across Sri Lanka.",
      icon: Star,
    },
    {
      title: "Beautiful Places",
      description:
        "Golden beaches, ancient cities, wildlife safaris and tropical paradise scenery all year round.",
      icon: MapPin,
    },
    {
      title: "Tailor Made Tours",
      description:
        "Fully customized private tours crafted around your comfort and preferences.",
      icon: Sliders,
    },
    {
      title: "Private Transportation",
      description:
        "Modern, comfortable vehicles with professional multilingual chauffeurs.",
      icon: Car,
    },
    {
      title: "Best Price Guarantee",
      description:
        "Premium service quality that matches every dollar you invest.",
      icon: BadgeCheck,
    },
    {
      title: "Fast VIP Booking",
      description:
        "Priority response via WhatsApp & Email — 24/7 concierge support.",
      icon: Zap,
    },
  ];

  return (
    <section className="py-28 lg:py-36 px-6 bg-linear-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-orange-600 text-xl mb-4 tracking-wide">
            Why Choose Us
          </p>

          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
            We Make Travel Effortless
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  rounded-[28px]
                  p-10
                  bg-white/70
                  backdrop-blur-xl
                  border border-white/40
                  shadow-lg
                  transition
                  hover:-translate-y-3
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                "
              >
                {/* ICON */}
                <div className="
                  w-16 h-16 mb-8
                  rounded-2xl
                  bg-linear-to-br
                  from-orange-500 to-amber-400
                  flex items-center justify-center
                  shadow-lg
                  group-hover:scale-110
                  transition
                ">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
