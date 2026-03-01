import { Poppins, Playfair_Display, Noto_Sans_Sinhala, Libre_Baskerville } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrustBar from "./components/TrustBar";

/* =========================
   GOOGLE FONTS
========================= */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
  variable: "--font-sinhala",
  display: "swap",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
  display: "swap",
});

/* =========================
   LOCAL FONT
========================= */

const thea = localFont({
  src: "./fonts/TheaAmelia-eZM86.otf",
  variable: "--font-thea",
  display: "swap",
});

/* =========================
   METADATA
========================= */

export const metadata = {
  title: "Sri Lanka Tours Driver",
  description: "Luxury & Adventure Tours in Sri Lanka",
};

/* =========================
   ROOT LAYOUT
========================= */

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${playfair.variable}
        ${sinhala.variable}
        ${libre.variable}
        ${thea.variable}
      `}
    >
      <body className="antialiased bg-white text-black font-sans">
        {/* HEADER */}
        <header className="bg-white sticky top-0 z-50 shadow-md">
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
        </header>

        <PageTransition>
          {children}
        </PageTransition>

        <TrustBar />

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}