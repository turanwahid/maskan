import { CheckCircle2 } from "lucide-react";
import { submitPropertyListing } from "@/lib/actions";
import { getLocale } from "@/lib/i18n/get-locale";
import { dictionaries } from "@/lib/i18n/dictionaries";

export const metadata = { title: "List your property | maskan demo" };

export default async function ListPropertyPage({
  searchParams,
}: PageProps<"/list-property">) {
  const [params, locale] = await Promise.all([searchParams, getLocale()]);
  const success = params.success === "1";
  const fullDict = dictionaries[locale];
  const dict = fullDict.listProperty;
  const types = fullDict.hero.propertyTypes;

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">{dict.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{dict.subtitle}</p>

        {success && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>{dict.successMessage}</p>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <form
            action={submitPropertyListing}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.ownerName}
              </label>
              <input
                name="ownerName"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.email}
              </label>
              <input
                type="email"
                name="ownerEmail"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.phone}
              </label>
              <input
                type="tel"
                name="ownerPhone"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.listingType}
              </label>
              <select
                name="listingType"
                defaultValue="buy"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="buy">{dict.sell}</option>
                <option value="rent">{dict.rentOut}</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.propertyType}
              </label>
              <select
                name="propertyType"
                defaultValue="apartment"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="apartment">{types.apartment}</option>
                <option value="house">{types.house}</option>
                <option value="villa">{types.villa}</option>
                <option value="chalet">{types.chalet}</option>
                <option value="penthouse">{types.penthouse}</option>
                <option value="land">{types.land}</option>
                <option value="commercial">{types.commercial}</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.askingPrice}
              </label>
              <input
                type="number"
                name="price"
                required
                min={0}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.rooms}
              </label>
              <input
                type="number"
                step="0.5"
                name="rooms"
                min={0}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.livingSpace}
              </label>
              <input
                type="number"
                name="livingSpace"
                min={0}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.street}
              </label>
              <input
                name="street"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.zip}
              </label>
              <input
                name="zip"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.city}
              </label>
              <input
                name="city"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.canton}
              </label>
              <input
                name="canton"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {dict.description}
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder={dict.descriptionPlaceholder}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                {dict.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
