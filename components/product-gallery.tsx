"use client";

import Image from "next/image";
import { useState } from "react";

export const ProductGallery = ({ images }: { images: string[] }) => {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
        <Image src={active} alt="Product" fill className="object-cover" />
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image) => (
          <button
            type="button"
            key={image}
            onClick={() => setActive(image)}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border ${
              active === image ? "border-primary" : "border-border"
            }`}
          >
            <Image src={image} alt="Thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
