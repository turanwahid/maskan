import { CheckCircle2 } from "lucide-react";
import { submitPropertyListing } from "@/lib/actions";

export const metadata = { title: "List your property | maskan demo" };

export default async function ListPropertyPage({
  searchParams,
}: PageProps<"/list-property">) {
  const params = await searchParams;
  const success = params.success === "1";

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">
          List your property
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Tell us about your property and one of our agents will get back to
          you to prepare it for listing.
        </p>

        {success && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>
              Thanks! We&apos;ve received your submission and an agent will
              be in touch shortly.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <form
            action={submitPropertyListing}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your name
              </label>
              <input
                name="ownerName"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
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
                Phone
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
                Listing type
              </label>
              <select
                name="listingType"
                defaultValue="buy"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="buy">Sell</option>
                <option value="rent">Rent out</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Property type
              </label>
              <select
                name="propertyType"
                defaultValue="apartment"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="chalet">Chalet</option>
                <option value="penthouse">Penthouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Asking price (CHF)
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
                Rooms
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
                Living space (m²)
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
                Street & number
              </label>
              <input
                name="street"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                ZIP
              </label>
              <input
                name="zip"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                City
              </label>
              <input
                name="city"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Canton
              </label>
              <input
                name="canton"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Tell us more about the property..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Submit property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
