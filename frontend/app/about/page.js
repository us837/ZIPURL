import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'About | ZIPURL',
  description: 'ZIPURL is a URL shortener with a Next.js frontend and Express backend.',
};

export default function AboutPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="About" title="A short-link product you can actually ship" body="ZIPURL is a Next.js frontend plus an Express, PostgreSQL, and Redis backend. Authentication is deferred on purpose so the public flow can launch first." />
      <div className="mt-10 max-w-2xl space-y-4 text-sm leading-7 text-slate-300">
        <p>Create a short link, store the latest result in this browser, and open a dashboard. Login and sign-up screens exist so the website is complete; they are not connected to an identity provider yet.</p>
        <p>Redirects are handled by the API host. The marketing site can live on Vercel while PostgreSQL lives on Neon and the Express service lives on Render.</p>
      </div>
    </MarketingShell>
  );
}
