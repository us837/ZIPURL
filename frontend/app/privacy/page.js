import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Privacy | ZIPURL',
  description: 'How ZIPURL handles URLs and browser storage in the pre-auth preview.',
};

export default function PrivacyPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Privacy" title="Privacy policy" body="This policy describes the current pre-auth preview. It is not legal advice and will be rewritten before a production launch with accounts." />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-bold text-white">What we store</h2>
          <p className="mt-2">When you shorten a URL, the destination is saved in PostgreSQL so redirects can work. The latest created link is also saved in your browser local storage so the dashboard can reload on this device.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white">What we do not store yet</h2>
          <p className="mt-2">We do not collect account passwords, OAuth tokens, or personal profiles. Login and sign-up forms do not submit identity data to a server.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white">Cookies and analytics</h2>
          <p className="mt-2">This preview does not set an authentication cookie and does not run third-party analytics. Click tracking is planned and will be disclosed here before it is enabled.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white">Contact</h2>
          <p className="mt-2">Privacy questions can be sent through the quote form.</p>
        </section>
      </div>
    </MarketingShell>
  );
}
