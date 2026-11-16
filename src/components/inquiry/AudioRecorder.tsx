'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Trash2, Play, Pause, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InquiryAttachment } from '@/types';

interface AudioRecorderProps {
  onAudioReady: (attachment: Partial<InquiryAttachment>) => void;
  onAudioRemoved: () => void;
  disabled?: boolean;
}

export function AudioRecorder({
  onAudioReady,
  onAudioRemoved,
  disabled = false,
}: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    setErrorMessage(null);
    setAudioUrl(null);
    setUploadSuccess(false);

    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setErrorMessage('المتصفح الحالي لا يدعم التسجيل الصوتي المباشر. يمكنك تسجيل الصوت بجهازك ورفعه كملف من خيار رفع الملفات.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Upload recorded audio to server
        await uploadRecordedAudio(audioBlob);

        // Stop all audio tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error('Audio permission error:', err);
      setErrorMessage('تعذر الوصول إلى الميكروفون. يرجى التأكد من منح الإذن للمتصفح.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    removeAudio();
  };

  const removeAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setIsPlaying(false);
    setDuration(0);
    setUploadSuccess(false);
    onAudioRemoved();
  };

  const togglePlayback = () => {
    if (!audioElementRef.current || !audioUrl) return;
    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const uploadRecordedAudio = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const file = new File([blob], `voice-recording-${Date.now()}.webm`, {
        type: 'audio/webm',
      });
      const formData = new FormData();
      formData.append('file', file);
      formData.append('isVoice', 'true');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل رفع التسجيل الصوتي.');
      }

      setUploadSuccess(true);
      onAudioReady({
        file_name: data.fileName,
        file_path: data.filePath,
        file_type: data.fileType,
        file_size: data.fileSize,
        is_voice_recording: true,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء رفع التسجيل';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-brand-dark-surface rounded-xl border border-brand-border dark:border-brand-dark-border p-4 space-y-3 transition-colors">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-brand-text dark:text-brand-dark-text flex items-center gap-1.5">
          <Mic className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
          <span>تسجيل رسالة صوتية لشرح فكرتك (اختياري)</span>
        </label>
        {isRecording && (
          <span className="text-xs font-bold text-red-600 animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            جاري التسجيل: {formatTimer(duration)}
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* State A: Idle - Start recording */}
      {!isRecording && !audioUrl && (
        <button
          type="button"
          onClick={startRecording}
          disabled={disabled}
          className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-indigo-200 dark:border-brand-dark-border hover:border-brand-primary dark:hover:border-brand-dark-primary bg-brand-subtle/50 dark:bg-brand-dark-bg/60 hover:bg-brand-subtle dark:hover:bg-brand-dark-bg text-brand-primary dark:text-brand-dark-primary text-xs font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Mic className="w-4 h-4 text-brand-primary dark:text-brand-dark-primary" />
          <span>اضغط هنا لبدء تسجيل صوتك</span>
        </button>
      )}

      {/* State B: Recording in progress */}
      {isRecording && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={stopRecording}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors shadow-xs"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>إنهاء وحفظ التسجيل</span>
          </button>
          <button
            type="button"
            onClick={cancelRecording}
            className="py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-brand-dark-border text-slate-700 dark:text-brand-dark-text text-xs font-semibold hover:bg-slate-200 dark:hover:bg-brand-dark-border/80 transition-colors"
          >
            إلغاء
          </button>
        </div>
      )}

      {/* State C: Recording complete - Audio preview and status */}
      {audioUrl && (
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-brand-dark-bg border border-slate-200 dark:border-brand-dark-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <audio
            ref={audioElementRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="w-9 h-9 rounded-full bg-brand-primary dark:bg-brand-dark-primary text-white flex items-center justify-center hover:bg-brand-primaryHover transition-colors"
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل التسجيل'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white mr-0.5" />}
            </button>
            <div>
              <p className="text-xs font-bold text-brand-text dark:text-brand-dark-text">
                تسجيلك الصوتي ({formatTimer(duration)})
              </p>
              <div className="text-[11px] text-brand-muted dark:text-brand-dark-muted flex items-center gap-1.5 mt-0.5">
                {isUploading ? (
                  <span className="text-brand-primary animate-pulse">جاري الرفع...</span>
                ) : uploadSuccess ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    تم الرفع والتجهيز
                  </span>
                ) : (
                  <span>جاهز للإرسال مع الطلب</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={removeAudio}
            disabled={disabled}
            className="text-xs text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 self-end sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>حذف التسجيل</span>
          </button>
        </div>
      )}
    </div>
  );
}
