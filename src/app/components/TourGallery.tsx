"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TOUR_GALLERIES } from "../../data/gallery";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function TourGallery({ tourId, tourTitle }) {
  const gallery = TOUR_GALLERIES[tourId];
  const [[selectedIndex, direction], setSelectedIndex] = useState([null, 0]);

  if (!gallery || gallery.length === 0) return null;

  const openLightbox = (index) => setSelectedIndex([index, 0]);
  const closeLightbox = () => setSelectedIndex([null, 0]);

  const paginate = useCallback(
    (newDirection) => {
      if (selectedIndex === null) return;
      const newIndex =
        selectedIndex + newDirection < 0
          ? gallery.length - 1
          : (selectedIndex + newDirection) % gallery.length;
      setSelectedIndex([newIndex, newDirection]);
    },
    [selectedIndex, gallery.length]
  );

  return (
    <section className="py-20 md:py-28 bg-linear-to-brom-stone-50 to-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C6644' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="text-amber-700 text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Visual Journey
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-stone-900 mb-5 tracking-tight">
            {tourTitle}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-amber-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="h-px w-16 bg-amber-300" />
          </div>
          <p className="text-stone-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A visual passage through the landscapes, culture, and moments that
            make this Sri Lanka experience unforgettable
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="relative mb-3 md:mb-4 break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={80}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-900/70 via-stone-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl flex flex-col justify-end p-4">
                <div className="flex items-center justify-between">
                  <p className="text-white text-xs md:text-sm font-medium leading-snug drop-shadow line-clamp-2">
                    {image.caption || image.alt}
                  </p>
                  <div className="ml-3 shrink-0 bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Subtle border */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Photo count indicator */}
        <div className="text-center mt-10">
          <span className="text-stone-400 text-sm tracking-wide">
            {gallery.length} photographs
          </span>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            key="lightbox-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-stone-950/97 backdrop-blur-sm" />

            {/* Close Button */}
            <button
              aria-label="Close gallery"
              className="absolute top-5 right-5 z-20 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all duration-200 ring-1 ring-white/10"
              onClick={closeLightbox}
            >
              <X size={22} />
            </button>

            {/* Prev Button */}
            <button
              aria-label="Previous image"
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-200 ring-1 ring-white/10"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              aria-label="Next image"
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 p-3 md:p-4 rounded-full transition-all duration-200 ring-1 ring-white/10"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Image Stage */}
            <div
              className="relative w-full max-w-[90vw] h-[80vh] flex items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  className="absolute w-full h-full flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  initial={{ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.96 }}
                  animate={{ x: 0, opacity: 1, scale: 1 }}
                  exit={{ x: direction > 0 ? -300 : 300, opacity: 0, scale: 0.96 }}
                  transition={{
                    x: { type: "spring", stiffness: 320, damping: 32 },
                    opacity: { duration: 0.18 },
                    scale: { duration: 0.18 },
                  }}
                >
                  <Image
                    src={gallery[selectedIndex].src}
                    alt={gallery[selectedIndex].alt}
                    fill
                    className="object-contain drop-shadow-2xl"
                    quality={95}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Caption bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5 bg-linear-to-t from-black/70 to-transparent flex items-end justify-between">
              <p className="text-stone-200 text-sm md:text-base max-w-xl leading-relaxed">
                {gallery[selectedIndex].caption || gallery[selectedIndex].alt}
              </p>
              <span className="text-stone-400 text-sm tabular-nums ml-6 shrink-0">
                {selectedIndex + 1}{" "}
                <span className="text-stone-600">/</span>{" "}
                {gallery.length}
              </span>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-3 py-2 rounded-full bg-white/5 backdrop-blur-md ring-1 ring-white/10 max-w-[90vw] overflow-x-auto">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex([i, i > selectedIndex ? 1 : -1]);
                  }}
                  className={`relative w-8 h-8 rounded-md overflow-hidden shrink-0 transition-all duration-200 ring-2 ${
                    i === selectedIndex
                      ? "ring-amber-400 opacity-100 scale-110"
                      : "ring-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    quality={30}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}