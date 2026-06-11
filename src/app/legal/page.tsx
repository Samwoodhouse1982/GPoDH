import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { LegalPage, LegalSection, LegalP, legalLinkStyle } from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description:
    'Legal notice (mentions légales) for Global Perspectives on Digital Health: publisher, publication director and host.',
}

// ⚠️ French law (LCEN) requires a "mentions légales" page for a site published
// by someone resident in France. Confirm the details below with a qualified
// person before publishing — in particular:
//   • Vercel's exact current registered address + contact (see vercel.com/legal),
//   • SandiQ's registration number (SIREN/SIRET) and registered office,
//   • whether Shubs wishes to list a postal address (an individual running a
//     personal, non-commercial site can keep this minimal; once the site
//     promotes the SandiQ consulting it leans professional, which raises the
//     disclosure requirements — worth a quick legal check).

const mail = `mailto:${SITE.email}`

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Legal notice"
      intro={
        <LegalP>
          <em>Mentions légales.</em> This information is provided in accordance
          with French law (Loi pour la confiance dans l&rsquo;économie numérique).
        </LegalP>
      }
    >
      <LegalSection title="Site publisher">
        <LegalP>
          Global Perspectives on Digital Health is a personal podcast and content
          site published by <strong>Dr Shubhanan Upadhyay</strong>, based in
          France. Contact: <a href={mail} style={legalLinkStyle}>{SITE.email}</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Publication director">
        <LegalP>Dr Shubhanan Upadhyay.</LegalP>
      </LegalSection>

      <LegalSection title="Hosting">
        <LegalP>
          The site is hosted by <strong>Vercel Inc.</strong>,{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={legalLinkStyle}>vercel.com</a>{' '}
          — 340 S Lemon Ave #4133, Walnut, CA 91789, United States.
          {' '}<span style={{ color: 'var(--text-muted)' }}>[Confirm Vercel&rsquo;s current registered address and contact at vercel.com/legal before publishing.]</span>
        </LegalP>
      </LegalSection>

      <LegalSection title="Consulting services">
        <LegalP>
          This is a personal, non-commercial site. Any professional consulting
          services referenced are provided separately by{' '}
          <strong>SandiQ</strong>, a business registered in France{' '}
          <span style={{ color: 'var(--text-muted)' }}>[registration number (SIREN/SIRET) and registered office to be added]</span>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <LegalP>
          The content of this site is protected. Please see our{' '}
          <a href="/terms" style={legalLinkStyle}>Terms of Use</a> for details on
          ownership and permitted use, and our{' '}
          <a href="/privacy" style={legalLinkStyle}>Privacy &amp; Cookies</a> notice
          for how personal data is handled.
        </LegalP>
      </LegalSection>

      <LegalSection title="Contact">
        <LegalP>
          For any question about this notice, email{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a>.
        </LegalP>
      </LegalSection>
    </LegalPage>
  )
}
