import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getAgent, getProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

export default async function AgentDetailPage({
  params,
}: PageProps<"/agents/[id]">) {
  const { id } = await params;
  const agent = await getAgent(id);
  if (!agent) notFound();

  const properties = (await getProperties()).filter(
    (p) => p.agentId === agent.id
  );

  return (
    <div className="bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/agents"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand"
        >
          <ArrowLeft size={16} /> Back to agents
        </Link>

        <div className="flex flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white p-8 text-center sm:flex-row sm:text-left">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-slate-200">
            <Image
              src={agent.photo}
              alt={agent.name}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{agent.name}</h1>
            <p className="text-sm text-slate-500">
              {agent.title} · {agent.agency}
            </p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">{agent.bio}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <a
                href={`tel:${agent.phone}`}
                className="flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                <Phone size={14} /> {agent.phone}
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Mail size={14} /> {agent.email}
              </a>
            </div>
          </div>
        </div>

        <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900">
          Listings by {agent.name} ({properties.length})
        </h2>
        {properties.length === 0 ? (
          <p className="text-sm text-slate-500">No active listings right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
