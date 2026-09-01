"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/useFavorites";

export default function FavoriteButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white ${className ?? ""}`}
    >
      <Heart
        size={18}
        className={active ? "fill-accent text-accent" : "text-slate-600"}
      />
    </button>
  );
}
