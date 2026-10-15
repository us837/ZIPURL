'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/dashboard', label: '⌂  Home' },
  { href: '/links', label: '⌁  Links' },
  { href: '/qr', label: '▦  QR Codes' },
  { href: '/analytics', label: '◔  Analytics' },
  { href: '/domains', label: '◇  Custom Domains' },
  { href: '/settings', label: '⚙  Settings' },
];

export default function AppShell({ children, title }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col justify-between border-r border-slate-100 bg-white p-4 lg:flex">
        <div>
          <Link href="/" className="flex h-12 items-center gap-2 px-2 text-xl font-black tracking-tight">ZIP<span className="text-[#0052ff]">URL</span></Link>
          <Link href="/create" className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[#0052ff] text-sm font-semibold text-white">＋ Create New</Link>
          <nav className="mt-5 space-y-1 text-sm font-medium">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full rounded-lg px-3 py-2.5 text-left transition ${active ? 'bg-[#eff4ff] text-[#0052ff]' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div>
          <div className="rounded-lg bg-[#eff4ff] p-3 text-xs">
            <div className="flex justify-between text-slate-600"><span>Tier</span><b>Free plan</b></div>
            <p className="mt-3 flex justify-between text-slate-600"><span>Capacity</span><span>1 / 5 links</span></p>
            <div className="mt-2 h-1.5 rounded-full bg-slate-200"><div className="h-full w-1/5 rounded-full bg-[#0052ff]" /></div>
          </div>
          <p className="mt-4 px-2 text-sm font-medium">Personal Workspace</p>
        </div>
      </aside>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-100 bg-[#f8f9ff]/90 px-5 backdrop-blur sm:px-8">
        <p className="text-sm font-semibold text-slate-600 lg:hidden">ZIPURL</p>
        <div className="hidden w-full max-w-md rounded-lg bg-white px-3 py-2 text-sm text-slate-400 shadow-sm lg:block">⌕&nbsp; {title || 'Search links, tags, domains...'}</div>
        <div className="ml-3 flex items-center gap-2">
          <Link href="/pricing" className="rounded-full bg-[#6ffbbe] px-3 py-2 text-xs font-semibold text-emerald-950">⚡ Upgrade</Link>
          <Link href="/settings" className="grid h-8 w-8 place-items-center rounded-full bg-slate-800 text-xs font-bold text-white">YU</Link>
        </div>
      </header>
      <nav className="flex gap-2 overflow-x-auto border-b border-slate-100 px-5 py-3 text-xs font-semibold lg:hidden">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className={`whitespace-nowrap rounded-full px-3 py-2 ${pathname === item.href ? 'bg-[#eff4ff] text-[#0052ff]' : 'bg-white text-slate-600'}`}>{item.label}</Link>
        ))}
      </nav>
      <section className="px-5 py-6 sm:px-8">{children}</section>
    </main>
  );
}
