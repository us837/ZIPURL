'use client';

import { useState } from 'react';

export default function QuoteForm() {
  const [notice, setNotice] = useState('');

  const submit = (event) => {
    event.preventDefault();
    setNotice('Thanks. Quote routing is not connected yet — we will follow up when sales email is live.');
  };

  return (
    <form onSubmit={submit} className="mt-10 max-w-xl space-y-4 rounded-2xl border border-white/10 bg-white p-6 text-slate-900">
      <label className="block text-sm font-semibold">Work email
        <input required type="email" name="email" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <label className="block text-sm font-semibold">Company
        <input required type="text" name="company" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <label className="block text-sm font-semibold">What do you need?
        <textarea required name="message" rows="5" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
      </label>
      <button type="submit" className="rounded-lg bg-[#1458e9] px-4 py-3 text-sm font-bold text-white">Send request</button>
      {notice ? <p role="status" className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">{notice}</p> : null}
    </form>
  );
}
