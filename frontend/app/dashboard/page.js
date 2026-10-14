'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const LAST_LINK_KEY = 'zipurl:last-link';

function getTitle(longUrl) {
  try { return new URL(longUrl).hostname.replace('www.', ''); } catch { return 'Your new link'; }
}

function QrVisual() {
  return <div className="grid w-32 grid-cols-[repeat(9,1fr)] gap-1 rounded-lg bg-white p-3 shadow-sm">{Array.from({ length: 81 }, (_, index) => <span key={index} className={`aspect-square rounded-[1px] ${index % 7 < 4 || index % 11 === 0 ? 'bg-slate-800' : 'bg-transparent'}`} />)}</div>;
}

export default function DashboardPage() {
  const [link, setLink] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LAST_LINK_KEY);
    if (stored) setLink(JSON.parse(stored));
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(link.shortUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (!link) return <main className="grid min-h-screen place-items-center bg-[#f8f9ff] p-6 text-center text-slate-900"><div><p className="text-sm font-semibold text-blue-700">ZIPURL Dashboard</p><h1 className="mt-2 text-3xl font-bold">Create your first link first</h1><p className="mt-3 text-slate-600">Your dashboard will appear after you shorten a link.</p><Link href="/create" className="mt-6 inline-flex rounded-lg bg-[#0052ff] px-4 py-3 font-semibold text-white">Create a link</Link></div></main>;

  const title = getTitle(link.longUrl);
  const created = new Date(link.createdAt).toLocaleString();
  return <main className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] lg:pl-64">
    <aside className="hidden fixed inset-y-0 left-0 z-20 w-64 flex-col justify-between border-r border-slate-100 bg-white p-4 lg:flex"><div><Link href="/" className="flex h-12 items-center gap-2 px-2 text-xl font-black tracking-tight">ZIP<span className="text-[#0052ff]">URL</span></Link><Link href="/create" className="mt-3 flex h-10 items-center justify-center rounded-lg bg-[#0052ff] text-sm font-semibold text-white">＋ Create New</Link><nav className="mt-5 space-y-1 text-sm font-medium"><Nav label="⌂  Home" /><Nav active label="⌁  Links" /><Nav label="▦  QR Codes" /><Nav label="◔  Analytics" /><Nav label="◇  Custom Domains" /><Nav label="⚙  Settings" /></nav></div><div><div className="rounded-lg bg-[#eff4ff] p-3 text-xs"><div className="flex justify-between text-slate-600"><span>Tier</span><b>Free plan</b></div><p className="mt-3 flex justify-between text-slate-600"><span>Capacity</span><span>1 / 5 links</span></p><div className="mt-2 h-1.5 rounded-full bg-slate-200"><div className="h-full w-1/5 rounded-full bg-[#0052ff]" /></div></div><p className="mt-4 px-2 text-sm font-medium">Personal Workspace</p></div></aside>
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-100 bg-[#f8f9ff]/90 px-5 backdrop-blur sm:px-8"><div className="w-full max-w-md rounded-lg bg-white px-3 py-2 text-sm text-slate-400 shadow-sm">⌕&nbsp; Search links, tags, domains...</div><div className="ml-3 flex items-center gap-2"><button className="hidden rounded-full bg-[#eff4ff] px-3 py-2 text-xs font-semibold text-blue-700 sm:block">✦ Ask AI</button><button className="rounded-full bg-[#6ffbbe] px-3 py-2 text-xs font-semibold text-emerald-950">⚡ Upgrade</button><span className="grid h-8 w-8 place-items-center rounded-full bg-slate-800 text-xs font-bold text-white">YU</span></div></header>
    <section className="px-5 py-6 sm:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><p className="text-sm text-slate-500">Links <span className="mx-1">›</span> <b className="rounded bg-[#dce9ff] px-2 py-1 text-slate-700">{link.shortUrl.replace(/^https?:\/\//, '')}</b> <span className="mx-1">›</span> Performance & Details</p><div className="flex items-center gap-2"><span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">● Active · 0 Clicks</span><button onClick={copyLink} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold shadow-sm">{copied ? 'Copied!' : 'Copy link'}</button><a href={link.shortUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-[#0052ff] px-3 py-2 text-xs font-semibold text-white">Open link ↗</a></div></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12"><div className="space-y-6 lg:col-span-8"><section className="rounded-xl bg-white p-5 shadow-sm sm:p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Your new short link</p><h1 className="mt-1 truncate text-xl font-bold">{title}</h1><a href={link.longUrl} target="_blank" rel="noreferrer" className="mt-2 block truncate text-sm text-slate-500 underline">{link.longUrl}</a></div><span className="h-fit rounded-full bg-[#dae2fd] px-3 py-1.5 text-xs font-semibold text-slate-700">301 Permanent</span></div><div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Meta label="Shortened endpoint" value={link.shortUrl.replace(/^https?:\/\//, '')} /><Meta label="Campaign tags" value="No tags yet" /><Meta label="Created" value={created} /><Meta label="Security" value="SSL enabled" /></div></section>
        <section className="rounded-xl bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold">Performance Telemetry</h2><p className="mt-1 text-sm text-slate-500">Analytics will begin collecting when people visit your link.</p></div><span className="rounded-lg bg-[#eff4ff] px-3 py-2 text-xs font-semibold text-blue-700">Last 30 days</span></div><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4"><Metric label="Total engagements" value="0" /><Metric label="Link clicks" value="0" accent /><Metric label="QR code scans" value="0" /><Metric label="Unique visitors" value="0" /></div><div className="mt-5 grid h-36 place-items-center rounded-lg bg-[#eff4ff] text-sm text-slate-500">Your performance chart will appear here as clicks arrive.</div></section>
        <section className="rounded-xl bg-white p-5 shadow-sm sm:p-6"><h2 className="font-bold">Dynamic Routing & Device Fallbacks</h2><p className="mt-1 text-sm text-slate-500">Send people to different destinations by device or location.</p><button className="mt-4 rounded-lg bg-[#eff4ff] px-3 py-2 text-sm font-semibold text-blue-700">＋ Add rule</button></section></div>
        <aside className="space-y-6 lg:col-span-4"><section className="rounded-xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-bold">Dynamic QR Code</h2><p className="mt-1 text-sm text-slate-500">Create a scannable QR asset.</p></div><span className="text-emerald-600">●</span></div><div className="my-5 grid place-items-center rounded-lg bg-[#eff4ff] py-7"><QrVisual /></div><Link href="/#top" className="flex w-full justify-center rounded-lg bg-[#eff4ff] px-3 py-2 text-sm font-semibold text-blue-700">Customize QR Code</Link></section><section className="rounded-xl bg-white p-5 shadow-sm"><h2 className="font-bold">Get more from your links</h2><p className="mt-2 text-sm leading-6 text-slate-500">Create an account later to manage links across devices and unlock advanced analytics.</p><button className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold">Create free account</button></section></aside></div></div></section>
  </main>;
}

function Nav({ label, active }) { return <button type="button" className={`flex w-full rounded-lg px-3 py-2.5 text-left transition ${active ? 'bg-[#eff4ff] text-[#0052ff]' : 'text-slate-600 hover:bg-slate-50'}`}>{label}</button>; }
function Meta({ label, value }) { return <div className="rounded-lg bg-[#eff4ff] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-1 truncate text-sm font-semibold">{value}</p></div>; }
function Metric({ label, value, accent }) { return <div className="rounded-xl bg-[#eff4ff] p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p><p className={`mt-2 text-2xl font-bold ${accent ? 'text-[#0052ff]' : ''}`}>{value}</p></div>; }
