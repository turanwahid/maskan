import { getProperties } from "@/lib/data";
import ListingsExplorer from "@/components/ListingsExplorer";
import type { ListingType, PropertyType } from "@/lib/types";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata = {
  title: "Search listings | maskan demo",
};

export default async function ListingsPage({
  searchParams,
}: PageProps<"/listings">) {
  const params = await searchParams;
  const [properties, locale] = await Promise.all([
    getProperties(),
    getLocale(),
  ]);
  const dict = dictionaries[locale];

  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v ?? "";
  };

  const listingType = get("listingType");
  const title =
    listingType === "rent"
      ? dict.listings.titleRent
      : listingType === "buy"
      ? dict.listings.titleBuy
      : dict.listings.titleAll;

  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{dict.listings.subtitle}</p>
        </div>
      </div>

      <ListingsExplorer
        properties={properties}
        dict={dict}
        initialFilters={{
          listingType: (get("listingType") as ListingType) || "",
          propertyType: (get("propertyType") as PropertyType) || "",
          location: get("location"),
          minPrice: get("minPrice"),
          maxPrice: get("maxPrice"),
          minRooms: get("minRooms"),
        }}
      />
    </div>
  );
}
