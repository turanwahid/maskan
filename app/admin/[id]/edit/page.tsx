import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAgents, getProperty } from "@/lib/data";
import { updateProperty } from "@/lib/actions";
import PropertyForm from "@/components/PropertyForm";

export default async function EditListingPage({
  params,
}: PageProps<"/admin/[id]/edit">) {
  if (!(await isAdmin())) redirect("/admin");
  const { id } = await params;
  const [property, agents] = await Promise.all([
    getProperty(id),
    getAgents(),
  ]);
  if (!property) notFound();

  const action = updateProperty.bind(null, id);

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand"
        >
          <ArrowLeft size={16} /> Back to admin
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">
          Edit listing
        </h1>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <PropertyForm property={property} agents={agents} action={action} />
        </div>
      </div>
    </div>
  );
}
