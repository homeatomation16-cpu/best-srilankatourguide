  "use client";



  import HeroVideo from "./components/HeroVideo";
  import Destinations from "./components/Destinations";
  import FeaturedTours from "./components/FeaturedTours";
  import SeasonalTours from "./components/SeasonalTours";
  import Drivers from "./components/Drivers";
  import OneDayTours from "./components/OneDayTours";
  import SpecialOffer from "./components/SpecialOffer";
  import TailorMade from "./components/TailorMade";
  import ContactCTA from "./components/ContactCTA";
  import WhyUs from "./components/WhyUs";
  import Testimonials from "./components/Testimonials";
  import Gallery from "./components/Gallery";
import TrustBar from "./components/TrustBar";
import VehiclesPage from "./vehicles/page";

  export default function SriLankaToursDriver() {
    

    return (
      <div className="relative bg-white">
        

        {/* HERO SECTION */}
        <div className="relative">
          <HeroVideo />

          {/* WHITE → TRANSPARENT FADE */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-white/90 via-white/40 to-transparent shadow-xl" />
        </div>

        {/* CONTENT */}
        <Destinations />
        <FeaturedTours />
        <SeasonalTours />
        <Drivers />
        <VehiclesPage />
        <WhyUs />
        <OneDayTours />
        <Testimonials />
        <SpecialOffer />
        <TailorMade />
        <Gallery />
        <TrustBar />
        <ContactCTA />

        
      </div>
    );
  }

// "use client";


// import Footer from "./components/Footer";
// import TourismHero from "./components/TourismHero";

// export default function SriLankaToursDriver() {
//   return (
//     <div className="relative bg-white">
      

//       <TourismHero />

//       <Footer />
//     </div>
//   );
// }