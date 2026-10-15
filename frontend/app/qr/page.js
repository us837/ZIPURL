'use client';

import AppShell from '../components/AppShell';
import QrDesigner from '../QrDesigner';

export default function QrPage() {
  return (
    <AppShell title="Search QR Codes...">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">QR Codes</h1>
        <p className="mt-1 text-sm text-slate-500">Design preview only. Encoded downloads are not generated yet.</p>
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
          <QrDesigner />
        </div>
      </div>
    </AppShell>
  );
}
