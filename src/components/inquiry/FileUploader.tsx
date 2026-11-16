'use client';

import { useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Music, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InquiryAttachment } from '@/types';
import { formatBytes } from '@/lib/utils';
import { validateUploadFile, MAX_FILE_SIZE } from '@/lib/validations/upload';

interface FileUploaderProps {
  attachments: Partial<InquiryAttachment>[];
  onAttachmentsChange: (attachments: Partial<InquiryAttachment>[]) => void;
  disabled?: boolean;
}

export function FileUploader({
  attachments,
  onAttachmentsChange,
  disabled = false,
}: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMessage(null);

    // Limit maximum files to 5
    if (attachments.length + files.length > 5) {
      setErrorMessage('الحد الأقصى للمرفقات هو 5 ملفات فقط.');
      return;
    }

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const validation = validateUploadFile({
          name: file.name,
          size: file.size,
          type: file.type,
        });

        if (!validation.isValid) {
          throw new Error(validation.error || 'الملف غير صالح');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('isVoice', 'false');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || `فشل رفع الملف: ${file.name}`);
        }

        const newAttachment: Partial<InquiryAttachment> = {
          file_name: data.fileName,
          file_path: data.filePath,
          file_type: data.fileType,
          file_size: data.fileSize,
          is_voice_recording: false,
        };

        onAttachmentsChange([...attachments, newAttachment]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء رفع الملف';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
      // Reset input value
      e.target.value = '';
    }
  };

  const removeAttachment = (indexToRemove: number) => {
    const updated = attachments.filter((_, idx) => idx !== indexToRemove);
    onAttachmentsChange(updated);
  };

  const getFileIcon = (type = '') => {
    if (type.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-indigo-500" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4 text-amber-500" />;
    return <FileText className="w-4 h-4 text-slate-500" />;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-brand-text dark:text-brand-dark-text flex items-center gap-1.5">
          <Upload className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
          <span>إرفاق صور، مستندات، أو ملفات توضيحية (اختياري)</span>
        </label>
        <span className="text-[11px] text-brand-muted dark:text-brand-dark-muted">
          الحد الأقصى {Math.round(MAX_FILE_SIZE / (1024 * 1024))} ميجابايت للملف
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Upload Dropzone */}
      <div className="relative">
        <input
          type="file"
          id="file-upload-input"
          multiple
          disabled={disabled || isUploading || attachments.length >= 5}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          accept="image/*,audio/*,application/pdf,.doc,.docx,.zip"
        />

        <div className="w-full py-5 px-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-brand-dark-border hover:border-brand-primary dark:hover:border-brand-dark-primary bg-slate-50/70 dark:bg-brand-dark-surface/60 hover:bg-slate-50 dark:hover:bg-brand-dark-surface text-center transition-all flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-brand-dark-border shadow-xs flex items-center justify-center text-brand-muted dark:text-brand-dark-muted">
            <Upload className="w-5 h-5 text-brand-primary dark:text-brand-dark-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-brand-text dark:text-brand-dark-text">
              {isUploading
                ? 'جاري رفع الملفات الآن...'
                : 'اسحب الملفات هنا أو اضغط للاختيار من جهازك'}
            </p>
            <p className="text-[11px] text-brand-muted dark:text-brand-dark-muted mt-0.5">
              يدعم الصور (PNG, JPG)، ملفات PDF، المستندات، والتسجيلات
            </p>
          </div>
        </div>
      </div>

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="space-y-2 pt-2">
          {attachments.map((att, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-white dark:bg-brand-dark-surface border border-brand-border dark:border-brand-dark-border flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 truncate">
                {getFileIcon(att.file_type)}
                <div className="truncate">
                  <p className="font-semibold text-brand-text dark:text-brand-dark-text truncate">
                    {att.file_name}
                  </p>
                  <span className="text-[10px] text-brand-muted dark:text-brand-dark-muted">
                    {formatBytes(att.file_size || 0)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  تم الرفع
                </span>
                <button
                  type="button"
                  onClick={() => removeAttachment(idx)}
                  disabled={disabled}
                  className="p-1 text-slate-400 hover:text-red-600 rounded-md transition-colors"
                  aria-label="إزالة الملف"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
