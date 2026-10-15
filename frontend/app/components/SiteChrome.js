import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
      <Link href="/" aria-label="ZIPURL home" className="shrink-0">
        <Image src="/zipurl-logo.svg" alt="ZIPURL" width={140} height={62} priority className="h-11 w-auto" />
      </Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium text-slate-300 lg:flex">
        <Link href="/platform" className="transition hover:text-white">Platform</Link>
        <Link href="/ai" className="transition hover:text-white">AI</Link>
        <Link href="/solutions" className="transition hover:text-white">Solutions</Link>
        <Link href="/pricing" className="transition hover:text-white">Pricing</Link>
        <Link href="/resources" className="transition hover:text-white">Resources</Link>
      </nav>
      <div className="flex items-center gap-2 text-sm font-semibold sm:gap-3">
        <Link href="/login" className="hidden rounded-lg px-2 py-2 text-white transition hover:text-slate-300 sm:block">Log in</Link>
        <Link href="/quote" className="hidden rounded-lg border border-slate-500/80 px-3 py-2 text-white transition hover:border-white hover:bg-white/5 sm:block">Get a Quote</Link>
        <Link href="/signup" className="rounded-lg bg-white px-3 py-2 text-slate-950 transition hover:bg-slate-200 sm:px-4">Sign up Free</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-7xl border-t border-white/10 px-5 py-10 sm:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-black tracking-tight">ZIP<span className="text-[#6ee7b7]">URL</span></p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">Short links, QR Codes, and click insights for creators and growth teams.</p>
        </div>
        <FooterCol title="Product" links={[['Platform', '/platform'], ['AI', '/ai'], ['Pricing', '/pricing'], ['Create a link', '/create']]} />
        <FooterCol title="Company" links={[['Solutions', '/solutions'], ['About', '/about'], ['Get a quote', '/quote'], ['Help', '/help']]} />
        <FooterCol title="Legal" links={[['Privacy', '/privacy'], ['Terms', '/terms'], ['Resources', '/resources'], ['Log in', '/login']]} />
      </div>
      <p className="mt-10 text-xs text-slate-500">© ZIPURL. Pre-auth public preview.</p>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-slate-400">
        {links.map(([label, href]) => (
          <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function MarketingShell({ children }) {
  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#071329] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_84%_8%,rgba(35,95,217,0.18),transparent_22rem),radial-gradient(circle_at_14%_92%,rgba(12,96,120,0.17),transparent_25rem)]" />
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-8 sm:px-8 sm:pt-12">{children}</div>
      <SiteFooter />
    </main>
  );
}

export function PageIntro({ kicker, title, body }) {
  return (
    <div className="max-w-3xl">
      {kicker ? <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">{kicker}</p> : null}
      <h1 className="text-4xl font-black tracking-[-0.045em] sm:text-5xl">{title}</h1>
      {body ? <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{body}</p> : null}
    </div>
  );
}

export function CardGrid({ items }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
