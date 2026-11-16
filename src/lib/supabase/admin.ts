import { createClient } from '@supabase/supabase-js';

export function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || serviceRoleKey === 'dummy-service-key') {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('dummy') && !key.includes('dummy'));
}

/**
 * Generate a short-lived signed URL for an authorized admin to view/download private customer files
 */
export async function getSignedFileUrl(filePath: string, expiresInSeconds = 3600): Promise<string | null> {
  const adminClient = getAdminClient();
  if (!adminClient) return null;

  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'inquiry-attachments';
  const { data, error } = await adminClient.storage
    .from(bucket)
    .createSignedUrl(filePath, expiresInSeconds);

  if (error || !data) {
    console.error('Error generating signed URL:', error);
    return null;
  }

  return data.signedUrl;
}
