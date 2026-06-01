import { NextRequest, NextResponse } from 'next/server'

// Step 1 of the Decap CMS GitHub OAuth handshake: send the editor to GitHub to
// authorise, then GitHub redirects back to /api/callback.
export const dynamic = 'force-dynamic'

export function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  if (!clientId) {
    return new NextResponse('Missing GITHUB_OAUTH_CLIENT_ID', { status: 500 })
  }

  const origin = new URL(req.url).origin
  const authorize = new URL('https://github.com/login/oauth/authorize')
  authorize.searchParams.set('client_id', clientId)
  authorize.searchParams.set('redirect_uri', `${origin}/api/callback`)
  authorize.searchParams.set('scope', 'repo')
  authorize.searchParams.set('state', crypto.randomUUID())

  return NextResponse.redirect(authorize.toString())
}
