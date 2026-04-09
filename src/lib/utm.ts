/**
 * Appends UTM tracking parameters to an external URL.
 * utm_source is always 'gpodh', utm_medium is always 'website'.
 * Pass campaign (page name) and optionally content (link identifier).
 */
export function withUtm(
  url: string,
  params: { campaign?: string; content?: string } = {}
): string {
  try {
    const u = new URL(url)
    u.searchParams.set('utm_source', 'gpodh')
    u.searchParams.set('utm_medium', 'website')
    if (params.campaign) u.searchParams.set('utm_campaign', params.campaign)
    if (params.content) u.searchParams.set('utm_content', params.content)
    return u.toString()
  } catch {
    return url
  }
}
