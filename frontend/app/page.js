'use client';

import Image from 'next/image';
import { useState } from 'react';
import QrDesigner from './QrDesigner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

function ArrowIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>;
}

function LinkIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 13a5 5 0 0 0 7.07.07l2-2a5 5 0 0 0-7.07-7.07l-1.15 1.15" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 11a5 5 0 0 0-7.07-.07l-2 2A5 5 0 0 0 12 20l1.15-1.15" /></svg>;
}

function QrIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2m2 0h2m-6 2h6m-6 2h2m2 0h2m-4 2h4" /></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" className="h-4 w-4 text-[#6ee7b7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('link');
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not shorten that link.');
      setShortUrl(data.shortUrl);
    } catch (requestError) {
      setError(requestError.message || 'Unable to reach ZIPURL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyShortUrl = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Unable to copy the link. Please copy it manually.');
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#071329] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_84%_8%,rgba(35,95,217,0.18),transparent_22rem),radial-gradient(circle_at_14%_92%,rgba(12,96,120,0.17),transparent_25rem)]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[12%] top-28 text-3xl text-blue-300/30">✦</div>
      <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-[38%] text-lg text-cyan-200/20">✧</div>
      <div aria-hidden="true" className="pointer-events-none absolute bottom-24 right-[16%] text-5xl text-blue-300/15">✦</div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
        <a href="#top" aria-label="ZIPURL home" className="shrink-0"><Image src="/zipurl-logo.svg" alt="ZIPURL" width={140} height={62} priority className="h-11 w-auto" /></a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
          <a href="#platform" className="transition hover:text-white">Platform <span aria-hidden="true">⌄</span></a><a href="#ai" className="transition hover:text-white">AI <span aria-hidden="true">⌄</span></a><a href="#solutions" className="transition hover:text-white">Solutions <span aria-hidden="true">⌄</span></a><a href="#pricing" className="transition hover:text-white">Pricing</a><a href="#resources" className="transition hover:text-white">Resources <span aria-hidden="true">⌄</span></a>
        </nav>
        <div className="flex items-center gap-2 text-sm font-semibold sm:gap-3"><button type="button" className="hidden rounded-lg px-2 py-2 text-white transition hover:text-slate-300 sm:block">Log in</button><button type="button" className="hidden rounded-lg border border-slate-500/80 px-3 py-2 text-white transition hover:border-white hover:bg-white/5 sm:block">Get a Quote</button><button type="button" className="rounded-lg bg-white px-3 py-2 text-slate-950 transition hover:bg-slate-200 sm:px-4">Sign up Free</button></div>
      </header>

      <section id="top" className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-12 text-center sm:px-8 sm:pt-20 lg:pb-24">
        <p className="mb-5 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Smarter links, bigger reach</p>
        <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">Understand what clicks with your audience</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">ZIPURL makes it easy to create, share, and track short links and QR Codes. Find what&apos;s resonating and scale it into bigger reach, more clicks, and more sales.</p>

        <section aria-label="Create a short link" className="mt-11 w-full max-w-3xl rounded-[1.75rem] border border-slate-700/80 bg-[#101f42]/90 p-2 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-3">
          <div className="flex gap-1.5 px-1 pt-1 sm:gap-2">
            <button type="button" onClick={() => setActiveTab('link')} aria-pressed={activeTab === 'link'} className={`flex items-center gap-2 rounded-t-xl px-3 py-2.5 text-xs font-bold transition sm:px-5 sm:text-sm ${activeTab === 'link' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><span className={activeTab === 'link' ? 'text-amber-600' : 'text-slate-400'}><LinkIcon /></span>ZIPURL for Link</button>
            <button type="button" onClick={() => setActiveTab('qr')} aria-pressed={activeTab === 'qr'} className={`flex items-center gap-2 rounded-t-xl px-3 py-2.5 text-xs font-bold transition sm:px-5 sm:text-sm ${activeTab === 'qr' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}><span className={activeTab === 'qr' ? 'text-blue-600' : 'text-slate-400'}><QrIcon /></span>ZIPURL for QR Code</button>
          </div>

          <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-inner sm:p-8">
            {activeTab === 'link' ? <>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Shorten a long link</h2><p className="mt-1 text-sm text-slate-500">No credit card required.</p>
              <form onSubmit={handleSubmit} className="mt-7"><label htmlFor="long-url" className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Paste your long link here</label><div className="flex flex-col gap-3 sm:flex-row"><input id="long-url" type="url" required value={longUrl} onChange={(event) => setLongUrl(event.target.value)} placeholder="https://example.com/my-long-url" className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100" /><button type="submit" disabled={loading} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#1458e9] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Shortening…' : 'Get your link for free'} <ArrowIcon /></button></div></form>
              {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
              {shortUrl && <div className="mt-4 flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><p className="text-xs font-medium text-slate-500">Your short link is ready</p><a href={shortUrl} target="_blank" rel="noreferrer" className="mt-1 block truncate font-mono text-sm font-bold text-blue-700 underline">{shortUrl}</a></div><button type="button" onClick={copyShortUrl} className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100">{copied ? 'Copied!' : 'Copy link'}</button></div>}
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-slate-100 pt-5 text-xs text-slate-500"><span className="flex h-6 w-6 items-center justify-center rounded bg-[#ff6b35] text-[10px] font-black text-white">G²</span><span className="font-bold tracking-wide text-amber-500">★★★★★ <span className="font-medium text-slate-700">4.5/5</span></span><span className="hidden text-slate-300 sm:inline">|</span><span>Loved by 900+ on G2</span></div>
            </> : <QrDesigner />}
          </div>
        </section>

        <div id="pricing" className="mt-10 flex w-full max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-slate-300 sm:flex-row sm:text-left"><span className="font-semibold text-white">Sign up for free. Your free plan includes:</span><div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:justify-end"><span className="flex items-center gap-1.5"><CheckIcon />5 short links/month</span><span className="flex items-center gap-1.5"><CheckIcon />3 custom back-halves/month</span><span className="flex items-center gap-1.5"><CheckIcon />Unlimited link clicks</span></div></div>
      </section>
    </main>
  );
}
