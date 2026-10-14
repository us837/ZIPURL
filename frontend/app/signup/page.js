'use client';

import Link from 'next/link';
import { useState } from 'react';

function GoogleIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5"><path fill="#4285F4" d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5a4.7 4.7 0 0 1-2 3.1v2.5h3.2c1.9-1.7 3.1-4.3 3.1-7.4Z" /><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9v2.6A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.2 13.7A6 6 0 0 1 6 12c0-.6.1-1.2.2-1.7V7.7H2.9A10 10 0 0 0 2 12c0 1.6.4 3.1.9 4.3l3.3-2.6Z" /><path fill="#EA4335" d="M12 6c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 2.9 14.7 2 12 2a10 10 0 0 0-9.1 5.7l3.3 2.6C7 7.8 9.3 6 12 6Z" /></svg>;
}

function GitHubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5A3.9 3.9 0 0 1 6.5 8c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1.1a9.8 9.8 0 0 1 5.1 0c2-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" /></svg>;
}

export default function SignupPage() {
  const [notice, setNotice] = useState('');
  const showUpcoming = (event) => { event.preventDefault(); setNotice('Account creation will be connected when authentication is added.'); };

  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-white px-5 py-12 text-[#111827]">
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(226,232,240,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(226,232,240,0.45)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,white,transparent_88%)]" />
    <section className="w-full max-w-sm"><Link href="/" className="mx-auto mb-8 block w-fit text-lg font-black tracking-tight">ZIP<span className="text-[#0052ff]">URL</span></Link><div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:p-8"><h1 className="text-center text-2xl font-bold tracking-tight">Create your ZIPURL account</h1><form onSubmit={showUpcoming} className="mt-7"><label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">Work email</label><input id="email" type="email" required placeholder="panic@thedis.co" className="w-full rounded-lg border border-slate-800 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-slate-200" /><button type="submit" className="mt-4 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Sign Up</button></form>{notice && <p role="status" className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-center text-sm text-blue-700">{notice}</p>}<div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs font-medium text-slate-400">OR</span><span className="h-px flex-1 bg-slate-200" /></div><div className="space-y-3"><SocialButton icon={<GoogleIcon />} onClick={showUpcoming}>Continue with Google</SocialButton><SocialButton icon={<GitHubIcon />} onClick={showUpcoming}>Continue with GitHub</SocialButton></div><p className="mt-7 text-center text-sm text-slate-500">Already have an account? <Link href="/login" className="font-semibold text-slate-900 underline underline-offset-2">Log in</Link></p></div></section>
  </main>;
}

function SocialButton({ icon, children, onClick }) {
  return <button type="button" onClick={onClick} className="relative flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"><span className="absolute left-3.5 grid place-items-center">{icon}</span>{children}</button>;
}
