import Link from 'next/link';
import { MarketingShell } from './components/SiteChrome';

export default function NotFound() {
  return (
    <MarketingShell>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">404</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">This page is not here</h1>
      <p className="mt-4 max-w-xl text-slate-300">The route may have moved, or the short link you wanted lives on the API host instead of this website.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950">Go home</Link>
        <Link href="/help" className="rounded-lg border border-white/20 px-4 py-3 text-sm font-bold">Help</Link>
      </div>
    </MarketingShell>
  );
}
