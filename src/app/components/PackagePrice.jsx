"use client";

import { destinations } from "@/data/packagePrice";

export default function PackagePrice() {
  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Transfer Package Prices
          </h2>
          <p className="text-gray-600">
            Comfortable private transfers across Sri Lanka
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl">
          <table className="min-w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead className="bg-orange-500 text-white border-2-out border-orange-600">
              <tr>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Car (LKR)</th>
                <th className="px-6 py-4">Van (LKR)</th>
                <th className="px-6 py-4">Bus (LKR)</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Mileage (Km)</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {destinations.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-orange-50 transition`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.destination}
                  </td>

                  <td className="px-6 py-4 text-orange-600 font-bold">
                    {item.car.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-orange-600 font-bold">
                    {item.van.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-orange-600 font-bold">
                    {item.bus.toLocaleString()}
                  </td>


                  <td className="px-6 py-4 text-gray-600">
                    {item.estimatedDuration}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {item.mileageKm} Km
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}