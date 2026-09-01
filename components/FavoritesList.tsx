"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import type { Property } from "@/lib/types";
import { useFavorites } from "@/lib/useFavorites";
import PropertyCard from "./PropertyCard";

export default function FavoritesList({
  properties,
}: {
  properties: Property[];
}) {
  const { ids } = useFavorites();
  const favorites = properties.filter((p) => ids.includes(p.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-20 text-center">
        <Heart size={32} className="text-slate-300" />
        <p className="mt-3 font-semibold text-slate-700">No saved properties yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Tap the heart icon on any listing to save it here.
        </p>
        <Link
          href="/listings"
          className="mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          Browse listings
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
