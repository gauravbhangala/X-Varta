import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anonKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing Supabase credentials',
      }, { status: 400 })
    }

    // Test 1: Check if Supabase URL is reachable
    const urlResponse = await fetch(`${url}/rest/v1/`)
      .catch(() => ({ ok: false, status: 0 }))

    // Test 2: Check auth with the anon key
    const authResponse = await fetch(`${url}/auth/v1/`, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
    }).catch(() => ({ ok: false, status: 0 }))

    const isConnected = authResponse.ok || authResponse.status === 404

    return NextResponse.json({
      status: isConnected ? 'success' : 'error',
      message: isConnected ? '✅ Supabase is reachable and JWT-based keys are working!' : '❌ Cannot reach Supabase',
      urlReachable: urlResponse.ok || urlResponse.status > 0,
      authStatus: authResponse.status,
      timestamp: new Date().toISOString(),
    }, { status: isConnected ? 200 : 503 })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Connection test failed',
    }, { status: 500 })
  }
}
