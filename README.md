# انجزها | ENGEZHA
> **"فكرتك تستاهل تتنفذ باحتراف"**
> *"اختار نموذج يلهمك، أو احكيلنا فكرتك ونبني لك تجربة رقمية على مقاسك."*

---

## 01. نظرة عامة على المشروع (Product Vision)
**انجزها (ENGEZHA)** هي منصة رقمية عربية متكاملة لاستعراض النماذج البرمجية والمشاريع الرقمية وتحويلها إلى طلبات تنفيذ مخصصة عالية التحويل.

### الميزات الجوهرية:
1. **كتالوج مشاريع متفاعل (`/projects`):** بحث فوري، تصفية بالتصنيف ونوع المشروع، وترتيب حسب الأحدث أو الأعلى تقييماً مع معلمات URL قابلة للمشاركة.
2. **صفحات تفاصيل المشاريع (`/projects/[slug]`):** استعراض معرض الصور والشاشات، التقنيات المستخدمة، التحديات والحلول، وتنويه شفاف للنماذج التوضيحية (Demo Projects).
3. **تقييمات وتعليقات مباشرة:** إمكانية تقييم المشروع من 1 إلى 5 نجوم وكتابة تعليق دون الحاجة لتسجيل حساب، مع تحديث مباشر للتقييمات عبر **Supabase Realtime**.
4. **نظام طلبات المشاريع الذكي (`/start-project`):**
   - **النمط الأول:** طلب مشروع مشابه لنموذج موجود مع الاحتفاظ بمعرف المشروع تلقائياً.
   - **النمط الثاني:** تصميم مشروع مخصص من الصفر.
   - إرفاق ملفات متعددة (صور، مستندات PDF، تسجيلات صوتية).
   - **تسجيل صوتي مباشر من المتصفح (In-browser Audio Recording)** عبر `MediaRecorder API` مع إمكانية الاستماع قبل الإرسال.
   - حفظ فوري للطلب وتوليد رقم مرجعي فريد (`ENG-2026-XXXX`).
5. **نظام إشعارات البريد الإلكتروني (Nodemailer SMTP):** إرسال إشعار فوري بكافة تفاصيل العميل والمرفقات إلى: `ibrahem.kassap@gmail.com`.
6. **لوحة تحكم إدارية محمية (`/admin`):**
   - تسجيل دخول آمن عبر **Supabase Auth**.
   - إحصائيات حقيقية مستخرجة من قاعدة البيانات دون أرقام وهمية.
   - إدارة كاملة للطلبات مع استعراض المرفقات وروابط تحميل موقعة مؤقتة (Signed URLs).
   - إمكانية تحديث حالات الطلبات وإضافة ملاحظات داخلية سرية.
   - إعادة إرسال الإشعارات البريدية المتعثرة بنقرة زر واحدة.
   - إدارة وتعديل الكتالوج والتصنيفات والرقابة على التعليقات.

---

## 02. الحزمة التقنية (Tech Stack)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling & Design System:** Tailwind CSS مع نظام ألوان وهوية مخصصة
- **Database & Auth & Storage:** Supabase (PostgreSQL + RLS Policies + Storage + Realtime)
- **Form & Server Validation:** Zod
- **Email Delivery:** Nodemailer (Configurable SMTP)
- **Icons:** Lucide React
- **Unit Testing:** Vitest (17 Tests Passing)
- **Typography:** Cairo (Google Fonts) مع دعم كامل وتوجيه عربي RTL أصيل (`dir="rtl"`)

---

## 03. هيكلية المشروع (Architecture)

```
engezha/
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql    # الجداول وسياسات الأمان RLS والفيوز و Realtime
│   └── seed.sql                      # التصنيفات الـ 8 والنماذج التوضيحية
├── public/
│   └── projects/                     # معاينات ورسومات الـ SVG التوضيحية للمشاريع
├── src/
│   ├── app/                          # مسارات Next.js App Router
│   │   ├── layout.tsx                # الهيكل العام ودعم RTL والخط العربي
│   │   ├── page.tsx                  # الصفحة الرئيسية
│   │   ├── projects/                 # الكتالوج وصفحات التفاصيل
│   │   ├── start-project/            # نموذج طلب وبدء المشروع
│   │   ├── how-it-works/             # منهجية وخطوات العمل
│   │   ├── privacy/                  # سياسة الخصوصية وسرية البيانات
│   │   ├── terms/                    # شروط الاستخدام
│   │   ├── not-found.tsx             # صفحة 404 مخصصة بالعربية
│   │   ├── robots.ts & sitemap.ts    # خريطة الموقع وتهيئة SEO
│   │   ├── admin/                    # لوحة الإدارة المحمية
│   │   └── api/                      # مسارات الـ API (Inquiries, Upload, Reviews, etc.)
│   ├── components/                   # المكونات القابلة لإعادة الاستخدام
│   ├── lib/                          # منطق الأعمال، التحقق، البريد، وقاعدة البيانات
│   └── types/                        # الأنواع وواجهات TypeScript
└── tests/                            # اختبارات الوحدة (Vitest)
```

---

## 04. خطوات التشغيل والإعداد المحلي (Quick Start)

### المتطلبات الأساسية:
- Node.js >= 18
- npm >= 9

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. إعداد المتغيرات البيئية:
انسخ ملف `.env.example` إلى `.env.local`:
```bash
cp .env.example .env.local
```

قم بملء المتغيرات:
```env
# Next.js Public App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=inquiry-attachments

# Email Notifications (Nodemailer SMTP)
NOTIFICATION_EMAIL_RECIPIENT=ibrahem.kassap@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=ibrahem.kassap@gmail.com
SMTP_PASS=your-google-app-password
SMTP_FROM="منصة انجزها" <ibrahem.kassap@gmail.com>

# File Upload Limits
MAX_FILE_SIZE_BYTES=20971520
MAX_ATTACHMENTS_COUNT=5
```

### 3. إعداد قاعدة بيانات Supabase:
1. أنشئ مشروعاً جديداً على [Supabase](https://supabase.com).
2. افتح **SQL Editor** ونفّذ ملف المايجريشن:
   `supabase/migrations/001_initial_schema.sql`
   (يقوم بإنشاء الجداول، سياسات Row-Level Security، تفعيل Supabase Realtime، وإنشاء View التقييمات).
3. نفّذ ملف البيانات الأولية:
   `supabase/seed.sql`
   (يقوم بإدخال الـ 8 تصنيفات والنماذج التوضيحية الموسومة بـ `is_demo = true`).
4. في قسم **Storage**، أنشئ Bucket خاص (Private Bucket) باسم:
   `inquiry-attachments`

### 4. إعداد بريد Gmail لإرسال الإشعارات:
لإرسال الإشعارات إلى `ibrahem.kassap@gmail.com` عبر حساب Gmail:
1. توجه إلى [Google Account Security](https://myaccount.google.com/security).
2. فعّل التحقق بخطوتين (2-Step Verification) إذا لم تكن مفعلة.
3. ابحث عن **App Passwords (كلمات مرور التطبيقات)**.
4. أنشئ كلمة مرور جديدة باسم "Engezha Platform" وانسخ الكود المكون من 16 حرفاً.
5. ضعه في متغير `SMTP_PASS` داخل ملف `.env.local`.

### 5. تشغيل بيئة التطوير:
```bash
npm run dev
```
افتح المتصفح على: `http://localhost:3000`

---

## 05. تشغيل الاختبارات وفحص الجودة

- **تشغيل اختبارات الوحدة (Unit Tests):**
  ```bash
  npm test
  ```
  *(تم اجتياز جميع الاختبارات الـ 17 بنجاح)*

- **فحص الكود والتنسيق (Linting):**
  ```bash
  npm run lint
  ```
  *(0 أخطاء و 0 تحذيرات)*

- **بناء حزمة الإنتاج (Production Build):**
  ```bash
  npm run build
  ```
  *(تم التحقق من توليد جميع المسارات الـ 28 بنجاح تام)*

---

## 06. إرشادات النشر على خوادم الإنتاج (Deployment Checklist)

1. **Vercel / Netlify / Node Server:**
   - ربط مستودع المشروع.
   - تعيين كافة المتغيرات البيئية الموجودة في `.env.example`.
2. **Supabase Production:**
   - التأكد من تطبيق مايجريشن `001_initial_schema.sql`.
   - التأكد من أن سلة التخزين `inquiry-attachments` مضبوطة على **Private**.
3. **حساب المسؤول (Admin User):**
   - في Supabase Dashboard -> Authentication -> Users، اضغط على **Add User** وأنشئ بريد المشرف وكلمة المرور لتسجيل الدخول إلى `/admin/login`.
