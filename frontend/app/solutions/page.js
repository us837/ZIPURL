import Link from 'next/link';
import { CardGrid, MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Solutions | ZIPURL',
  description: 'ZIPURL for creators, startups, and growth teams.',
};

const items = [
  { title: 'Creators', body: 'Put one short link in bios, newsletters, and videos. Swap the destination later from the dashboard.' },
  { title: 'Startups', body: 'Ship campaign URLs without waiting on a marketing site deploy.' },
  { title: 'Growth teams', body: 'Track which creative actually gets clicks once analytics are enabled.' },
  { title: 'In-person events', body: 'Pair a short link with a QR Code on badges, posters, and packaging.' },
  { title: 'Support and docs', body: 'Share cleaner help URLs that still resolve to deep documentation pages.' },
  { title: 'Agencies', body: 'Quote a branded workspace for clients. Billing and SSO are not connected yet.' },
];

export default function SolutionsPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Solutions" title="Built for people who ship links every week" body="Use ZIPURL today to shorten and preview. Team features stay visible so the public site already matches the product you are heading toward." />
      <CardGrid items={items} />
      <Link href="/quote" className="mt-10 inline-flex rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950">Talk to us</Link>
    </MarketingShell>
  );
}
