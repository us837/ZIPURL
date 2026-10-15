import { MarketingShell, PageIntro } from '../components/SiteChrome';

export const metadata = {
  title: 'Terms | ZIPURL',
  description: 'Terms of use for the ZIPURL public preview.',
};

export default function TermsPage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Terms" title="Terms of use" body="By creating a short link you agree to use ZIPURL for lawful destinations only. This preview can change or go offline without notice." />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-slate-300">
        <section>
          <h2 className="text-lg font-bold text-white">Acceptable use</h2>
          <p className="mt-2">Do not shorten links used for malware, phishing, spam, or content you do not have rights to distribute. We may delete URLs that break these rules.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white">Service limits</h2>
          <p className="mt-2">The API may rate-limit shorten requests. Free-tier numbers shown on pricing are product intent and may be enforced later.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white">No warranty</h2>
          <p className="mt-2">The public preview is provided as-is. Short links may change, sleep on free hosting, or be removed while the product is still being built.</p>
        </section>
      </div>
    </MarketingShell>
  );
}
