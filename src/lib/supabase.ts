import { createClient } from '@supabase/supabase-js';

// In Lovable's native Supabase integration, check multiple possible env var names
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_PROJECT_URL ||
  import.meta.env.SUPABASE_PROJECT_URL;

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY ||
  import.meta.env.SUPABASE_ANON_PUBLIC_KEY;

// Create client with fallback values to prevent crashes
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'placeholder-key';

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey
);

// Export a helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseAnonKey);

// Log configuration status
console.log('Supabase configured:', isSupabaseConfigured());
if (!isSupabaseConfigured()) {
  console.warn('⚠️ Supabase not configured. Using fallback values.');
  console.log('Please check your Supabase integration in Lovable.');
}

export type Animal = {
  id: string;
  name: string;
  species: string;
  age?: number;
  story?: string;
  photo_url?: string;
  sponsor_status: 'available' | 'pending' | 'sponsored';
  sponsor_name?: string;
  created_at: string;
  updated_at: string;
};