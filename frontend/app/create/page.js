'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const LAST_LINK_KEY = 'zipurl:last-link';

export default function CreateFirstLinkPage() {
  const router = useRouter();
  const [longUrl, setLongUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createLink = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });
      const link = await response.json();
      if (!response.ok) throw new Error(link.error || 'Unable to shorten this link.');
      window.localStorage.setItem(LAST_LINK_KEY, JSON.stringify({ ...link, createdAt: new Date().toISOString() }));
      router.push('/dashboard');
    } catch (requestError) {
      setError(requestError.message || 'Unable to reach ZIPURL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <main className="min-h-screen overflow-hidden bg-[#fffdfb] text-[#1c1c1f]">
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(rgba(222,213,203,0.32)_1px,transparent_1px),linear-gradient(90deg,rgba(222,213,203,0.32)_1px,transparent_1px),radial-gradient(ellipse_at_center,rgba(255,229,210,0.82),rgba(255,253,251,0)_65%)] bg-[size:60px_60px,60px_60px,100%_100%]" />
    <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6"><Link href="/" className="text-lg font-black tracking-tight text-slate-900">ZIP<span className="text-[#ff6b1a]">URL</span></Link><span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">First link setup</span></header>
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-16 pt-7 text-center sm:pt-12">
      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"><span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded bg-[#ff8a35] text-[10px] text-white">↗</span>ZIPURL Links</span>
      <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Short links with<br />superpowers</h1>
      <p className="mt-5 max-w-xl text-lg leading-7 text-slate-600">The modern link management platform for entrepreneurs, creators, and growth teams.</p>
      <div className="mt-8 flex gap-3"><button type="button" className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white">Start for free</button><button type="button" className="rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Get a demo</button></div>
      <div className="mt-16 w-full max-w-xl rounded-2xl bg-white/45 p-3 shadow-[0_18px_40px_rgba(85,62,40,0.08)] backdrop-blur-sm">
        <form onSubmit={createLink} className="flex gap-3 rounded-xl bg-white p-3 shadow-md ring-1 ring-slate-200"><span className="flex items-center text-slate-400">⌁</span><input type="url" required value={longUrl} onChange={(event) => setLongUrl(event.target.value)} placeholder="Shorten any link..." aria-label="URL to shorten" className="min-w-0 flex-1 text-sm outline-none placeholder:text-slate-400" /><button type="submit" disabled={loading} className="rounded-lg bg-[#ff6b1a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e85c0b] disabled:opacity-60">{loading ? 'Creating…' : 'Shorten link'}</button></form>
        {error && <p role="alert" className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="mt-3 space-y-2 text-left"><PreviewRow label="zip.url/get-started" destination="Create your first link above" /><PreviewRow label="zip.url/your-link" destination="Then view its dashboard" /></div>
        <p className="px-2 pt-4 text-center text-sm text-slate-600">Want to claim your links, edit them, or view their <span className="underline">analytics</span>?<br /><span className="font-medium underline">Create a free account</span> on ZIPURL to get started.</p>
      </div>
    </section>
  </main>;
}

function PreviewRow({ label, destination }) {
  return <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 font-black text-slate-800">↗</span><div className="min-w-0 flex-1"><p className="font-semibold text-slate-800">{label}</p><p className="truncate text-sm text-slate-500">↳ {destination}</p></div><span className="rounded-md bg-slate-50 px-2 py-1 text-xs text-slate-500">0 clicks</span><span className="text-slate-400">⋮</span></div>;
}
