import { getProperties } from "@/lib/data";
import FavoritesList from "@/components/FavoritesList";

export const metadata = { title: "Saved listings | maskan demo" };

export default async function FavoritesPage() {
  const properties = await getProperties();

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Saved listings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Properties you&apos;ve favorited, stored on this device.
        </p>
        <div className="mt-8">
          <FavoritesList properties={properties} />
        </div>
      </div>
    </div>
  );
}
