"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { setLocale } from "@/lib/actions";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-1 rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-700">
      <Languages size={15} className="text-slate-500" aria-hidden />
      <select
        aria-label={label}
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as Locale;
          startTransition(() => {
            setLocale(next);
          });
        }}
        className="bg-transparent text-sm outline-none"
      >
        {locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
