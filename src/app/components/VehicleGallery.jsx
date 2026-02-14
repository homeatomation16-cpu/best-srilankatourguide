"use client";
import { useState } from "react";
import Image from "next/image";

export default function VehicleGallery({ images }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative h-96 rounded-xl overflow-hidden">
        <Image
          src={images[active]}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="flex gap-3 mt-4">
        {images.map((img,i)=>(
          <div
            key={i}
            onClick={()=>setActive(i)}
            className={`relative w-24 h-20 cursor-pointer rounded-lg overflow-hidden border-2 ${
              active===i ? "border-orange-500" : ""
            }`}
          >
            <Image src={img} alt="" fill className="object-cover"/>
          </div>
        ))}
      </div>
    </div>
  );
}
