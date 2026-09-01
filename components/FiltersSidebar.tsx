"use client";

import type { ListingType, PropertyType } from "@/lib/types";

export interface Filters {
  listingType: ListingType | "";
  propertyType: PropertyType | "";
  location: string;
  minPrice: string;
  maxPrice: string;
  minRooms: string;
}

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "chalet", label: "Chalet" },
  { value: "penthouse", label: "Penthouse" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

export default function FiltersSidebar({
  filters,
  onChange,
  onReset,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">Filters</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-brand hover:underline"
        >
          Reset
        </button>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Listing type
        </label>
        <div className="flex gap-2">
          {(["", "buy", "rent"] as const).map((t) => (
            <button
              key={t || "all"}
              type="button"
              onClick={() => onChange({ listingType: t })}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                filters.listingType === t
                  ? "border-brand bg-brand text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t === "" ? "All" : t === "buy" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Location
        </label>
        <input
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="City or canton"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Property type
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value as PropertyType | "" })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">All types</option>
          {propertyTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Price range (CHF)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder="Min"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder="Max"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Minimum rooms
        </label>
        <select
          value={filters.minRooms}
          onChange={(e) => onChange({ minRooms: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}+ rooms
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
