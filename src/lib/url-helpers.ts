/**
 * Validates redirect destination to prevent open-redirect vulnerabilities.
 * Client and server safe utility.
 */
export function sanitizeRedirectUrl(url: string | null | undefined, defaultUrl = '/projects'): string {
  if (!url) return defaultUrl;
  // Must start with a single slash, not double slash (protocol-relative) and no backslash
  if (url.startsWith('/') && !url.startsWith('//') && !url.includes('\\')) {
    return url;
  }
  return defaultUrl;
}
