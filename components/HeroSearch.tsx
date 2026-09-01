"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [listingType, setListingType] = useState<"buy" | "rent">("buy");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("listingType", listingType);
    if (location) params.set("location", location);
    if (propertyType) params.set("propertyType", propertyType);
    router.push(`/listings?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-3xl rounded-2xl bg-white/95 p-2 shadow-xl backdrop-blur">
      <div className="flex gap-1 p-2">
        {(["buy", "rent"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setListingType(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              listingType === t
                ? "bg-brand text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t === "buy" ? "Buy" : "Rent"}
          </button>
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 p-2 pt-0 sm:flex-row"
      >
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, canton or ZIP code (e.g. Zürich)"
          className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand"
        />
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand sm:w-48"
        >
          <option value="">All property types</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="chalet">Chalet</option>
          <option value="penthouse">Penthouse</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
        >
          <Search size={16} />
          Search
        </button>
      </form>
    </div>
  );
}
