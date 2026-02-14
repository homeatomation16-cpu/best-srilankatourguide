"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function CloudSky() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-linear-to-b from-sky-500 to-sky-200">
      
      {/* Hero content */}
     

      {/* SVG noise filter */}
      <svg width="0" height="0" className="absolute">
        <filter id="fluffyNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008"
            numOctaves="6"
            seed="3"
          >
            {/* subtle organic morph */}
            <animate
              attributeName="seed"
              from="0"
              to="100"
              dur="40s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="140" />
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </svg>

      {/* Bottom fluffy clouds */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">

        {/* Back soft cloud */}
        <motion.div
          className="absolute -bottom-6 left-0 h-48 w-[120%] rounded-full bg-white opacity-40 blur-xl"
          style={{ filter: "url(#fluffyNoise)" }}
          animate={reduce ? {} : { x: [-40, 0, -40] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mid cloud */}
        <motion.div
          className="absolute -bottom-10 left-0 h-56 w-[130%] rounded-full bg-white opacity-60 blur-lg"
          style={{ filter: "url(#fluffyNoise)" }}
          animate={reduce ? {} : { x: [0, -60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front fluffy cloud */}
        <motion.div
          className="absolute -bottom-16 left-0 h-64 w-[140%] rounded-full bg-white opacity-90"
          style={{ filter: "url(#fluffyNoise)" }}
          animate={reduce ? {} : { x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
