import Link from 'next/link';
import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'AI | ZIPURL',
  description: 'Upcoming ZIPURL AI tools for titles, tags, and campaign copy.',
};

export default function AiPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="ZIPURL AI" title="Ask ZIPURL to draft, tag, and summarize campaigns" body="AI is a product preview. Authentication and click data need to land first so suggestions can be based on your real links." />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {[
          ['Link titles', 'Generate a readable title from a long destination URL.'],
          ['Campaign tags', 'Suggest UTM-style tags for launches, bios, and ads.'],
          ['QR copy', 'Draft a short call to action that sits under a printed QR Code.'],
          ['Click summaries', 'Explain which destinations are winning once analytics are live.'],
        ].map(([title, body]) => (
          <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-slate-400">The dashboard “Ask AI” control is visual until this layer is connected.</p>
      <Link href="/signup" className="mt-6 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950">Join the waitlist</Link>
    </MarketingShell>
  );
}
