import { Poppins, Playfair_Display, Noto_Sans_Sinhala } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import PageTransition from "./components/PageTransition";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

;

// Google Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala"],
  weight: ["400", "500", "600"],
  variable: "--font-sinhala",
});

// ✅ Thea Amelia Local Font
const thea = localFont({
  src: "./fonts/TheaAmelia-eZM86.otf",
  variable: "--font-thea",
  display: "swap",
});

export const metadata = {
  title: "Sri Lanka Tours Driver",
  description: "Luxury & Adventure Tours in Sri Lanka",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${poppins.variable}
        ${playfair.variable}
        ${sinhala.variable}
        ${thea.variable}
      `}
    >
      <body className="antialiased bg-white text-black">

        {/* HEADER */}
        <header className="bg-white sticky top-0 z-50 shadow-md">
         
          {/* @ts-expect-error Async Server Component */}
          <Navbar />
        </header>

        <PageTransition>
          {children}
        </PageTransition>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  );
}
