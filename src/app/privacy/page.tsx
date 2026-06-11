import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { LegalPage, LegalSection, LegalP, legalLinkStyle, legalListStyle } from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy & Cookies',
  description:
    'How Global Perspectives on Digital Health handles your data: what we collect, the legal basis, who processes it, and your rights under GDPR.',
}

// ⚠️ Plain-English draft written to reflect how the site actually works today.
// Have it reviewed by a qualified person (ideally familiar with French/EU law,
// since the publisher is based in France) before relying on it, and keep it in
// sync whenever the site's data practices change (new tools, analytics, etc.).
//
// Processors listed reflect the current stack: Web3Forms (form delivery),
// Vercel (hosting + cookieless analytics), Substack (newsletter), YouTube &
// Transistor (embedded media), and Google Workspace (organising enquiries in a
// spreadsheet). We do NOT use Google Analytics — analytics is Vercel's
// cookieless product. Remove Google Workspace below if enquiries are not stored
// in Google Sheets/Drive.

const mail = `mailto:${SITE.email}`

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="The small print"
      title="Privacy & cookies"
      lastUpdated="Last updated: June 2026"
      intro={
        <LegalP>
          We make a podcast about doing digital health ethically, so we try to
          practise what we preach: this site collects as little personal data as
          it can, uses no advertising or tracking cookies, and never sells your
          information. This notice explains what we do collect, why, and the
          rights you have under the EU/UK General Data Protection Regulation (GDPR).
        </LegalP>
      }
    >
      <LegalSection title="Who is responsible for your data">
        <LegalP>
          Global Perspectives on Digital Health (&ldquo;GPODH&rdquo;, &ldquo;we&rdquo;) is a
          personal podcast and content site published by Dr Shubhanan Upadhyay,
          based in France. For data-protection purposes he is the
          &ldquo;data controller&rdquo;. You can reach us at{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a> for anything in
          this notice.
        </LegalP>
      </LegalSection>

      <LegalSection title="What we collect, why, and our legal basis">
        <LegalP>
          <strong>When you use the contact form:</strong> your name, email
          address, organisation (optional) and message. We use this only to read
          and reply to you. Legal basis: our legitimate interest in responding to
          enquiries (and yours in getting a reply).
        </LegalP>
        <LegalP>
          <strong>When you subscribe for updates:</strong> your email address. We
          use it to let you know about new episodes. Legal basis: your consent,
          which you can withdraw at any time.
        </LegalP>
        <LegalP>
          <strong>When you simply browse:</strong> anonymous, aggregated usage
          statistics (such as which pages are popular) via Vercel&rsquo;s
          cookieless analytics. This does not identify you or track you across
          other websites. Legal basis: our legitimate interest in understanding
          and improving the site. We do <strong>not</strong> use Google Analytics
          or any advertising trackers.
        </LegalP>
      </LegalSection>

      <LegalSection title="Who else processes your data">
        <LegalP>
          We use a small number of trusted service providers (&ldquo;processors&rdquo;)
          who handle data on our behalf, under contract and only on our
          instructions:
        </LegalP>
        <ul style={legalListStyle}>
          <li><strong>Vercel</strong> — hosts the website and provides the cookieless analytics and performance measurements.</li>
          <li><strong>Web3Forms</strong> — delivers contact-form and subscribe submissions to our inbox.</li>
          <li><strong>Google (Google Workspace)</strong> — we may store and organise enquiry and subscriber details (e.g. in a spreadsheet) to manage and respond to them.</li>
          <li><strong>Substack</strong> — if/when we send a newsletter, it manages the mailing list and delivery.</li>
          <li><strong>YouTube (Google)</strong> and <strong>Transistor</strong> — serve the embedded video and audio players (see Cookies below).</li>
        </ul>
        <LegalP>
          We never sell or rent your personal data, and we don&rsquo;t share it for
          anyone else&rsquo;s marketing.
        </LegalP>
      </LegalSection>

      <LegalSection title="International transfers">
        <LegalP>
          Some of these providers (for example Vercel, Web3Forms and Google) are
          based in, or store data in, the United States. Where your data is
          transferred outside the European Economic Area, it is protected by
          appropriate safeguards such as the European Commission&rsquo;s Standard
          Contractual Clauses and/or the EU–US Data Privacy Framework.
        </LegalP>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <LegalP>
          We keep enquiry messages only as long as needed to deal with them and
          for a reasonable period afterwards in case you follow up. We keep
          subscriber emails until you unsubscribe or ask us to remove you.
          Analytics data is aggregated and anonymous.
        </LegalP>
      </LegalSection>

      <LegalSection title="Cookies">
        <LegalP>
          This site sets <strong>no cookies of its own</strong> — no tracking
          pixels, no advertising identifiers, no fingerprinting — and the
          analytics are cookieless.
        </LegalP>
        <LegalP>
          Some pages embed third-party players: YouTube (in privacy-enhanced
          &ldquo;no-cookie&rdquo; mode) and Transistor (our podcast audio host). These
          may set their own cookies <strong>if and when you choose to play a
          video or audio clip</strong>, at which point that provider&rsquo;s privacy
          policy applies. Until you press play there is nothing to consent to,
          which is why we don&rsquo;t show a cookie banner.
        </LegalP>
      </LegalSection>

      <LegalSection title="Your rights">
        <LegalP>
          Under GDPR you can ask us to: confirm what personal data we hold about
          you and get a copy; correct anything inaccurate; delete it (for
          example, to be removed from the update list); restrict or object to how
          we use it; or receive it in a portable format. Where we rely on your
          consent, you can withdraw it at any time. Just email{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a> and we&rsquo;ll
          sort it out, usually within a few days.
        </LegalP>
        <LegalP>
          If you&rsquo;re not happy with how we&rsquo;ve handled your data, you have the
          right to complain to a data-protection authority — in France this is
          the CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={legalLinkStyle}>cnil.fr</a>).
        </LegalP>
      </LegalSection>

      <LegalSection title="Children">
        <LegalP>
          This site is intended for professionals and a general adult audience;
          it is not directed at children, and we don&rsquo;t knowingly collect
          data from them.
        </LegalP>
      </LegalSection>

      <LegalSection title="Changes & contact">
        <LegalP>
          We may update this notice as the site evolves; the date at the top
          shows when it last changed. Questions, or want your data corrected or
          deleted? Email{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a>.
        </LegalP>
      </LegalSection>
    </LegalPage>
  )
}
