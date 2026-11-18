import { Metadata } from 'next';
import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { HeroSection } from '@/components/home/HeroSection';
import { ThreeBusinessModelsSection } from '@/components/home/ThreeBusinessModelsSection';
import { HomeServicesSection } from '@/components/home/HomeServicesSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { DevelopersMarketplaceBanner } from '@/components/home/DevelopersMarketplaceBanner';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CustomProjectCta } from '@/components/home/CustomProjectCta';
import { getCategories, getPublishedProjects } from '@/lib/data';

export const revalidate = 60; // ISR cache revalidation

export const metadata: Metadata = {
  title: 'أنجزها (ENGEZHA) | منصة الإنتاج الرقمي وهندسة البرمجيات المتكاملة',
  description:
    'فكرتك تستحق أن تتحول إلى واقع رقمي. نصمم ونطور المواقع والمتاجر الإلكترونية وتطبيقات الموبايل والأنظمة السحابية لرواد الأعمال والشركات. كود نظيف وتجربة استثنائية.',
};

export default async function HomePage() {
  const [categories, projects] = await Promise.all([
    getCategories(),
    getPublishedProjects(),
  ]);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://engezha.vercel.app';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'أنجزها | ENGEZHA',
    alternateName: 'ENGEZHA Digital Production Platform',
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+201017358087',
      contactType: 'customer support',
      areaServed: 'Worldwide',
      availableLanguage: ['Arabic', 'English'],
    },
    sameAs: ['https://github.com/ibrahemkassap/engezha'],
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'أنجزها | ENGEZHA',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/projects?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />

      <MainHeader />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <HeroSection />
        <ThreeBusinessModelsSection />
        <HomeServicesSection />
        <CategoryGrid categories={categories} />
        <FeaturedProjects projects={projects} />
        <DevelopersMarketplaceBanner />
        <HowItWorksSection />
        <CustomProjectCta />
      </main>
      <MainFooter />
    </>
  );
}
