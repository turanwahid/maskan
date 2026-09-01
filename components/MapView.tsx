"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice } from "@/lib/format";

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="background:#0b3555;color:#fff;padding:4px 8px;border-radius:9999px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 1px 4px rgba(0,0,0,.35);border:2px solid white;">●</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

export default function MapView({ properties }: { properties: Property[] }) {
  const withCoords = properties.filter((p) => p.address.lat && p.address.lng);
  const center: [number, number] = withCoords.length
    ? [withCoords[0].address.lat, withCoords[0].address.lng]
    : [46.8182, 8.2275];

  return (
    <MapContainer
      center={center}
      zoom={withCoords.length ? 8 : 7}
      className="h-full w-full rounded-xl"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {withCoords.map((p) => (
        <Marker
          key={p.id}
          position={[p.address.lat, p.address.lng]}
          icon={markerIcon}
        >
          <Popup>
            <div className="w-40">
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-xs text-slate-600">
                {formatPrice(p.price, p.pricePeriod)}
              </p>
              <Link
                href={`/listings/${p.id}`}
                className="mt-1 inline-block text-xs font-semibold text-brand hover:underline"
              >
                View listing →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
