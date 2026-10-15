'use client';

import Link from 'next/link';
import { useState } from 'react';
import AppShell from '../components/AppShell';

export default function SettingsPage() {
  const [notice, setNotice] = useState('');

  return (
    <AppShell title="Search settings...">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Workspace preferences are visual until accounts exist.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setNotice('Settings are not saved to a server yet.');
          }}
          className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm"
        >
          <label className="block text-sm font-semibold">Workspace name
            <input defaultValue="Personal Workspace" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-semibold">Default redirect
            <select className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm">
              <option>301 Permanent</option>
              <option>302 Temporary</option>
            </select>
          </label>
          <button type="submit" className="rounded-lg bg-[#0052ff] px-4 py-2.5 text-sm font-semibold text-white">Save changes</button>
          {notice ? <p role="status" className="text-sm text-blue-700">{notice}</p> : null}
        </form>
        <p className="mt-4 text-sm text-slate-500">Need an account? <Link href="/signup" className="font-semibold text-[#0052ff]">Sign up</Link></p>
      </div>
    </AppShell>
  );
}
