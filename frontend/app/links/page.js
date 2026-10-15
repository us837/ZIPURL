'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AppShell from '../components/AppShell';

const LAST_LINK_KEY = 'zipurl:last-link';

export default function LinksPage() {
  const [link, setLink] = useState(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(LAST_LINK_KEY);
    if (stored) setLink(JSON.parse(stored));
  }, []);

  return (
    <AppShell title="Search links...">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Links</h1>
            <p className="mt-1 text-sm text-slate-500">Pre-auth list of the latest link saved in this browser.</p>
          </div>
          <Link href="/create" className="rounded-lg bg-[#0052ff] px-4 py-2.5 text-sm font-semibold text-white">Create link</Link>
        </div>
        {!link ? (
          <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold">No links yet</p>
            <p className="mt-2 text-sm text-slate-500">Shorten a URL to see it here.</p>
          </div>
        ) : (
          <Link href="/dashboard" className="mt-8 flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4ff] font-black text-[#0052ff]">↗</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{link.shortUrl}</p>
              <p className="truncate text-sm text-slate-500">{link.longUrl}</p>
            </div>
            <span className="text-xs text-slate-500">0 clicks</span>
          </Link>
        )}
      </div>
    </AppShell>
  );
}
