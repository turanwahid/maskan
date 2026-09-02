"use client";

import type { ListingType, PropertyType } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/format";

export interface Filters {
  listingType: ListingType | "";
  propertyType: PropertyType | "";
  location: string;
  minPrice: string;
  maxPrice: string;
  minRooms: string;
}

export default function FiltersSidebar({
  filters,
  onChange,
  onReset,
  dict,
}: {
  filters: Filters;
  onChange: (next: Partial<Filters>) => void;
  onReset: () => void;
  dict: Dictionary["listings"]["filters"] & { propertyTypes: Dictionary["hero"]["propertyTypes"] };
}) {
  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: "apartment", label: dict.propertyTypes.apartment },
    { value: "house", label: dict.propertyTypes.house },
    { value: "villa", label: dict.propertyTypes.villa },
    { value: "chalet", label: dict.propertyTypes.chalet },
    { value: "penthouse", label: dict.propertyTypes.penthouse },
    { value: "land", label: dict.propertyTypes.land },
    { value: "commercial", label: dict.propertyTypes.commercial },
  ];

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{dict.title}</h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-brand hover:underline"
        >
          {dict.reset}
        </button>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.listingType}
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
              {t === "" ? dict.all : t === "buy" ? dict.buy : dict.rent}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.location}
        </label>
        <input
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder={dict.locationPlaceholder}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.propertyType}
        </label>
        <select
          value={filters.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value as PropertyType | "" })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">{dict.allTypes}</option>
          {propertyTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.priceRange}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => onChange({ minPrice: e.target.value })}
            placeholder={dict.min}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <span className="text-slate-400">–</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => onChange({ maxPrice: e.target.value })}
            placeholder={dict.max}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.minRooms}
        </label>
        <select
          value={filters.minRooms}
          onChange={(e) => onChange({ minRooms: e.target.value })}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">{dict.any}</option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {t(dict.roomsPlus, { n })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
