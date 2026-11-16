import { NextRequest, NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase/admin';
import { validateUploadFile } from '@/lib/validations/upload';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const isVoice = formData.get('isVoice') === 'true';

    if (!file) {
      return NextResponse.json(
        { error: 'لم يتم إرسال أي ملف.' },
        { status: 400 }
      );
    }

    // Server-side validation of size and type
    const validation = validateUploadFile({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const adminClient = getAdminClient();
    const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'inquiry-attachments';
    
    // Generate safe, unpredictable path
    const fileExt = file.name.split('.').pop() || 'bin';
    const randomId = crypto.randomUUID();
    const safeStoragePath = `uploads/${new Date().getFullYear()}/${randomId}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    if (adminClient) {
      const { error: uploadError } = await adminClient.storage
        .from(bucket)
        .upload(safeStoragePath, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        });

      if (uploadError) {
        console.error('[Upload] Storage bucket error:', uploadError);
        return NextResponse.json(
          { error: 'فشل رفع الملف إلى وحدة التخزين الآمنة.' },
          { status: 500 }
        );
      }
    } else {
      console.warn('[Upload] Supabase Storage not configured. File validated in mock mode.');
    }

    return NextResponse.json({
      success: true,
      filePath: safeStoragePath,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      isVoiceRecording: isVoice,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error';
    console.error('[Upload] Server error:', message);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع أثناء معالجة الملف.' },
      { status: 500 }
    );
  }
}
