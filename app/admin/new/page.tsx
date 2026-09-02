import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getAgents } from "@/lib/data";
import { createProperty } from "@/lib/actions";
import PropertyForm from "@/components/PropertyForm";

export const metadata = { title: "Add listing | maskan demo" };

export default async function NewListingPage() {
  if (!(await isAdmin())) redirect("/admin");
  const agents = await getAgents();

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand"
        >
          <ArrowLeft size={16} /> Back to admin
        </Link>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Add listing</h1>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <PropertyForm agents={agents} action={createProperty} />
        </div>
      </div>
    </div>
  );
}
