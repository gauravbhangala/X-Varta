import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Show what we have
    const diagnostics = {
      url_present: !!url,
      url_length: url?.length,
      url_format_check: url?.includes('supabase.co'),
      anonKey_present: !!anonKey,
      anonKey_length: anonKey?.length,
      anonKey_starts_with: anonKey?.substring(0, 20),
      environment: process.env.NODE_ENV,
    }

    // Try different auth endpoints
    let authTest = null
    if (url && anonKey) {
      try {
        const result = await fetch(`${url}/auth/v1/`, {
          method: 'GET',
          headers: {
            'apikey': anonKey,
            'Content-Type': 'application/json',
          },
        })
        authTest = {
          status: result.status,
          statusText: result.statusText,
          headers: Object.fromEntries(result.headers.entries()),
        }
      } catch (e) {
        authTest = { error: (e as Error).message }
      }
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      diagnostics,
      authTest,
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
