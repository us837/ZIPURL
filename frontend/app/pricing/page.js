import Link from 'next/link';
import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Pricing | ZIPURL',
  description: 'Start free with ZIPURL. Paid plans are listed as product intent until billing is connected.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    note: 'No credit card',
    href: '/signup',
    cta: 'Sign up Free',
    features: ['5 short links / month', '3 custom back-halves / month', 'Unlimited link clicks', 'QR design preview', 'Local dashboard'],
  },
  {
    name: 'Pro',
    price: '$19',
    note: 'Coming with billing',
    href: '/quote',
    cta: 'Get a quote',
    features: ['Unlimited links', 'Custom domains', 'Click analytics', 'QR downloads', 'Link editing'],
  },
  {
    name: 'Business',
    price: 'Custom',
    note: 'Teams & SSO',
    href: '/quote',
    cta: 'Talk to sales',
    features: ['SAML SSO', 'Shared workspaces', 'Role permissions', 'SLA options', 'Priority support'],
  },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Pricing" title="Start free. Upgrade when you outgrow the preview." body="Paid checkout is not connected yet. The Free plan is the live public path: create a link, keep it in this browser, and open the dashboard." />
      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-semibold text-emerald-200">{plan.name}</p>
            <p className="mt-3 text-4xl font-black">{plan.price}<span className="ml-1 text-sm font-medium text-slate-400">{plan.price.startsWith('$') ? '/mo' : ''}</span></p>
            <p className="mt-1 text-sm text-slate-400">{plan.note}</p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-slate-300">
              {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
            </ul>
            <Link href={plan.href} className="mt-6 rounded-lg bg-white px-4 py-3 text-center text-sm font-bold text-slate-950">{plan.cta}</Link>
          </article>
        ))}
      </div>
    </MarketingShell>
  );
}
