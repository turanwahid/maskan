import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Calendar,
  LandPlot,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Sparkles,
} from "lucide-react";
import { getAgent, getProperties, getProperty } from "@/lib/data";
import { formatArea, formatPrice } from "@/lib/format";
import Gallery from "@/components/Gallery";
import FavoriteButton from "@/components/FavoriteButton";
import PropertyCard from "@/components/PropertyCard";
import MapViewClient from "@/components/MapViewClient";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { t } from "@/lib/i18n/format";

export default async function PropertyDetailPage({
  params,
}: PageProps<"/listings/[id]">) {
  const { id } = await params;
  const [property, locale] = await Promise.all([getProperty(id), getLocale()]);
  if (!property) notFound();
  const dict = dictionaries[locale];

  const agent = await getAgent(property.agentId);
  const allProperties = await getProperties();
  const similar = allProperties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.address.city === property.address.city ||
          p.propertyType === property.propertyType)
    )
    .slice(0, 3);

  const stats = [
    property.rooms > 0 && {
      icon: BedDouble,
      label: `${property.rooms} ${dict.card.rooms}`,
    },
    property.bathrooms > 0 && {
      icon: Bath,
      label: `${property.bathrooms} ${dict.propertyDetail.bathrooms}`,
    },
    property.livingSpace > 0 && {
      icon: Ruler,
      label: formatArea(property.livingSpace),
    },
    property.plotSpace && {
      icon: LandPlot,
      label: `${formatArea(property.plotSpace)} ${dict.propertyDetail.plot}`,
    },
    property.yearBuilt && {
      icon: Calendar,
      label: t(dict.propertyDetail.built, { year: property.yearBuilt }),
    },
  ].filter(Boolean) as { icon: typeof BedDouble; label: string }[];

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/listings"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand"
        >
          <ArrowLeft size={16} /> {dict.propertyDetail.backToSearch}
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <Gallery images={property.images} title={property.title} />

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-brand px-2.5 py-1 text-xs font-semibold text-white">
                      {property.listingType === "buy"
                        ? dict.card.forSale
                        : dict.card.forRent}
                    </span>
                    {property.status !== "available" && (
                      <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white capitalize">
                        {property.status === "reserved"
                          ? dict.card.reserved
                          : dict.card.sold}
                      </span>
                    )}
                  </div>
                  <h1 className="mt-2 text-2xl font-bold text-slate-900">
                    {property.title}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={15} />
                    {property.address.street}, {property.address.zip}{" "}
                    {property.address.city}, {property.address.canton}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-brand">
                    {formatPrice(property.price, property.pricePeriod)}
                  </p>
                  <FavoriteButton id={property.id} className="static bg-slate-100" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <s.icon size={18} className="text-brand" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                {dict.propertyDetail.description}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                {property.description}
              </p>
            </div>

            {property.features.length > 0 && (
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-slate-900">
                  {dict.propertyDetail.features}
                </h2>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-slate-700">
                      <Sparkles size={14} className="text-accent" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                {dict.propertyDetail.location}
              </h2>
              <div className="h-80 overflow-hidden rounded-lg">
                <MapViewClient properties={[property]} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {agent && (
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {dict.propertyDetail.listingAgent}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-slate-200">
                    <Image
                      src={agent.photo}
                      alt={agent.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/agents/${agent.id}`}
                      className="font-semibold text-slate-900 hover:text-brand"
                    >
                      {agent.name}
                    </Link>
                    <p className="text-xs text-slate-500">{agent.title}</p>
                    <p className="text-xs text-slate-500">{agent.agency}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
                  >
                    <Phone size={15} /> {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}?subject=${encodeURIComponent(
                      `Inquiry about ${property.title}`
                    )}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Mail size={15} /> {dict.propertyDetail.emailAgent}
                  </a>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {dict.propertyDetail.requestInfo}
              </h2>
              <form className="flex flex-col gap-3" action={`mailto:${agent?.email ?? ""}`}>
                <input
                  required
                  placeholder={dict.propertyDetail.yourName}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <input
                  required
                  type="email"
                  placeholder={dict.propertyDetail.yourEmail}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <textarea
                  rows={3}
                  placeholder={t(dict.propertyDetail.messagePlaceholder, {
                    title: property.title,
                  })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  {dict.propertyDetail.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              {dict.propertyDetail.similarProperties}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} dict={dict.card} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
