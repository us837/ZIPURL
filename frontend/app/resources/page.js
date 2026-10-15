import Link from 'next/link';
import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Resources | ZIPURL',
  description: 'Help, legal pages, and product notes for ZIPURL.',
};

const links = [
  { href: '/help', title: 'Help center', body: 'How shortening, dashboards, and QR previews work today.' },
  { href: '/about', title: 'About ZIPURL', body: 'What this product is and what is still deferred.' },
  { href: '/privacy', title: 'Privacy policy', body: 'What we store in the browser versus PostgreSQL.' },
  { href: '/terms', title: 'Terms of use', body: 'Acceptable use for the public short-link service.' },
  { href: '/platform', title: 'Platform overview', body: 'Features that are live versus coming next.' },
  { href: '/quote', title: 'Contact', body: 'Request a quote or send a product question.' },
];

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Resources" title="Guides and policies" body="Use these pages while the public site is in pre-auth preview. Documentation will expand with authentication and analytics." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/30">
            <h2 className="font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
          </Link>
        ))}
      </div>
    </MarketingShell>
  );
}
