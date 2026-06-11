import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { LegalPage, LegalSection, LegalP, legalLinkStyle, legalListStyle } from '@/components/ui/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of Use for Global Perspectives on Digital Health: intellectual property, permitted use, guest contributions, disclaimers and liability.',
}

// ⚠️ Plain-English terms covering IP, branding/naming, guest & interviewee
// rights and image, third-party logos, permitted/prohibited use, disclaimers
// and liability for a podcast/content site. Have a qualified person review
// before relying on it; governing law is set to France (the publisher's base).

const mail = `mailto:${SITE.email}`

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The small print"
      title="Terms of use"
      lastUpdated="Last updated: June 2026"
      intro={
        <LegalP>
          These terms govern your use of the Global Perspectives on Digital
          Health website and its content (the &ldquo;Site&rdquo;). By browsing the
          Site, listening to or watching its episodes, or otherwise using it, you
          agree to these terms. If you don&rsquo;t agree, please don&rsquo;t use the Site.
        </LegalP>
      }
    >
      <LegalSection title="About the Site">
        <LegalP>
          Global Perspectives on Digital Health (&ldquo;GPODH&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is a podcast and content site published by Dr Shubhanan
          Upadhyay. It shares interviews, articles, audio, video and resources
          about digital health.
        </LegalP>
      </LegalSection>

      <LegalSection title="Ownership of content & intellectual property">
        <LegalP>
          All content on the Site — including the podcast episodes, audio and
          video recordings, transcripts, written text, articles, photographs,
          artwork, graphics, page design and the overall look and feel — is owned
          by GPODH / Dr Shubhanan Upadhyay, or used with permission of its
          rightful owner, and is protected by copyright and other intellectual
          property laws. Nothing on the Site transfers any ownership or licence to
          you except the limited permission to use it as set out below.
        </LegalP>
      </LegalSection>

      <LegalSection title="Name, branding & naming rights">
        <LegalP>
          The &ldquo;Global Perspectives on Digital Health&rdquo; and &ldquo;GPODH&rdquo;
          names, the logo, and the visual branding of the show are ours. You may
          not use our name, logo or branding — including in a way that suggests
          sponsorship, affiliation or endorsement — without our prior written
          permission.
        </LegalP>
      </LegalSection>

      <LegalSection title="Guests, contributors & interviewees">
        <LegalP>
          Views and opinions expressed by hosts, guests and contributors are
          their own. They do not necessarily reflect the views of GPODH, of any
          guest&rsquo;s employer or organisation, and are shared for general
          informational and educational purposes only.
        </LegalP>
        <LegalP>
          Guests and interviewees appear with their consent. Their contributions,
          name, voice, image and likeness remain associated with them and are used
          by GPODH to produce, publish and promote the relevant episode and the
          show. Guests retain their own rights in their underlying work and
          materials. If you appeared on the show and would like something
          corrected or removed, please contact us at{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a> and we&rsquo;ll deal
          with it promptly and in good faith.
        </LegalP>
      </LegalSection>

      <LegalSection title="Third-party names, logos & trademarks">
        <LegalP>
          Organisation names and logos shown on the Site (for example in the
          &ldquo;guests represent organisations including&rdquo; section) are the
          trademarks and property of their respective owners. They are used only
          to identify the organisations that guests are associated with, for
          illustrative and editorial purposes. Their appearance does not imply any
          affiliation with, sponsorship by, or endorsement from those
          organisations.
        </LegalP>
      </LegalSection>

      <LegalSection title="What you may do">
        <LegalP>You are welcome to:</LegalP>
        <ul style={legalListStyle}>
          <li>listen to and watch episodes for your own personal, non-commercial use;</li>
          <li>link to pages on the Site;</li>
          <li>share episodes using the sharing or embed features provided by the podcast and video platforms we publish on.</li>
        </ul>
      </LegalSection>

      <LegalSection title="What you may not do">
        <LegalP>Without our prior written permission, you must not:</LegalP>
        <ul style={legalListStyle}>
          <li>copy, reproduce, republish, re-host, distribute or publicly perform our content;</li>
          <li>edit, adapt, translate or create derivative works from it;</li>
          <li>use any content for commercial purposes;</li>
          <li>use our content (including transcripts and recordings) to train machine-learning or AI systems;</li>
          <li>scrape, data-mine or systematically extract content from the Site;</li>
          <li>remove or alter any copyright, trademark or other proprietary notices;</li>
          <li>use the Site in any unlawful way or in a way that could damage, disable or impair it.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Not professional advice">
        <LegalP>
          The Site discusses digital health, clinical and policy topics for
          general information and education only. It is not medical, clinical,
          legal, financial or other professional advice, and must not be relied on
          as such. Always seek advice from an appropriately qualified professional
          for your specific situation.
        </LegalP>
      </LegalSection>

      <LegalSection title="No warranties">
        <LegalP>
          The Site and its content are provided &ldquo;as is&rdquo;. While we aim for
          accuracy, we make no warranties that the content is complete, current or
          error-free, or that the Site will be uninterrupted or secure.
        </LegalP>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <LegalP>
          To the fullest extent permitted by law, GPODH and Dr Shubhanan Upadhyay
          will not be liable for any loss or damage arising from your use of, or
          reliance on, the Site or its content. Nothing in these terms excludes any
          liability that cannot be excluded under applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection title="Links to other sites">
        <LegalP>
          The Site links to third-party websites, resources and platforms (such as
          podcast apps, YouTube and external resources). We are not responsible for
          their content, availability or practices; following such links is at your
          own risk and subject to those sites&rsquo; own terms.
        </LegalP>
      </LegalSection>

      <LegalSection title="Reporting an IP or content concern">
        <LegalP>
          We respect others&rsquo; rights and aim to get things right. If you believe
          any content on the Site infringes your rights, or you have a concern about
          how you or your organisation is represented, contact us at{' '}
          <a href={mail} style={legalLinkStyle}>{SITE.email}</a> and we&rsquo;ll review
          it promptly.
        </LegalP>
      </LegalSection>

      <LegalSection title="Changes & governing law">
        <LegalP>
          We may update these terms or the Site&rsquo;s content from time to time; the
          date above shows when these terms last changed. These terms are governed
          by French law, and the French courts will have jurisdiction, except where
          mandatory consumer-protection law gives you other rights.
        </LegalP>
      </LegalSection>

      <LegalSection title="Contact">
        <LegalP>
          Questions about these terms, or want to request permission to use our
          content? Email <a href={mail} style={legalLinkStyle}>{SITE.email}</a>.
        </LegalP>
      </LegalSection>
    </LegalPage>
  )
}
