import { describe, it, expect } from 'vitest';
import { generateRequestId, formatBytes } from '@/lib/utils';
import { DEMO_PROJECTS, INITIAL_CATEGORIES } from '@/lib/catalog-config';

describe('Utility Functions', () => {
  it('generates unique request IDs adhering to ENG-2026-XXXX format', () => {
    const id1 = generateRequestId();
    const id2 = generateRequestId();

    expect(id1).toMatch(/^ENG-2026-[A-Z0-9]{4}$/);
    expect(id2).toMatch(/^ENG-2026-[A-Z0-9]{4}$/);
    expect(id1).not.toBe(id2);
  });

  it('formats byte sizes into readable Arabic units', () => {
    expect(formatBytes(0)).toBe('0 بايت');
    expect(formatBytes(1024)).toBe('1 كيلوبايت');
    expect(formatBytes(1024 * 1024 * 5)).toBe('5 ميجابايت');
  });
});

describe('Catalog Integrity and Slugs Uniqueness', () => {
  it('has unique category slugs and required 8 categories', () => {
    const slugs = INITIAL_CATEGORIES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);

    expect(slugs.length).toBe(8);
    expect(uniqueSlugs.size).toBe(8);
  });

  it('has unique project slugs and demo flags strictly preserved', () => {
    const slugs = DEMO_PROJECTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);

    expect(slugs.length).toBe(uniqueSlugs.size);
    // All initial demo projects must be marked as demo and have 0 fake reviews
    DEMO_PROJECTS.forEach((p) => {
      expect(p.is_demo).toBe(true);
      expect(p.review_count).toBe(0);
      expect(p.avg_rating).toBeUndefined();
    });
  });
});
