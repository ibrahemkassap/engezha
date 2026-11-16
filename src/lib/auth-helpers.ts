import { createServerSupabaseClient } from './supabase/server';
import { getAdminClient } from './supabase/admin';
import { UserProfile } from '@/types';
export { sanitizeRedirectUrl } from './url-helpers';

/**
 * Get current authenticated user and their profile on the server side
 */
export async function getCurrentUserProfile(): Promise<{
  user: { id: string; email?: string } | null;
  profile: UserProfile | null;
}> {
  try {
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { user: null, profile: null };
    }

    const user = {
      id: session.user.id,
      email: session.user.email,
    };

    // Attempt to fetch profile from database
    const admin = getAdminClient();
    const clientToUse = admin || supabase;

    const { data: profile } = await clientToUse
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      return { user, profile: profile as UserProfile };
    }

    // Fallback if trigger hasn't fired yet or in offline mode
    const fallbackProfile: UserProfile = {
      id: user.id,
      full_name: session.user.user_metadata?.full_name || '',
      phone: session.user.user_metadata?.phone || '',
      email: user.email || '',
    };

    return { user, profile: fallbackProfile };
  } catch (err) {
    console.error('[Auth Helper] Error getting profile:', err);
    return { user: null, profile: null };
  }
}
