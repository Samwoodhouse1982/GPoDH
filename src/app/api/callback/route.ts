import { NextRequest, NextResponse } from 'next/server'

// Step 2 of the Decap CMS GitHub OAuth handshake: exchange the code for an
// access token and hand it back to the Decap admin window via postMessage.
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get('code')
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET

  if (!code || !clientId || !clientSecret) {
    return new NextResponse('OAuth is not configured', { status: 500 })
  }

  let content: Record<string, string>
  let status: 'success' | 'error' = 'error'
  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })
    const data = (await res.json()) as { access_token?: string; error?: string }
    if (data.access_token) {
      status = 'success'
      content = { token: data.access_token, provider: 'github' }
    } else {
      content = { error: data.error || 'No access token returned' }
    }
  } catch {
    content = { error: 'Token exchange failed' }
  }

  // Decap listens for "authorization:github:<status>:<json>" on the opener.
  const message = `authorization:github:${status}:${JSON.stringify(content)}`
  const html = `<!doctype html><html><body><script>
  (function () {
    function receive(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener('message', receive, false);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
  </script><p>Completing sign-in…</p></body></html>`

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
