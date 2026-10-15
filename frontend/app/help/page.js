import Link from 'next/link';
import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Help | ZIPURL',
  description: 'How to create a ZIPURL short link and open the dashboard.',
};

const faqs = [
  { q: 'How do I create a short link?', a: 'Paste a URL on the home page or on /create. ZIPURL calls POST /api/shorten and returns a slug.' },
  { q: 'Where is my dashboard data stored?', a: 'The most recent link is saved in this browser under zipurl:last-link. It is not yet tied to an account.' },
  { q: 'Why did a redirect fail?', a: 'Short URLs resolve on the API host, not on the Next.js domain. The backend must be running.' },
  { q: 'Can I download a QR Code?', a: 'Not yet. The QR tab is a design preview. Encoding and download are planned.' },
  { q: 'When will login work?', a: 'Email, Google, GitHub, and SAML controls are visual. Auth is the next product milestone.' },
];

export default function HelpPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Help" title="Common questions" body="This help center covers the pre-auth product. Open a quote if you need something that is not listed." />
      <dl className="mt-10 space-y-4">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <dt className="font-bold">{item.q}</dt>
            <dd className="mt-2 text-sm leading-6 text-slate-300">{item.a}</dd>
          </div>
        ))}
      </dl>
      <Link href="/quote" className="mt-8 inline-flex text-sm font-semibold text-emerald-200 hover:text-white">Still stuck? Send a quote request →</Link>
    </MarketingShell>
  );
}
