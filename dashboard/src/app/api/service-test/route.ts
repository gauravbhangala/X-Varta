import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !serviceKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing Supabase credentials',
      }, { status: 400 })
    }

    // Use Service Role Key (has more permissions)
    const supabase = createClient(url, serviceKey)

    // Try to get server version or any simple query
    const { data, error } = await supabase.rpc('now').single()

    if (error) {
      return NextResponse.json({
        status: 'partial-success',
        message: 'Service Role Key connected, but RPC failed',
        error: error.message,
        errorCode: error.code,
        note: 'If "function does not exist" - that means auth worked!',
      })
    }

    return NextResponse.json({
      status: 'success',
      message: '✅ Supabase Service Role Key WORKS!',
      data,
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}
