import type { Metadata } from 'next'
import content from '@/data/site/contact.json'

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: content.title.replace(/\.$/, ''),
  description:
    'Get in touch with Global Perspectives on Digital Health — pitch a guest, discuss a partnership, or enquire about consulting.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
