import Image from "next/image";
import { notFound } from "next/navigation";
import { TOURS } from "@/data/tours";
import PackagePrice from "@/app/components/PackagePrice";

export default async function TourPage({ params }) {
  const resolvedParams = await params;   // 👈 IMPORTANT
  const tour = TOURS.find((t) => t.id === resolvedParams.id);

  if (!tour) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="relative h-125">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {tour.title}
            </h1>
            <p className="text-xl">
              {tour.duration} Days Tour
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-10">
          <p className="text-sm text-gray-500">From USD</p>
          <p className="text-3xl font-bold text-orange-600">
            ${tour.price.toFixed(2)}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600 whitespace-pre-line leading-relaxed">
            {tour.overview}
          </p>
        </div>

        <PackagePrice />

      </div>
    </div>
  );
}