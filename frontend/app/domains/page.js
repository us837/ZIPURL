import Link from 'next/link';
import AppShell from '../components/AppShell';

export const metadata = {
  title: 'Custom domains | ZIPURL',
};

export default function DomainsPage() {
  return (
    <AppShell title="Search domains...">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">Custom domains</h1>
        <p className="mt-1 text-sm text-slate-500">Point a branded host at ZIPURL later. DNS connection is not live in this preview.</p>
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <label className="text-sm font-semibold text-slate-700">Domain
            <input disabled placeholder="links.yourbrand.com" className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" />
          </label>
          <p className="mt-3 text-sm text-slate-500">You will add a CNAME to the Render API host after custom domains ship.</p>
          <Link href="/quote" className="mt-5 inline-flex rounded-lg bg-[#0052ff] px-4 py-2.5 text-sm font-semibold text-white">Request early access</Link>
        </div>
      </div>
    </AppShell>
  );
}
