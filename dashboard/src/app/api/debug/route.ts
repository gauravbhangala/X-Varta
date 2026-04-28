import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Decode JWT to see expiry
    const decodeJWT = (token: string) => {
      try {
        const parts = token.split('.')
        if (parts.length !== 3) return null
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())
        return payload
      } catch (_e) {
        return null
      }
    }

    const anonPayload = decodeJWT(anonKey || '')
    const servicePayload = decodeJWT(serviceKey || '')

    const now = Math.floor(Date.now() / 1000)

    return NextResponse.json({
      status: 'info',
      url,
      anonKey: {
        payload: anonPayload,
        isExpired: anonPayload?.exp ? anonPayload.exp < now : null,
        expiresIn: anonPayload?.exp ? anonPayload.exp - now : null,
      },
      serviceKey: {
        payload: servicePayload,
        isExpired: servicePayload?.exp ? servicePayload.exp < now : null,
        expiresIn: servicePayload?.exp ? servicePayload.exp - now : null,
      },
      currentTimestamp: now,
    })
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
