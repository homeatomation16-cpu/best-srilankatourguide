"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { TOURS } from "../../data/tours";

/* ================= VARIANTS ================= */
const reveal = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function SeasonalTours() {
  const scrollRef = useRef(null);

  /* ===== FILTER ONLY EAST COAST SEASONAL ===== */
  const seasonalTours = TOURS.filter(
    (t) =>
      t.duration !== "1 Day" &&
      (t.title?.toLowerCase().includes("east") || t.category === "Beach")
  );

  /* ===== AUTO SCROLL ===== */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      container.scrollBy({ left: 380, behavior: "smooth" });
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="seasonal-section">
      {/* ================= HEADER ================= */}
      <motion.div
        className="section-header"
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <span className="label-tag">Elite Seasonal Collection</span>
        <h2 className="section-title">Seasonal Luxury Experiences</h2>
        <p className="section-subtitle">
          Crafted around Sri Lanka's finest travel seasons — delivering cinematic
          coastlines, elegance, and unforgettable moments.
        </p>
      </motion.div>

      {/* ================= AUTO CAROUSEL ================= */}
      <div className="carousel-wrapper">
        <div className="carousel-track" ref={scrollRef}>
          {seasonalTours.map((tour) => (
            <div className="tour-card" key={tour.id}>
              {/* Glow Effect */}
              <div className="card-glow" />

              {/* IMAGE */}
              <div className="card-image-wrap">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="card-image"
                />
                {/* Overlay */}
                <div className="card-overlay" />
              </div>

              {/* PRICE */}
              <div className="card-price">From ${tour.price}</div>

              {/* CONTENT */}
              <div className="card-content">
                <h3 className="card-title">{tour.title}</h3>
                <div className="card-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    {tour.duration}
                  </span>
                  <span className="meta-item">
                    <Users size={14} />
                    Up to {tour.capacity || 10} Guests
                  </span>
                </div>
                <Link href={`/tours/${tour.slug}`} className="card-cta">
                  Explore Luxury Tour
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ===== SECTION ===== */
        .seasonal-section {
          width: 100%;
          padding: 4rem 1rem 3rem;
          background: #0a0a0a;
          overflow: hidden;
        }

        /* ===== HEADER ===== */
        .section-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
          padding: 0 1rem;
        }

        .label-tag {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9a96e;
          border: 1px solid rgba(201, 169, 110, 0.4);
          padding: 0.3rem 0.9rem;
          border-radius: 2rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(1.6rem, 5vw, 2.6rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin: 0 0 1rem;
        }

        .section-subtitle {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.7;
          margin: 0;
        }

        /* ===== CAROUSEL WRAPPER ===== */
        .carousel-wrapper {
          width: 100%;
          /* allow cards to peek on mobile */
          padding: 0 1rem;
        }

        .carousel-track {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 1rem;
        }

        .carousel-track::-webkit-scrollbar {
          display: none;
        }

        /* ===== CARD ===== */
        .tour-card {
          position: relative;
          flex: 0 0 calc(100% - 2rem); /* full width on mobile */
          scroll-snap-align: start;
          height: 420px;
          border-radius: 1.25rem;
          overflow: hidden;
          cursor: pointer;
          background: #111;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .tour-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7);
        }

        /* Tablet: show ~2 cards */
        @media (min-width: 640px) {
          .tour-card {
            flex: 0 0 340px;
          }
        }

        /* Desktop: standard card size */
        @media (min-width: 1024px) {
          .carousel-wrapper {
            padding: 0 2rem;
          }
          .tour-card {
            flex: 0 0 360px;
            height: 460px;
          }
        }

        /* ===== GLOW ===== */
        .card-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(
            ellipse at 50% 120%,
            rgba(201, 169, 110, 0.15),
            transparent 70%
          );
          z-index: 0;
          pointer-events: none;
        }

        /* ===== IMAGE ===== */
        .card-image-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .card-image {
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .tour-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.88) 0%,
            rgba(0, 0, 0, 0.3) 55%,
            transparent 100%
          );
          z-index: 2;
        }

        /* ===== PRICE BADGE ===== */
        .card-price {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: rgba(201, 169, 110, 0.9);
          color: #000;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.35rem 0.75rem;
          border-radius: 2rem;
          backdrop-filter: blur(6px);
        }

        /* ===== CARD CONTENT ===== */
        .card-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-title {
          font-size: clamp(1rem, 3vw, 1.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          margin: 0;
        }

        .card-meta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* ===== CTA BUTTON ===== */
        .card-cta {
          display: inline-block;
          width: fit-content;
          background: linear-gradient(135deg, #c9a96e, #e8c98a);
          color: #000;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.6rem 1.25rem;
          border-radius: 2rem;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }

        .card-cta:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* ===== SMALL PHONES ===== */
        @media (max-width: 380px) {
          .tour-card {
            height: 380px;
          }
          .card-content {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}