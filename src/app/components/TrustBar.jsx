import Image from "next/image";
import Link from "next/link";

export default function TrustBar() {
  const partners = [
    {
      img: "/images/sri-lanka-logo.webp",
      link: "https://www.srilanka.travel/",
      alt: "Sri Lanka Tourism",
    },
    {
      img: "/images/trip-advisor-logo.webp",
      link: "https://tripadvisor.com",
      alt: "TripAdvisor",
    },
    {
      img: "/images/sltsm-logo.webp",
      link: "https://www.sltda.gov.lk/",
      alt: "SLTDA",
    },
    {
      img: "/images/pata-logo.webp",
      link: "https://www.pata.org/",
      alt: "PATA",
    },
    {
      img: "/images/taasl-logo.webp",
      link: "https://taasl.lk/",
      alt: "TAASL",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto text-center">

        <h3 className="text-3xl lg:text-4xl text-gray-800 mb-14">
          Trusted by Travel Authorities
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">

          {partners.map((p, i) => (
            <Link
              key={i}
              href={p.link}
              target="_blank"
              className="bg-white/5 p-6 rounded-2xl hover:scale-105 transition"
            >
              <Image
                src={p.img}
                alt={p.alt}
                width={140}
                height={60}
                className="object-contain mx-auto"
              />
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
