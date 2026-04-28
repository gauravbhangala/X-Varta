/**
 * Supabase Connection Test
 * Run this to verify your Supabase connection is working
 */

import { createClient } from '@supabase/supabase-js'

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...\n')

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  console.log('📝 Environment Variables Check:')
  console.log(`   ✓ NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`)
  console.log(`   ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`)
  console.log(`   ✓ SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}\n`)

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing required environment variables!')
    return false
  }

  try {
    // Create client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase client created successfully\n')

    // Test connection by querying a table (assuming auth_sessions table exists)
    console.log('🌐 Testing database connection...')
    const { data, error } = await supabase
      .from('auth_sessions')
      .select('count(*)', { count: 'exact', head: true })

    if (error) {
      console.error(`❌ Database query failed:`, error.message)
      return false
    }

    console.log('✅ Database connection successful!\n')

    // Test authentication
    console.log('🔐 Testing authentication...')
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError && authError.message !== 'Auth session missing!') {
      console.error(`⚠️  Auth check result:`, authError.message)
    } else {
      console.log(user ? '✅ User authenticated' : '✓ Auth ready (no session)\n')
    }

    console.log('✅ All tests passed! Your Supabase connection is working correctly.\n')
    return true
  } catch (error) {
    console.error('❌ Connection test failed:', error)
    return false
  }
}

testSupabaseConnection().then(success => {
  process.exit(success ? 0 : 1)
})
