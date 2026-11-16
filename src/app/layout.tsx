import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ProjectTransitionProvider } from '@/components/transitions/ProjectTransitionContext';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'انجزها | منصة تنفيذ المشاريع الرقمية والنماذج الاحترافية',
    template: '%s | انجزها',
  },
  description:
    'فكرتك تستاهل تتنفذ باحتراف. اختار نموذج يلهمك من مواقع الشركات والمتاجر والتطبيقات، أو احكيلنا فكرتك ونبني لك تجربة رقمية مخصصة على مقاسك.',
  keywords: [
    'انجزها',
    'تطوير مواقع',
    'تصميم متاجر إلكترونية',
    'تطبيقات الجوال',
    'برمجة أنظمة سحابية',
    'نماذج ويب احترافية',
  ],
  authors: [{ name: 'انجزها | ENGEZHA' }],
  creator: 'انجزها',
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: '/',
    title: 'انجزها | فكرتك تستاهل تتنفذ باحتراف',
    description:
      'اختار نموذج يلهمك، أو احكيلنا فكرتك ونبني لك تجربة رقمية على مقاسك.',
    siteName: 'انجزها (ENGEZHA)',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'انجزها | فكرتك تستاهل تتنفذ باحتراف',
    description:
      'اختار نموذج يلهمك، أو احكيلنا فكرتك ونبني لك تجربة رقمية على مقاسك.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-brand-bg dark:bg-brand-dark-bg text-brand-text dark:text-brand-dark-text font-arabic antialiased selection:bg-brand-subtle selection:text-brand-primary dark:selection:bg-brand-dark-surface dark:selection:text-brand-dark-primary transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <AuthProvider>
            <ProjectTransitionProvider>
              {children}
            </ProjectTransitionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
