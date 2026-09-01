import Link from "next/link";
import { Lock, Pencil, Plus, Trash2 } from "lucide-react";
import { isAdmin } from "@/lib/auth";
import { loginAdmin, logoutAdmin, deleteProperty } from "@/lib/actions";
import { getProperties } from "@/lib/data";
import { formatPrice } from "@/lib/format";

export const metadata = { title: "Admin | newhome demo" };

export default async function AdminPage({
  searchParams,
}: PageProps<"/admin">) {
  const params = await searchParams;
  const admin = await isAdmin();

  if (!admin) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Lock size={20} />
          </div>
          <h1 className="mt-4 text-center text-lg font-bold text-slate-900">
            Agent login
          </h1>
          <p className="mt-1 text-center text-sm text-slate-500">
            Enter the admin passcode to manage listings.
          </p>
          <form action={loginAdmin} className="mt-6 flex flex-col gap-3">
            <input
              type="password"
              name="passcode"
              required
              placeholder="Passcode"
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Sign in
            </button>
          </form>
          {params.error && (
            <p className="mt-3 text-center text-sm text-red-600">
              Incorrect passcode. Try again.
            </p>
          )}
          <p className="mt-4 text-center text-xs text-slate-400">
            Demo passcode: newhome2026
          </p>
        </div>
      </div>
    );
  }

  const properties = (await getProperties()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Listings management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {properties.length} properties total
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/new"
              className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
            >
              <Plus size={16} /> Add listing
            </Link>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {p.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {p.address.city}, {p.address.canton}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">
                    {p.propertyType} · {p.listingType}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatPrice(p.price, p.pricePeriod)}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate-600">
                    {p.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/${p.id}/edit`}
                        className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <form action={deleteProperty}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
