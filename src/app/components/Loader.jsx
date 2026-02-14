"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center overflow-hidden">

      {/* Soft color blobs */}
      <div className="absolute w-96 h-96 bg-sky-400/20 blur-3xl rounded-full -top-20 -left-20" />
      <div className="absolute w-96 h-96 bg-emerald-400/20 blur-3xl rounded-full bottom-0 right-0" />

      
      {/* <motion.div
        initial={{ x: -250 }}
        animate={{ x: 250 }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute top-16 text-2xl"
      >
        ✈️
      </motion.div> */}

      <div className="relative text-center z-10">

        {/* Logo + Ring */}
        <div className="relative w-40 h-40 mx-auto flex items-center justify-center">

          {/* Glow Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
            className="absolute w-28 h-28 rounded-full bg-emerald-400/40 blur-2xl"
          />

          {/* Rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-emerald-400/40 border-t-sky-500"
          />

          {/* Glass circle */}
          <div className="absolute inset-3 rounded-full bg-white/30 backdrop-blur-xl shadow-lg" />

          {/* Static Logo */}
          <Image
            src="/logo.png"
            alt="Sri Lanka Tours"
            width={90}
            height={90}
            priority
            className="z-10"
          />
        </div>

        {/* Brand */}
        <h2 className="text-3xl font-bold mt-6 bg-linear-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
          Sri Lanka Tours
        </h2>

        {/* Tagline */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white tracking-widest text-sm mt-2"
        >
          Explore Paradise Island 🌴
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 h-2 bg-white/30 rounded-full mt-6 overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-full bg-linear-to-r from-emerald-400 to-sky-400"
          />
        </div>

        {/* Loading text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/90 text-sm mt-4"
        >
          Loading your adventure...
        </motion.p>

      </div>
    </div>
  );
}
