import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { getAgents, getProperties } from "@/lib/data";

export const metadata = { title: "Our agents | maskan demo" };

export default async function AgentsPage() {
  const [agents, properties] = await Promise.all([
    getAgents(),
    getProperties(),
  ]);

  return (
    <div className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Our agents</h1>
        <p className="mt-1 text-sm text-slate-500">
          Local experts across Switzerland ready to help you buy, sell or
          rent.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            const count = properties.filter(
              (p) => p.agentId === agent.id
            ).length;
            return (
              <div
                key={agent.id}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <Link
                  href={`/agents/${agent.id}`}
                  className="font-semibold text-slate-900 hover:text-brand"
                >
                  {agent.name}
                </Link>
                <p className="-mt-2 text-sm text-slate-500">{agent.title}</p>
                <p className="text-xs text-slate-400">{agent.agency}</p>
                <p className="text-xs font-medium text-brand">
                  {count} active listing{count === 1 ? "" : "s"}
                </p>
                <div className="mt-2 flex w-full gap-2">
                  <a
                    href={`tel:${agent.phone}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
