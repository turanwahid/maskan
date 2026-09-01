"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() =>
                setActive((i) => (i - 1 + images.length) % images.length)
              }
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setActive((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
            >
              <ChevronRight size={18} />
            </button>
            <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 ${
                i === active ? "border-brand" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`${title} — thumbnail ${i + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
