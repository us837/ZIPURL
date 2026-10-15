import AppShell from '../components/AppShell';

export const metadata = {
  title: 'Analytics | ZIPURL',
};

const metrics = [
  ['Total engagements', '0'],
  ['Link clicks', '0'],
  ['QR scans', '0'],
  ['Unique visitors', '0'],
];

export default function AnalyticsPage() {
  return (
    <AppShell title="Search analytics...">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Click tracking is not recording yet. These cards are ready for real data.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([label, value]) => (
            <div key={label} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid h-56 place-items-center rounded-xl bg-white text-sm text-slate-500 shadow-sm">
          Charts appear here after redirect events are stored.
        </div>
      </div>
    </AppShell>
  );
}
