import { MainHeader } from '@/components/layout/MainHeader';
import { MainFooter } from '@/components/layout/MainFooter';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { CustomProjectCta } from '@/components/home/CustomProjectCta';
import { getCategories, getPublishedProjects } from '@/lib/data';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [categories, projects] = await Promise.all([
    getCategories(),
    getPublishedProjects(),
  ]);

  return (
    <>
      <MainHeader />
      <main className="flex-1">
        <HeroSection />
        <CategoryGrid categories={categories} />
        <FeaturedProjects projects={projects} />
        <HowItWorksSection />
        <CustomProjectCta />
      </main>
      <MainFooter />
    </>
  );
}
