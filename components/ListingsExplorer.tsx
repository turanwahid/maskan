"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, MapIcon } from "lucide-react";
import type { Property } from "@/lib/types";
import FiltersSidebar, { type Filters } from "./FiltersSidebar";
import PropertyCard from "./PropertyCard";
import MapViewClient from "./MapViewClient";

export default function ListingsExplorer({
  properties,
  initialFilters,
}: {
  properties: Property[];
  initialFilters: Filters;
}) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">(
    "newest"
  );

  const filtered = useMemo(() => {
    let result = properties.filter((p) => {
      if (filters.listingType && p.listingType !== filters.listingType)
        return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType)
        return false;
      if (filters.location) {
        const q = filters.location.toLowerCase();
        const haystack =
          `${p.address.city} ${p.address.canton} ${p.address.zip}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
      if (filters.minRooms && p.rooms < Number(filters.minRooms)) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return (
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });

    return result;
  }, [properties, filters, sort]);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <FiltersSidebar
          filters={filters}
          onChange={(next) => setFilters((f) => ({ ...f, ...next }))}
          onReset={() =>
            setFilters({
              listingType: "",
              propertyType: "",
              location: "",
              minPrice: "",
              maxPrice: "",
              minRooms: "",
            })
          }
        />
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {filtered.length}
            </span>{" "}
            properties found
          </p>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>

            <div className="flex overflow-hidden rounded-lg border border-slate-200">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium ${
                  view === "grid"
                    ? "bg-brand text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <LayoutGrid size={15} /> Grid
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium ${
                  view === "map"
                    ? "bg-brand text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <MapIcon size={15} /> Map
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-20 text-center">
            <p className="font-semibold text-slate-700">No properties found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="h-[600px] overflow-hidden rounded-xl border border-slate-200">
            <MapViewClient properties={filtered} />
          </div>
        )}
      </div>
    </div>
  );
}
