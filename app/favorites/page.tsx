import { getProperties } from "@/lib/data";
import FavoritesList from "@/components/FavoritesList";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata = { title: "Saved listings | maskan demo" };

export default async function FavoritesPage() {
  const [properties, locale] = await Promise.all([
    getProperties(),
    getLocale(),
  ]);
  const dict = dictionaries[locale];

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {dict.favorites.title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{dict.favorites.subtitle}</p>
        <div className="mt-8">
          <FavoritesList properties={properties} dict={dict} />
        </div>
      </div>
    </div>
  );
}
