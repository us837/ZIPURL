import Link from 'next/link';
import { CardGrid, MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Platform | ZIPURL',
  description: 'Create short links, QR Codes, and track what gets clicks.',
};

const items = [
  { title: 'Short links', body: 'Turn long destinations into shareable ZIPURL links with a copy-ready short URL.' },
  { title: 'QR Codes', body: 'Design a branded QR preview for print, packaging, and in-person campaigns.' },
  { title: 'Link dashboard', body: 'See destination, created time, and a performance panel as soon as a link is created.' },
  { title: 'Workspaces', body: 'A personal workspace is ready now. Team ownership arrives with authentication.' },
  { title: 'Custom domains', body: 'Plan branded back-halves and domains. The UI is live; DNS connection comes next.' },
  { title: 'API', body: 'POST /api/shorten creates a slug. GET /:slug redirects visitors to the original URL.' },
];

export default function PlatformPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Platform" title="Everything you need to share a smarter link" body="ZIPURL starts with shortening, QR design, and a local dashboard. Analytics, ownership, and custom domains are on the public product map." />
      <CardGrid items={items} />
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/create" className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-slate-950">Create a link</Link>
        <Link href="/pricing" className="rounded-lg border border-white/20 px-4 py-3 text-sm font-bold">See pricing</Link>
      </div>
    </MarketingShell>
  );
}
