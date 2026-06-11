import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { LegalPage, LegalSection, LegalP, legalLinkStyle, legalListStyle } from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description:
    'Legal notice (mentions légales) for Global Perspectives on Digital Health: publisher, publication director and host.',
}

// French law (LCEN) requires a "mentions légales" page for a site published by
// someone resident in France. Publisher/host/SandiQ details below were provided
// from shubs.me/legal. Still worth a final legal check on whether this personal
// site should itself be treated as commercial (it promotes SandiQ consulting),
// which can raise the disclosure requirements.

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
          The site is hosted by <strong>Vercel Inc.</strong>, 340 Pine Street,
          Suite 700, San Francisco, CA 94104, United States —{' '}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={legalLinkStyle}>vercel.com</a>.
        </LegalP>
      </LegalSection>

      <LegalSection title="Consulting services">
        <LegalP>
          This is a personal, non-commercial site. Any professional consulting
          services referenced are provided separately by{' '}
          <strong>SandiQ Global</strong>, a Société par Actions Simplifiée
          Unipersonnelle (SASU) registered in France:
        </LegalP>
        <ul style={legalListStyle}>
          <li>Registered office: 3 rue Aurélien Scholl, étage 0, 33000 Bordeaux, France</li>
          <li>SIRET: 944 095 322 00011</li>
          <li>RCS: Bordeaux 944 095 322</li>
          <li>Share capital: €1</li>
          <li>Intra-community VAT: FR50 944 095 322</li>
          <li>APE/NAF code: 70.22Z (business and management consultancy)</li>
        </ul>
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
