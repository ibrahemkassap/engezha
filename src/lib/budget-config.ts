import { BudgetRange } from '@/types';

export const BUDGET_RANGES: BudgetRange[] = [
  {
    id: 'starter',
    label: 'ميزانية بدء سريعة (موقع تعريفي / متجر ناشئ)',
    egp: '15,000 - 30,000 ج.م',
    usd: '$500 - $1,000',
  },
  {
    id: 'growth',
    label: 'ميزانية نمو متوسطة (تطبيق موبايل هجين / متجر متكامل)',
    egp: '30,000 - 75,000 ج.م',
    usd: '$1,000 - $2,500',
  },
  {
    id: 'scale',
    label: 'ميزانية متقدمة (نظام سحابي SaaS / منصة حجز متقدمة)',
    egp: '75,000 - 150,000 ج.م',
    usd: '$2,500 - $5,000',
  },
  {
    id: 'enterprise',
    label: 'ميزانية كبرى / مخصصة بالكامل (Enterprise & Custom)',
    egp: '+150,000 ج.م',
    usd: '+$5,000',
  },
  {
    id: 'consultation_needed',
    label: 'لسه محتاج مساعدة في تحديد الميزانية',
    egp: 'تحديد بعد المناقشة الفنية',
    usd: 'To be determined',
  },
];
