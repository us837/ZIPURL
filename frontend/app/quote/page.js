import { MarketingShell, PageIntro } from '../components/SiteChrome';
import QuoteForm from './QuoteForm';

export const metadata = {
  title: 'Get a quote | ZIPURL',
  description: 'Request a ZIPURL quote for teams, custom domains, or higher volume.',
};

export default function QuotePage() {
  return (
    <MarketingShell>
      <PageIntro kicker="Sales" title="Get a quote" body="Tell us about your team, volume, or custom domain needs. This form is visible and usable; it does not send email until a provider is connected." />
      <QuoteForm />
    </MarketingShell>
  );
}
