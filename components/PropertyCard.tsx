import Image from "next/image";
import Link from "next/link";
import { BedDouble, MapPin, Ruler, Bath } from "lucide-react";
import type { Property } from "@/lib/types";
import { formatArea, formatPrice } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import FavoriteButton from "./FavoriteButton";

export default function PropertyCard({
  property,
  dict,
}: {
  property: Property;
  dict: Dictionary["card"];
}) {
  const statusLabel: Record<Property["status"], string> = {
    available: "",
    reserved: dict.reserved,
    sold: dict.sold,
  };
  const badge = statusLabel[property.status];

  return (
    <Link
      href={`/listings/${property.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-white shadow">
            {property.listingType === "buy" ? dict.forSale : dict.forRent}
          </span>
          {badge && (
            <span className="rounded-md bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-white shadow">
              {badge}
            </span>
          )}
        </div>
        <FavoriteButton id={property.id} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-lg font-bold text-brand">
          {formatPrice(property.price, property.pricePeriod)}
        </p>
        <h3 className="line-clamp-2 font-semibold text-slate-900">
          {property.title}
        </h3>
        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} />
          {property.address.zip} {property.address.city}, {property.address.canton}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-slate-100 pt-3 text-sm text-slate-600">
          {property.rooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble size={15} /> {property.rooms} {dict.rooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath size={15} /> {property.bathrooms}
            </span>
          )}
          {property.livingSpace > 0 && (
            <span className="flex items-center gap-1">
              <Ruler size={15} /> {formatArea(property.livingSpace)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
