import { NextRequest, NextResponse } from 'next/server';
import { getSignedFileUrl } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'مسار الملف مطلوب' }, { status: 400 });
    }

    const signedUrl = await getSignedFileUrl(filePath, 300); // 5 minutes valid

    if (!signedUrl) {
      return NextResponse.json(
        { error: 'تعذر إنشاء رابط تحميل آمن للملف، يرجى التأكد من إعدادات التخزين.' },
        { status: 404 }
      );
    }

    return NextResponse.redirect(signedUrl);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
