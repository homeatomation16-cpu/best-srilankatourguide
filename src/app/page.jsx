"use client";

import HeroVideo from "./components/HeroVideo";
import Destinations from "./components/Destinations";
import FeaturedTours from "./components/FeaturedTours";
import SeasonalTours from "./components/SeasonalTours";
import OneDayTours from "./components/OneDayTours";
import SpecialOffer from "./components/SpecialOffer";
import TailorMade from "./components/TailorMade";
import ContactCTA from "./components/ContactCTA";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import VehiclesSection from "./components/Vehicle";

import Plane3DFlyover from "./components/Plane3DFlyover";

export default function SriLankaToursDriver() {
  return (
    <div className="relative bg-white">

      {/* ✈️ Flying Plane */}
      <Plane3DFlyover />

      {/* HERO SECTION */}
      <div className="relative">
        <HeroVideo />

        {/* White fade bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-white/90 via-white/40 to-transparent shadow-xl" />
      </div>

      {/* CONTENT SECTIONS */}
      <Destinations />
      <FeaturedTours />
      <SeasonalTours />
      <VehiclesSection />
      <WhyUs />
      <OneDayTours />
      <Testimonials />
      <SpecialOffer />
      <TailorMade />
      <Gallery />
      <ContactCTA />

    </div>
  );
}