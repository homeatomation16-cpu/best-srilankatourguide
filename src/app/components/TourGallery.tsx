"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TOUR_GALLERIES } from "../../data/gallery";

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function TourGallery({ tourId, tourTitle }) {
  const gallery = TOUR_GALLERIES[tourId];

  const [[selectedIndex, direction], setSelectedIndex] = useState([null, 0]);

  if (!gallery || gallery.length === 0) return null;

  const openLightbox = (index) => setSelectedIndex([index, 0]);
  const closeLightbox = () => setSelectedIndex([null, 0]);

  const paginate = (newDirection) => {
    if (selectedIndex === null) return;

    let newIndex =
      selectedIndex + newDirection < 0
        ? gallery.length - 1
        : (selectedIndex + newDirection) % gallery.length;

    setSelectedIndex([newIndex, newDirection]);
  };

  return (
    <section className="py-16 md:py-20 bg-linear-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-900 mb-4 tracking-tight">
            Gallery — {tourTitle}
          </h2>
          <p className="text-stone-600 max-w-3xl mx-auto text-lg">
            Visual journey through the highlights of this unforgettable Sri Lanka experience
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {gallery.map((image, index) => (
            <div
              key={index}
              className="group relative break-inside-avoid cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 ease-out"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-4/5 md:aspect-3/4 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={85}
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                <p className="text-white text-sm md:text-base font-medium line-clamp-2 drop-shadow-md">
                  {image.caption || image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Motion+ Lightbox Carousel */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-20 text-white bg-black/50 p-3 rounded-full"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 p-4 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 p-4 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
            >
              <ChevronRight size={40} />
            </button>

            {/* Animated Image */}
            <div
              className="relative w-full max-w-[95vw] h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  className="absolute w-full h-full flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  initial={{
                    x: direction > 0 ? 400 : -400,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: direction > 0 ? -400 : 400,
                    opacity: 0,
                  }}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                >
                  <Image
                    src={gallery[selectedIndex].src}
                    alt={gallery[selectedIndex].alt}
                    fill
                    className="object-contain"
                    quality={95}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-3 rounded-full backdrop-blur-md text-sm md:text-base shadow-lg">
                {gallery[selectedIndex].caption || gallery[selectedIndex].alt}
              </div>

              {/* Counter */}
              <div className="absolute bottom-6 right-6 text-white text-sm bg-black/50 px-4 py-1.5 rounded-full">
                {selectedIndex + 1} / {gallery.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}