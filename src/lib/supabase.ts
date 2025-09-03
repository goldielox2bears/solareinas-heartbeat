import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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