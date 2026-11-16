export const MAX_FILE_SIZE = parseInt(
  process.env.MAX_FILE_SIZE_BYTES || '20971520',
  10
); // Default 20MB

export const DANGEROUS_EXTENSIONS = [
  'exe', 'bat', 'cmd', 'sh', 'php', 'vbs', 'ps1', 'jar', 'pif', 'com', 'scr', 'dll', 'msi', 'bin'
];

export const ALLOWED_MIME_PREFIXES = [
  'image/',
  'audio/',
  'video/',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument',
  'application/zip',
  'application/x-zip-compressed',
  'text/plain',
];

export function validateUploadFile(file: { name: string; size: number; type: string }): {
  isValid: boolean;
  error?: string;
} {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `حجم الملف يتجاوز الحد الأقصى المسموح (${Math.round(MAX_FILE_SIZE / (1024 * 1024))} ميجابايت)`,
    };
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  if (DANGEROUS_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: 'نوع الملف غير مسموح به لأسباب أمنية.',
    };
  }

  const isAllowedMime = ALLOWED_MIME_PREFIXES.some((prefix) =>
    file.type.toLowerCase().startsWith(prefix)
  );

  if (!isAllowedMime && file.type !== '') {
    return {
      isValid: false,
      error: 'صيغة الملف غير مدعومة. يرجى رفع صور، مستندات PDF، أو ملفات صوتية.',
    };
  }

  return { isValid: true };
}
