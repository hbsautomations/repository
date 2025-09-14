import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase URL or anon key');
}

// Create a single instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Helper function to check connection with timeout
export const checkSupabaseConnection = async () => {
  try {
    // Create a timeout promise that rejects after 5 seconds
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Connection timeout')), 5000);
    });

    // Race the Supabase query against the timeout
    const result = await Promise.race([
      (async () => {
        try {
          // Use the Supabase client to make a lightweight query
          // This will check if the connection is working
          const { error } = await supabase
            .from('newsletter_subscribers')
            .select('count(*)', { count: 'exact', head: true });
          
          // If there's no error, the connection is working
          return !error;
        } catch (err) {
          console.error('Supabase client operation failed:', err);
          return false;
        }
      })(),
      timeoutPromise
    ]);

    if (result === true) {
      console.log('Supabase connection successful');
      return true;
    } else {
      console.error('Supabase connection test failed');
      return false;
    }
  } catch (err) {
    console.error('Supabase connection test exception:', err);
    return false;
  }
};

// Wrapper for database operations that handles connection errors gracefully
export const safeDbOperation = async (operation: () => Promise<any>, fallback: any = null) => {
  try {
    const result = await operation();
    return result;
  } catch (error) {
    console.error('Database operation failed:', error);
    return fallback;
  }
};