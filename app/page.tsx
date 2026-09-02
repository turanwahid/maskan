import Link from "next/link";
import { Building2, Home as HomeIcon, TreePine, Warehouse } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/data";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";

export default async function Home() {
  const [properties, locale] = await Promise.all([
    getProperties(),
    getLocale(),
  ]);
  const dict = dictionaries[locale];
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  const cities = Array.from(
    new Set(properties.map((p) => p.address.city))
  ).slice(0, 8);

  const categories = [
    { type: "apartment", label: dict.home.categories.apartments, icon: Building2 },
    { type: "house", label: dict.home.categories.houses, icon: HomeIcon },
    { type: "chalet", label: dict.home.categories.chalets, icon: TreePine },
    { type: "commercial", label: dict.home.categories.commercial, icon: Warehouse },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-brand px-4 py-20 sm:px-6">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://picsum.photos/seed/maskan-hero/1600/900)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand/70 to-brand/40" />
        <div className="relative z-10 flex w-full flex-col items-center gap-6 text-center">
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {dict.home.heroTitle}
          </h1>
          <p className="max-w-xl text-base text-slate-200 sm:text-lg">
            {dict.home.heroSubtitle}
          </p>
          <HeroSearch dict={dict.hero} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {dict.home.browseCategory}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map(({ type, label, icon: Icon }) => (
            <Link
              key={type}
              href={`/listings?propertyType=${type}`}
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon size={22} />
              </span>
              <span className="font-semibold text-slate-800">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              {dict.home.featuredListings}
            </h2>
            <Link
              href="/listings"
              className="text-sm font-semibold text-brand hover:underline"
            >
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} dict={dict.card} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          {dict.home.popularCities}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/listings?location=${encodeURIComponent(city)}`}
              className="relative flex h-28 items-end overflow-hidden rounded-xl bg-slate-200 p-4 shadow-sm"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(
                    city
                  )}/400/300)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="relative z-10 font-semibold text-white">
                {city}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-brand-dark py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {dict.home.agentCta.title}
          </h2>
          <p className="max-w-xl text-slate-300">{dict.home.agentCta.subtitle}</p>
          <Link
            href="/admin"
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-dark"
          >
            {dict.home.agentCta.button}
          </Link>
        </div>
      </section>
    </div>
  );
}
