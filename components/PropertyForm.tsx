import type { Agent, Property } from "@/lib/types";

export default function PropertyForm({
  property,
  agents,
  action,
}: {
  property?: Property;
  agents: Agent[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Title
        </label>
        <input
          name="title"
          required
          defaultValue={property?.title}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Listing type
        </label>
        <select
          name="listingType"
          defaultValue={property?.listingType ?? "buy"}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Property type
        </label>
        <select
          name="propertyType"
          defaultValue={property?.propertyType ?? "apartment"}
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
          Price (CHF)
        </label>
        <input
          type="number"
          name="price"
          required
          min={0}
          defaultValue={property?.price}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Status
        </label>
        <select
          name="status"
          defaultValue={property?.status ?? "available"}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="available">Available</option>
          <option value="reserved">Reserved</option>
          <option value="sold">Sold</option>
        </select>
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
          defaultValue={property?.rooms}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Bedrooms
        </label>
        <input
          type="number"
          name="bedrooms"
          min={0}
          defaultValue={property?.bedrooms}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Bathrooms
        </label>
        <input
          type="number"
          name="bathrooms"
          min={0}
          defaultValue={property?.bathrooms}
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
          defaultValue={property?.livingSpace}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Plot space (m²)
        </label>
        <input
          type="number"
          name="plotSpace"
          min={0}
          defaultValue={property?.plotSpace}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Year built
        </label>
        <input
          type="number"
          name="yearBuilt"
          defaultValue={property?.yearBuilt}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Agent
        </label>
        <select
          name="agentId"
          defaultValue={property?.agentId ?? agents[0]?.id}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Street & number
        </label>
        <input
          name="street"
          required
          defaultValue={property?.address.street}
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
          defaultValue={property?.address.zip}
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
          defaultValue={property?.address.city}
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
          defaultValue={property?.address.canton}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Latitude
        </label>
        <input
          type="number"
          step="any"
          name="lat"
          defaultValue={property?.address.lat}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Longitude
        </label>
        <input
          type="number"
          step="any"
          name="lng"
          defaultValue={property?.address.lng}
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
          defaultValue={property?.description}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Features (comma separated)
        </label>
        <input
          name="features"
          defaultValue={property?.features.join(", ")}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
          Image URLs (comma separated, leave blank for placeholders)
        </label>
        <textarea
          name="images"
          rows={2}
          defaultValue={property?.images.join(", ")}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={property?.featured}
          className="h-4 w-4 rounded border-slate-300"
        />
        <label htmlFor="featured" className="text-sm text-slate-700">
          Feature on homepage
        </label>
      </div>

      <div className="flex items-center gap-3 sm:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          {property ? "Save changes" : "Create listing"}
        </button>
      </div>
    </form>
  );
}
