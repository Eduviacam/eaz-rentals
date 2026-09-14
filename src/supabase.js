import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yluwedamfpskxlujgocv.supabase.co'

const supabaseKey = 'sb_publishable_yXBzWoRojkVBb8t-CrBfkw_c13_PhO9'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)