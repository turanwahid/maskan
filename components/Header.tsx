"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Home, Menu, User, X } from "lucide-react";

const navLinks = [
  { href: "/listings?listingType=buy", label: "Buy" },
  { href: "/listings?listingType=rent", label: "Rent" },
  { href: "/agents", label: "Agents" },
  { href: "/favorites", label: "Favorites" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-brand">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-white">
            <Home size={18} />
          </span>
          <span className="text-lg font-bold tracking-tight">
            mas<span className="text-accent">kan</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-100 hover:text-brand ${
                pathname === link.href.split("?")[0]
                  ? "text-brand"
                  : "text-slate-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/favorites"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-brand"
            aria-label="Favorites"
          >
            <Heart size={20} />
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <User size={16} />
            Admin
          </Link>
          <Link
            href="/listings"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
          >
            Find a home
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-black/5 bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
