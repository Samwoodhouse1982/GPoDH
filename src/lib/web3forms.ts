// Web3Forms submission helper (https://web3forms.com).
//
// One shared access key powers every form on the site (contact + the three
// email-capture forms). They are told apart in the inbox by the `subject` field.
//
// The key lives in NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY — Web3Forms access keys are
// *public by design* (they sit in the client-side HTML), so exposing it via a
// NEXT_PUBLIC var is expected and safe. Set it in Vercel (Project → Settings →
// Environment Variables) and in `.env.local` for local dev, then redeploy.
//
// See HANDOFF §"Forms / Web3Forms" for the full setup walkthrough.

const ENDPOINT = 'https://api.web3forms.com/submit'

export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''

export type Web3FormsFields = Record<string, string | undefined>

/**
 * POST a set of fields to Web3Forms. Throws on misconfiguration or a failed
 * submission so callers can show an error state.
 */
export async function submitToWeb3Forms(fields: Web3FormsFields): Promise<void> {
  if (!WEB3FORMS_KEY) {
    throw new Error(
      'Web3Forms is not configured — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY (see HANDOFF).'
    )
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      from_name: 'GPODH website',
      ...fields,
    }),
  })

  const data = await res.json().catch(() => ({}) as { success?: boolean; message?: string })
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Submission failed (${res.status}). Please try again.`)
  }
}

/** Convenience wrapper for the email-capture forms. */
export function subscribeEmail(email: string): Promise<void> {
  return submitToWeb3Forms({
    subject: 'New GPODH subscriber',
    email,
    message: `New newsletter subscriber: ${email}`,
  })
}
