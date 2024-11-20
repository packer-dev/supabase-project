import { createClient, SupabaseClient } from '@supabase/supabase-js';
import order from './order.service';

class SupabaseClientConfig {
  get client(): SupabaseClient {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SERVICE_ROLE;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL or Anon Key is not defined');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    return supabase;
  }
}

export const supabase = new SupabaseClientConfig().client;

export const useApi = () => {
  return {
    order,
  };
};
