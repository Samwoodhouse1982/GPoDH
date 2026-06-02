import { NextResponse } from 'next/server'

// Temporary diagnostic for the Decap CMS GitHub OAuth setup. Reveals only
// whether the expected env vars are present (booleans, never values) and which
// Vercel environment is serving the request. Safe to delete once login works.
export const dynamic = 'force-dynamic'

export function GET() {
  // Names only (never values) of env vars that look related — reveals typos
  // like GITHUB_CLIENT_ID or a trailing space, or shows [] if none are present.
  const matchingKeys = Object.keys(process.env)
    .filter((k) => /(GITHUB|OAUTH|CLIENT)/i.test(k))
    .sort()

  return NextResponse.json({
    clientIdSet: Boolean(process.env.GITHUB_OAUTH_CLIENT_ID),
    clientSecretSet: Boolean(process.env.GITHUB_OAUTH_CLIENT_SECRET),
    clientIdLength: (process.env.GITHUB_OAUTH_CLIENT_ID || '').trim().length,
    matchingKeys,
    vercelEnv: process.env.VERCEL_ENV || null,
    vercelUrl: process.env.VERCEL_URL || null,
  })
}
