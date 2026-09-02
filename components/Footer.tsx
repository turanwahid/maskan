import Link from "next/link";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const icons = {
  facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z",
  instagram:
    "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM7.12 20.45H3.56V9h3.56v11.45z",
  twitter:
    "M22 5.9c-.74.33-1.53.55-2.36.65a4.1 4.1 0 001.8-2.27c-.8.47-1.68.82-2.62 1a4.13 4.13 0 00-7.03 3.76A11.7 11.7 0 013.1 4.7a4.13 4.13 0 001.28 5.51 4.1 4.1 0 01-1.87-.52v.05a4.13 4.13 0 003.31 4.05 4.14 4.14 0 01-1.86.07 4.13 4.13 0 003.86 2.87A8.29 8.29 0 012 18.4a11.7 11.7 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68l-.01-.53c.8-.58 1.5-1.3 2.04-2.13z",
};

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-brand-dark text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <span className="text-lg font-bold text-white">
mas<span className="text-accent">kan</span>
          </span>
          <p className="mt-3 text-sm text-slate-400">
            Switzerland&apos;s marketplace for buying and renting apartments,
            houses and villas.
          </p>
          <div className="mt-4 flex gap-3">
            <SocialIcon path={icons.facebook} />
            <SocialIcon path={icons.instagram} />
            <SocialIcon path={icons.linkedin} />
            <SocialIcon path={icons.twitter} />
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Discover</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/listings?listingType=buy" className="hover:text-white">Buy a home</Link></li>
            <li><Link href="/listings?listingType=rent" className="hover:text-white">Rent a home</Link></li>
            <li><Link href="/agents" className="hover:text-white">Find an agent</Link></li>
            <li><Link href="/favorites" className="hover:text-white">Saved listings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">About us</Link></li>
            <li><Link href="/" className="hover:text-white">Careers</Link></li>
            <li><Link href="/" className="hover:text-white">Press</Link></li>
            <li><Link href="/admin" className="hover:text-white">Agent login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Terms of use</Link></li>
            <li><Link href="/" className="hover:text-white">Privacy policy</Link></li>
            <li><Link href="/" className="hover:text-white">Imprint</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        This is a demo project inspired by maskan.ch — not affiliated with the real maskan.ch. © {new Date().getFullYear()} maskan demo.
      </div>
    </footer>
  );
}
