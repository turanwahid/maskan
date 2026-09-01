import { getProperties } from "@/lib/data";
import ListingsExplorer from "@/components/ListingsExplorer";
import type { ListingType, PropertyType } from "@/lib/types";

export const metadata = {
  title: "Search listings | newhome demo",
};

export default async function ListingsPage({
  searchParams,
}: PageProps<"/listings">) {
  const params = await searchParams;
  const properties = await getProperties();

  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v ?? "";
  };

  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900">
            {get("listingType") === "rent"
              ? "Properties for rent"
              : get("listingType") === "buy"
              ? "Properties for sale"
              : "All properties"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Browse apartments, houses and villas across Switzerland.
          </p>
        </div>
      </div>

      <ListingsExplorer
        properties={properties}
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
