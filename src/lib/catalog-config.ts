import { Project, ProjectCategory, ServiceItem, BlogArticle } from '@/types';

export const INITIAL_CATEGORIES: ProjectCategory[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    slug: 'corporate-websites',
    name: 'مواقع الشركات',
    description: 'واجهات احترافية تعكس هوية الشركة وموثوقيتها وتجذب العملاء والشركاء.',
    icon_name: 'Building2',
    display_order: 1,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    slug: 'ecommerce-stores',
    name: 'المتاجر الإلكترونية',
    description: 'متاجر رقمية متكاملة ببوابات دفع، إدارة مخزون، وسرعة تحويل عالية.',
    icon_name: 'ShoppingBag',
    display_order: 2,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    slug: 'mobile-apps',
    name: 'تطبيقات الموبايل',
    description: 'تطبيقات هواتف ذكية (iOS و Android) سريعة، تفاعلية، وسلسة الاستخدام.',
    icon_name: 'Smartphone',
    display_order: 3,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    slug: 'games',
    name: 'الألعاب والمنصات الترويجية',
    description: 'بوابات ألعاب ومنصات تفاعلية خفيفة وممتعة لأهداف ترفيهية وتسويقية عالية التحويل.',
    icon_name: 'Gamepad2',
    display_order: 4,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c5555555-5555-5555-5555-555555555555',
    slug: 'portfolios',
    name: 'البورتفوليو والمواقع الشخصية',
    description: 'معارض أعمال تفاعلية ومواقع براند شخصي للمستقلين، المبدعين، والخبراء.',
    icon_name: 'UserCheck',
    display_order: 5,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c6666666-6666-6666-6666-666666666666',
    slug: 'services-booking',
    name: 'مواقع الخدمات والحجوزات',
    description: 'منصات حجز طيران خاص، عيادات طبية، واستشارات بربط تقويم ودفع مباشر.',
    icon_name: 'CalendarCheck',
    display_order: 6,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c7777777-7777-7777-7777-777777777777',
    slug: 'dashboards-systems',
    name: 'الأنظمة ولوحات التحكم',
    description: 'أنظمة نقاط بيع (POS)، فواتير، ومنصات ذكاء اصطناعي ولوحات تحكم سحابية.',
    icon_name: 'LayoutDashboard',
    display_order: 7,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c8888888-8888-8888-8888-888888888888',
    slug: 'custom-design',
    name: 'تصميم مخصص وتجارب إبداعية',
    description: 'بناء تجارب 3D وعروض منتجات ديناميكية مصممة خصيصًا لتحديات ومشاريع استثنائية.',
    icon_name: 'Compass',
    display_order: 8,
    created_at: '2026-01-01T00:00:00Z',
  },
];

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'p-miraj-vip-aviation',
    title: 'منصة ميراج لحجوزات الطيران الخاص ورحلات رجال الأعمال',
    slug: 'miraj-vip-aviation',
    short_description: 'بوابة رقمية فائقة الفخامة لحجز طائرات رجال الأعمال والرحلات الحصرية، مع استعراض الأسطول الجوي وتنسيق الضيافة VIP.',
    detailed_description: `تم تصميم وتطوير منصة "ميراج" لتقديم أرقى تجربة حجز رقمية لعملاء الطيران الخاص وكبار الشخصيات ورجال الأعمال.
    
يتيح النظام استكشاف أسطول الطائرات الفاخرة مع المواصفات الفنية المعتمدة (المدى، سعة الركاب، تجهيزات المقصورة والأجنحة الملكية)، وتحديد مسار الرحلة، مع لوحة متابعة وتنسيق مباشر مع فريق الكونسيرج الجوي والأرضي لضمان أعلى درجات الخصوصية والراحة والأمان.`,
    category_id: 'c6666666-6666-6666-6666-666666666666',
    category: INITIAL_CATEGORIES[5],
    cover_image: '/projects/miraj-cover.png',
    gallery_images: ['/projects/miraj-cover.png'],
    project_type: 'بوابة طيران فاخر وخدمات كونسيرج',
    technology_tags: ['VIP Concierge UI', 'Interactive Fleet', 'Real-time Booking', 'Flight Calculator', 'High-Security'],
    features: [
      'استعراض تفاعلي لأسطول الطائرات مع تفاصيل المقصورات الفاخرة',
      'طلب وحساب تقديرات رحلات الطيران الخاص المباشرة',
      'خدمات الاستقبال والضيافة والتنقل الأرضي VIP',
      'تجربة مستخدم نادرة تجمع بين الفخامة المطلقة والسرعة',
    ],
    problem_solved: 'توفير قناة رقمية موثوقة وفائقة السرعة والخصوصية لطلب الرحلات الخاصة دون الحاجة لإجراءات ورقية معقدة.',
    is_demo: true,
    is_published: true,
    badge: 'طيران وخدمات VIP',
    accent_color: '#D97706',
    created_at: '2026-03-20T12:00:00Z',
    updated_at: '2026-03-20T12:00:00Z',
    demo_url: '/demos/miraj/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'aviation',
    target_audience: [
      'شركات الطيران الخاص ومشغلو رحلات رجال الأعمال',
      'مكاتب السياحة الفاخرة وVIP Concierge العالمية',
      'وكالات السفر الحصرية وخدمات نقل كبار الشخصيات',
    ],
    delivery_scope: [
      'الواجهة الرقمية الكاملة بتصميم فندقي فخم متجاوب',
      'محرك حجز مسار الرحلات وحساب التقديرات الفورية',
      'لوحة استعراض ومواصفات الأسطول الجوي',
      'ربط مباشر بإشعارات الواتساب والبريد الإلكتروني للكونسيرج',
    ],
    customization_options: [
      'إضافة وتعديل طائرات الأسطول بمواصفاتها ومقاعدها الحقيقية',
      'تخصيص بوابات الدفع الإلكتروني والعملات الدولية (USD, EUR, SAR, AED)',
      'تعديل سياسات الحجز والإلغاء وشروط الخدمة الملكية',
    ],
    estimated_timeline: '3 - 5 أيام عمل للإطلاق المخصص بعد استلام البيانات',
    faq_items: [
      {
        question: 'هل يمكن ربط المنصة بنظام تسعير رحلات حقيقي؟',
        answer: 'نعم، يمكن ربط حاسبة المسار بمعدلات الكيلومتر والوقود أو استلام طلبات التسعير عبر الواتساب والبريد مباشرة.',
      },
      {
        question: 'هل تدعم المنصة لغات متعددة (عربي وإنجليزي)؟',
        answer: 'الواجهة مهيأة معمارياً لتدعم العربية والإنجليزية مع معايير RTL وLTR كاملة.',
      },
    ],
    tech_specs: [
      { label: 'نوع الواجهة', value: 'Responsive VIP Concierge Web Portal' },
      { label: 'زمن التحميل المستهدف', value: '< 1.2 ثانية' },
      { label: 'التوافق', value: 'iOS, Android, macOS, Windows' },
      { label: 'الحماية والتشفير', value: 'SSL 256-bit, Sanitized Inputs' },
    ],
  },
  {
    id: 'p-perfect-clinic',
    title: 'منظومة عيادات بيرفكت الطبية والتجميلية المتطورة',
    slug: 'perfect-clinic-medical-center',
    short_description: 'موقع طبي متكامل لعيادات ومراكز التجميل والأسنان، يتيح حجز المواعيد واستعراض الأطباء وحالات العلاج وقصص النجاح.',
    detailed_description: `منصة عيادات ومراكز طبية تم بناؤها بأرقى معايير قطاع الرعاية الصحية وتجربة المريض.
    
تتضمن نظام حجز مواعيد مرن يربط بين المريض وتخصص العيادة المرغوب، دليلاً شاملاً للأطباء والشهادات والخبرات، ومعرضاً لنتائج الحالات والعمليات قبل وبعد لتعزيز ثقة المراجعين، وخريطة تفاعلية للفرع والربط بواتساب خدمة المرضى للاستجابة الفورية.`,
    category_id: 'c6666666-6666-6666-6666-666666666666',
    category: INITIAL_CATEGORIES[5],
    cover_image: '/projects/perfect-clinic-cover.png',
    gallery_images: ['/projects/perfect-clinic-cover.png', '/projects/perfect-clinic-logo.png'],
    project_type: 'منظومة حجز وموقع مراكز طبية',
    technology_tags: ['Medical Booking Engine', 'Doctor Schedules', 'Before & After Gallery', 'Google Maps API', 'Patient Care'],
    features: [
      'نظام حجز مواعيد إلكتروني منظم بحسب التخصص والطبيب',
      'ملفات تعريف الأطباء والخبرات والشهادات المعتمدة',
      'معرض حالات علاجية تفاعلي يوثق نتائج قبل وبعد',
      'اتصال وحجز سريع متكامل مع خدمة العملاء بالواتساب',
    ],
    problem_solved: 'أتمتة حجوزات العيادات الطبية وتقليل فترات الانتظار مع تعزيز الموثوقية الطبية وجذب مرضى جدد.',
    is_demo: true,
    is_published: true,
    badge: 'طبي وتجميلي معتمد',
    accent_color: '#0D9488',
    created_at: '2026-03-18T10:00:00Z',
    updated_at: '2026-03-18T10:00:00Z',
    demo_url: '/demos/perfect-clinic/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'healthcare',
    target_audience: [
      'المراكز الطبية والمجمعات والعيادات التخصصية',
      'عيادات الجلدية والتجميل وزراعة الأسنان',
      'الأطباء والاستشاريون أصحاب المراكز الخاصة',
    ],
    delivery_scope: [
      'الموقع الإلكتروني الطبي المتكامل متوافق مع الموبايل',
      'نظام حجز مواعيد بالتقويم وتحديد الطبيب والتخصص',
      'معرض نتائج الحالات قبل وبعد (Before / After)',
      'تكامل خرائط Google Maps وربط واتساب الاستقبال',
    ],
    customization_options: [
      'إضافة تخصصات طبية وفروع جديدة للمركز',
      'ربط بوابة دفع مسبق لتأكيد الحجز أو رسوم الكشف',
      'تخصيص نموذج استبيان التاريخ الطبي الأولي للمريض',
    ],
    estimated_timeline: '3 - 6 أيام عمل للإطلاق المخصص',
    faq_items: [
      {
        question: 'هل يمكن للمرضى إلغاء أو تعديل الحجز؟',
        answer: 'نعم، يمكن للمريض مراجعة الحجز أو التواصل المباشر مع عيادة الاستقبال لتعديل الموعد.',
      },
    ],
    tech_specs: [
      { label: 'المعايير الطبية', value: 'HIPAA UI Compliance Friendly' },
      { label: 'محرك الحجز', value: 'Interactive Calendar Engine' },
      { label: 'السرعة', value: 'Google PageSpeed 95+' },
    ],
  },
  {
    id: 'p-pos-barcode-system',
    title: 'نظام إدارة المبيعات ونقاط البيع السحابية وقارئ الباركود (POS)',
    slug: 'pos-barcode-smart-system',
    short_description: 'تطبيق ويب سحابي ذكي لإدارة الكاشير ونقاط البيع، يدعم مسح الباركود، حساب الضرائب والخصومات، وطباعة الفواتير الفورية.',
    detailed_description: `نظام كاشير ونقاط بيع متكامل (Point of Sale) صُمم ليمنح أصحاب المحلات والمتاجر والصيدليات أداة سريعة وخفيفة لإتمام عمليات البيع في ثوانٍ معدودة.
    
يدعم النظام البحث الفوري عن المنتجات وقراءة الباركود، إدارة سلة المشتريات، تطبيق الخصومات وحساب ضريبة القيمة المضافة، وتوليد الفواتير الحرارية الجاهزة للطباعة مع حفظ سجل المبيعات والتقارير المالية اليومية.`,
    category_id: 'c7777777-7777-7777-7777-777777777777',
    category: INITIAL_CATEGORIES[6],
    cover_image: '/projects/pos-system-cover.png',
    gallery_images: ['/projects/pos-system-cover.png'],
    project_type: 'نظام كاشير ونقاط بيع ذكي (POS Web App)',
    technology_tags: ['Barcode Scanner API', 'Receipt Thermal Print', 'Offline Storage', 'Sales Analytics', 'Real-time Cart'],
    features: [
      'مسح باركود المنتجات أو البحث السريع بالاسم والكود',
      'سلة بيع فورية مع تعديل الكميات وحساب الخصم والضريبة',
      'طباعة فواتير مبيعات حرارية متوافقة مع طابعات 80mm و 58mm',
      'إحصائيات إجمالية للمبيعات وأصناف المنتجات الأكثر رواجاً',
    ],
    problem_solved: 'الاستغناء عن برامج الكاشير المعقدة والباهظة الثمن بتطبيق سحابي مرن يعمل على أي تابلت أو كمبيوتر.',
    is_demo: true,
    is_published: true,
    badge: 'نظام كاشير معتمد',
    accent_color: '#2563EB',
    created_at: '2026-03-15T14:00:00Z',
    updated_at: '2026-03-15T14:00:00Z',
    demo_url: '/demos/pos-system/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'retail',
    target_audience: [
      'متاجر التجزئة، السوبرماركت، والميني ماركت',
      'الصيدليات ومتاجر مستحضرات التجميل',
      'محلات الملابس، الأحذية، والأجهزة الإلكترونية',
    ],
    delivery_scope: [
      'تطبيق الويب السحابي لنقاط البيع POS',
      'محرك طباعة الفواتير الحرارية متوافق مع طابعات الإيصالات',
      'قاعدة بيانات المنتجات والأسعار والباركود',
      'شاشة تقارير المبيعات اليومية والشهرية',
    ],
    customization_options: [
      'تخصيص بيانات الفاتورة وشعار المحل والرقم الضريبي',
      'إضافة مستويات وصول وصلاحيات للكاشير والمدير',
      'ربط مع قارئات الباركود السلكية واللاسلكية أو كاميرا الموبايل',
    ],
    estimated_timeline: '2 - 4 أيام عمل للإطلاق',
    faq_items: [
      {
        question: 'هل يحتاج النظام لأجهزة كاشير خاصة وباهظة؟',
        answer: 'لا، يعمل على أي جهاز حاسوب أو لابتوب أو تابلت بنظام ويندوز أو آيباد أو أندرويد مع أي طابعة فواتير عادية.',
      },
    ],
    tech_specs: [
      { label: 'الطباعة', value: 'Thermal ESC/POS Compatible' },
      { label: 'قارئ الباركود', value: 'USB, Bluetooth & Camera Scanner' },
      { label: 'وضع العمل', value: 'Cloud & Offline Cache Support' },
    ],
  },
  {
    id: 'p-domzi-store',
    title: 'متجر دومزي الإلكتروني الحديث بتصميم الزجاج التفاعلي (Glassmorphism)',
    slug: 'domzi-glassmorphism-ecommerce',
    short_description: 'متجر تسوق رقمي عصري بواجهات زجاجية ناعمة وسلة مشتريات تفاعلية، مصمم خصيصاً لعلامات الأزياء والإلكترونيات.',
    detailed_description: `متجر إلكتروني فائق الجاذبية البصرية يجمع بين جماليات التصميم الزجاجي الحديث (Modern Glassmorphism) وسرعة الأداء وقوة التحويل إلى مبيعات.
    
يتيح تصفح المنتجات في بطاقات زجاجية ثلاثية الأبعاد، تصفية حسب الأقسام والأسعار، سلة مشتريات ديناميكية فورية، وتجربة دفع مبسطة في شاشة واحدة ترفع معدل إتمام الشراء.`,
    category_id: 'c2222222-2222-2222-2222-222222222222',
    category: INITIAL_CATEGORIES[1],
    cover_image: '/projects/domzi-cover.png',
    gallery_images: ['/projects/domzi-cover.png'],
    project_type: 'متجر إلكتروني عصري (Modern E-commerce)',
    technology_tags: ['Glassmorphism CSS', 'Dynamic Cart State', 'Fast Checkout Flow', 'Product Quick View', 'Mobile Commerce'],
    features: [
      'واجهة مستخدم زجاجية فريدة تلفت الأنظار وتبرز فخامة المنتجات',
      'سلة مشتريات ذكية تنزلق بانسيابية دون إعادة تحميل الصفحة',
      'تصفية سريعة حسب الفئات ونطاق الأسعار والأكثر طلباً',
      'صفحة دفع سريعة بخطوة واحدة تزيد المبيعات',
    ],
    problem_solved: 'كسر الروتين الشكلي للمتاجر التقليدية وتقديم براند بصري مبهر يزيد من رغبة الزبائن في الشراء.',
    is_demo: true,
    is_published: true,
    badge: 'متجر زجاجي فخم',
    accent_color: '#EC4899',
    created_at: '2026-03-12T16:00:00Z',
    updated_at: '2026-03-12T16:00:00Z',
    demo_url: '/demos/domzi-store/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'customizable',
    industry: 'ecommerce',
    target_audience: [
      'علامات الأزياء، الملابس، ومصممو الموضة',
      'متاجر الإكسسوارات الفاخرة والعطور والأحذية',
      'مشاريع التجارة الإلكترونية الناشئة والبراندات المستقلة',
    ],
    delivery_scope: [
      'المتجر الإلكتروني المتكامل بواجهة الزجاج الحديثة',
      'كتالوج المنتجات وسلة الشراء المنزلقة السريعة',
      'لوحة إدارة المنتجات والمخزون والطلبات',
      'تكامل بوابات الدفع (فيزا، فودافون كاش، تابي، تابي/تمارا)',
    ],
    customization_options: [
      'تخصيص ألوان الهوية والشعار وأنماط الخطوط',
      'إضافة خيارات المقاسات والألوان المتعددة للمنتج',
      'ربط شركات الشحن المحلية والدولية لحساب التوصيل تلقائياً',
    ],
    estimated_timeline: '4 - 7 أيام عمل للإطلاق المخصص',
    faq_items: [
      {
        question: 'هل يمكن ربط المتجر ببوابات الدفع الإلكتروني في مصر والخليج؟',
        answer: 'نعم، ندعم بوابات PayMob و Fawry و Tabby و Tamara و Stripe وبوابات الدفع البنكية المباشرة.',
      },
    ],
    tech_specs: [
      { label: 'نوع المتجر', value: 'High CRO Single-Page Checkout' },
      { label: 'بوابات الدفع', value: 'Multi-Gateway Ready' },
      { label: 'تجربة الموبايل', value: 'PWA Ready & Touch Optimized' },
    ],
  },
  {
    id: 'p-mr-x-ai',
    title: 'منصة مستر إكس لحلول الذكاء الاصطناعي والمساعد الرقمي الذكي (Mr. X AI)',
    slug: 'mr-x-ai-chatbot-platform',
    short_description: 'بوابة تفاعلية ذكية مدعومة بنماذج الذكاء الاصطناعي لتوليد الإجابات وخدمة العملاء الآلية وأتمتة المهام اليومية.',
    detailed_description: `منصة دردشة وذكاء اصطناعي تفاعلية (Conversational AI Platform) مبنية لتقديم تجربة حوارية ذكية وفورية للمستخدمين والشركات.
    
تتضمن واجهة محادثة متطورة تدعم الردود اللحظية، حفظ سجل الدردشة، وتخصيص دور وشخصية المساعد الذكي بما يتوافق مع أهداف النشاط التجاري لخدمة العملاء والاستشارات والأتمتة الذكية على مدار 24 ساعة.`,
    category_id: 'c7777777-7777-7777-7777-777777777777',
    category: INITIAL_CATEGORIES[6],
    cover_image: '/projects/mr-x-ai-cover.png',
    gallery_images: ['/projects/mr-x-ai-cover.png'],
    project_type: 'منصة ومساعد ذكاء اصطناعي (AI Chatbot)',
    technology_tags: ['LLM Streaming API', 'Markdown Chat Parser', 'History Session State', 'AI Prompt Tuning', 'Dark AI Theme'],
    features: [
      'واجهة محادثة ذكية فورية مع تدفق مباشر للنصوص (Streaming)',
      'إمكانية ضبط شخصية المساعد الذكي وسياق المعرفة الخاص بشركتك',
      'حفظ واسترجاع سجل المحادثات السابقة بسهولة',
      'تصميم مستقبلي داكن مريح للعين مع أزرار نسخ وتصدير الردود',
    ],
    problem_solved: 'تقديم دعم فني واستشارات لعملاء شركتك آلياً على مدار الساعة دون توقف أو أخطاء بشرية.',
    is_demo: true,
    is_published: true,
    badge: 'ذكاء اصطناعي تفاعلي',
    accent_color: '#8B5CF6',
    created_at: '2026-03-10T11:00:00Z',
    updated_at: '2026-03-10T11:00:00Z',
    demo_url: '/demos/mr-x-ai/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'customizable',
    industry: 'technology',
    target_audience: [
      'الشركات الراغبة في خدمة عملاء مؤتمتة 24/7',
      'منصات الـ SaaS والشركات التقنية والناشئة',
      'المؤسسات التعليمية ومقدمو الاستشارات والخدمات',
    ],
    delivery_scope: [
      'منصة الشات بوت التفاعلية وتطبيق المحادثة',
      'لوحة تحكم لتدريب الذكاء الاصطناعي على بيانات وأسئلة شركتك',
      'ودجت قابل للتضمين في أي موقع خارجي بنقرة زر',
      'تحليلات الأسئلة الشائعة وسجلات رضا المستخدمين',
    ],
    customization_options: [
      'ربط نماذج Gemini 1.5 Pro أو OpenAI بنظام المعرفة الخاص بك',
      'تخصيص ألوان وتصميم الودجت ليطابق موقعك تماماً',
      'ميزة تحويل العميل لموظف دعم بشري عند الاستفسارات الحساسة',
    ],
    estimated_timeline: '5 - 8 أيام عمل',
    faq_items: [
      {
        question: 'هل يمكن تدريب البوت على ملفات PDF وبيانات خاصة بشركتنا؟',
        answer: 'نعم، يمكن تغذية البوت بكتالوج المنتجات والأسعار والأسئلة الشائعة الخاصة بنشاطك بدقة عالية.',
      },
    ],
    tech_specs: [
      { label: 'نماذج الذكاء الاصطناعي', value: 'Gemini, GPT-4o, Claude 3.5' },
      { label: 'زمن الاستجابة', value: 'Real-time Streaming (< 400ms)' },
      { label: 'خيارات التضمين', value: 'Script Tag, iFrame, Standalone App' },
    ],
  },
  {
    id: 'p-1xbit-gaming',
    title: 'بوابة ون إكس بيت الرقمية التفاعلية للألعاب الترويجية والمسابقات',
    slug: '1xbit-digital-gaming-portal',
    short_description: 'منصة ألعاب وترفيه رقمية ذات واجهات داكنة وتأثيرات نيون حركية، مهيأة للمسابقات الرقمية والفعاليات التسويقية التفاعلية.',
    detailed_description: `بوابة ترفيهية متقدمة صُممت لتقديم تجربة حماسية وجذابة لرواد المسابقات والفعاليات الرقمية.
    
تتميز بمؤثرات بصرية ديناميكية، سرعة معالجة عالية، جداول نتائج ومستويات للمشاركين، ونظام حماية متين يضمن عدالة المنافسات وسلاسة التصفح حتى مع آلاف المستخدمين المتزامنين.`,
    category_id: 'c4444444-4444-4444-4444-444444444444',
    category: INITIAL_CATEGORIES[3],
    cover_image: '/projects/1xbit-cover.png',
    gallery_images: ['/projects/1xbit-cover.png'],
    project_type: 'بوابة ألعاب وترفيه تفاعلية (Gaming Portal)',
    technology_tags: ['Gaming Engine UI', 'Live Leaderboards', 'Audio FX Integration', 'High-Load Resilience', 'Neon Cyberpunk'],
    features: [
      'واجهة داكنة مفعمة بالحيوية والحركة بتأثيرات بصرية وصوتية تفاعلية',
      'لوحة متصدرين حية (Leaderboard) تشتعل بالحماس والتنافس',
      'تسجيل مستخدمين سريع مع نظام نقاط ومكافآت افتراضية',
      'استقرار وأمان فائقين تحت وطأة الزيارات المليونية',
    ],
    problem_solved: 'تحويل الحملات التسويقية والمسابقات إلى تجربة ألعاب تفاعلية ممتعة تجذب الجمهور وتضاعف بقاءهم في الموقع.',
    is_demo: true,
    is_published: true,
    badge: 'بوابة ألعاب حماسية',
    accent_color: '#F59E0B',
    created_at: '2026-03-08T19:00:00Z',
    updated_at: '2026-03-08T19:00:00Z',
    demo_url: '/demos/1xbit/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'customizable',
    industry: 'technology',
    target_audience: [
      'شركات الترفيه الرقمي والمسابقات الترويجية',
      'العلامات التجارية الراغبة في Gamification تسويقي عالي التفاعل',
      'منصات الفعاليات والأنشطة الرقمية الجماعية',
    ],
    delivery_scope: [
      'بوابة الألعاب والمسابقات المتكاملة',
      'نظام تسجيل وحسابات اللاعبين والنقاط الافتراضية',
      'لوحة تحكم إدارية لإنشاء المسابقات وإعلان الفائزين',
      'تأمين ومراقبة ضد التحايل والغش في النتائج',
    ],
    customization_options: [
      'تخصيص قواعد الألعاب وجدول النقاط والمكافآت',
      'تغيير المؤثرات البصرية والأصوات لتطابق البراند',
      'إضافة بوابات دفع لشحن الرصيد والاشتراكات إن لزم',
    ],
    estimated_timeline: '7 - 12 يوم عمل',
    faq_items: [
      {
        question: 'هل تتحمل المنصة آلاف المشاركين في نفس اللحظة؟',
        answer: 'نعم، المنصة مبنية على بنية سحابية مرنة تتحمل أوقات الذروة والمنافسات المباشرة.',
      },
    ],
    tech_specs: [
      { label: 'بنية المعالجة', value: 'Real-time WebSocket / SSE Ready' },
      { label: 'المؤثرات الصوتية', value: 'Web Audio API Synth' },
      { label: 'الحماية', value: 'Anti-Bot & Rate-Limited' },
    ],
  },
  {
    id: 'p-samsung-ai-landing',
    title: 'صفحة إطلاق تجربة سامسونج الذكية (Samsung AI Experience Landing)',
    slug: 'samsung-ai-experience-landing',
    short_description: 'صفحة هبوط تسويقية سينمائية لإطلاق المنتجات الذكية، تجمع بين السرد القصصي البصري، الرسوم المتحركة، وتحفيز الطلب المسبق.',
    detailed_description: `صفحة هبوط فائقة التأثير التسويقي (High-Conversion Product Landing Page) صُممت لتقديم المنتجات والتقنيات الرائدة بأسلوب العروض العالمية الكبرى.
    
تعتمد على التمرير التفاعلي (Scrollytelling)، استعراض مزايا الذكاء الاصطناعي بدقة سينمائية، ونماذج حجز وطلب مسبق متكاملة تحقق أعلى معدل تحويل للزوار إلى مشترين مع سرعة تحميل خرافية.`,
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category: INITIAL_CATEGORIES[7],
    cover_image: '/projects/samsung-ai-cover.png',
    gallery_images: ['/projects/samsung-ai-cover.png'],
    project_type: 'صفحة هبوط تسويقية سينمائية (Product Landing Page)',
    technology_tags: ['Scrollytelling', 'Cinematic Animation', 'Pre-Order Engine', 'High-Conversion CRO', 'Core Web Vitals 99+'],
    features: [
      'سرد بصري سينمائي يواكب حركة تمرير الزائر (Scrollytelling)',
      'إبراز مزايا المنتج التقنية بنقاط تفاعلية بارزة',
      'نموذج طلب مسبق سريع ومرن يجمع بيانات العملاء بدقة',
      'تحميل فوري في أجزاء من الثانية بتوافق تام مع محركات البحث',
    ],
    problem_solved: 'تحويل إطلاق المنتجات الجديدة إلى حدث رقمي مبهر يحقق أرقام مبيعات قياسية وطلب مسبق ضخم.',
    is_demo: true,
    is_published: true,
    badge: 'إطلاق منتج سينمائي',
    accent_color: '#3B82F6',
    created_at: '2026-03-05T09:00:00Z',
    updated_at: '2026-03-05T09:00:00Z',
    demo_url: '/demos/samsung-ai/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'technology',
    target_audience: [
      'الشركات التي تطلق أجهزة ومنتجات تقنية جديدة',
      'حملات إطلاق المنتجات الكبرى (Major Product Launches)',
      'العلامات التجارية الفاخرة للإلكترونيات والأجهزة المنزلية',
    ],
    delivery_scope: [
      'صفحة الهبوط التفاعلية كاملة بالمؤثرات السينمائية',
      'نموذج الطلب المسبق والتقاط العملاء المحتملين (Leads)',
      'ربط مباشر بنظام إدارة علاقات العملاء (CRM) أو الإيميل/واتساب',
      'تهيئة كاملة لسرعة التحميل ومؤشرات Core Web Vitals',
    ],
    customization_options: [
      'استبدال صور ومواصفات وتفاصيل المنتج ببيانات منتجك',
      'إضافة عداد تنازلي للإطلاق وخصومات الحجز المبكر',
      'تكامل بوابات الدفع لتحصيل مقدم الحجز إن رغبت',
    ],
    estimated_timeline: '3 - 5 أيام عمل للإطلاق المخصص',
    faq_items: [
      {
        question: 'هل تناسب صفحة الهبوط حملات الإعلانات الممولة؟',
        answer: 'بالتأكيد، صُممت الصفحة خصيصاً لتحقيق أعلى معدل تحويل (CRO) لزوار إعلانات Google و TikTok و Meta.',
      },
    ],
    tech_specs: [
      { label: 'مؤشر التحويل', value: 'High CRO Scrollytelling' },
      { label: 'السرعة القياسية', value: 'LCP < 1.0s, CLS = 0' },
      { label: 'تتبع الإعلانات', value: 'Meta Pixel, TikTok & GA4 Ready' },
    ],
  },
  {
    id: 'p-creative-3d',
    title: 'معرض المنتجات الإبداعي ثلاثي الأبعاد 360 درجة (Creative 3D Showcase)',
    slug: 'creative-3d-product-showcase',
    short_description: 'تجربة ويب ثلاثية الأبعاد تفاعلية تتيح للعميل استكشاف المنتج بزاوية 360 درجة وتغيير الخامات والألوان في الوقت الفعلي.',
    detailed_description: `واجهة عرض منتجات غامرة (Immersive 3D Web Experience) تمنح المشتري إحساس لمس المنتج وفحصه عن قرب قبل الشراء.
    
تتيح تدوير المنتج 360 درجة، تقريب التفاصيل، تجربة ألوان وخامات مختلفة لحظياً، ومؤثرات صوتية هادئة تعزز قيمة المنتج الفاخر وتحفز قرار الشراء الفوري.`,
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category: INITIAL_CATEGORIES[7],
    cover_image: '/projects/creative-landing-cover.png',
    gallery_images: ['/projects/creative-landing-cover.png'],
    project_type: 'تجربة ثلاثية الأبعاد تفاعلية (3D Web Experience)',
    technology_tags: ['Three.js / WebGL', '360 Orbit Controls', 'Material Shader Swapping', 'Spatial Audio FX', 'Luxury Showcase'],
    features: [
      'تدوير وفحص المنتج ثلاثي الأبعاد في كل الاتجاهات بنعومة',
      'تبديل الخامات والألوان مع انعكاسات إضاءة واقعية وفورية',
      'نقاط تعريف تفاعلية تشرح مميزات ومكونات المنتج الحصرية',
      'زر شراء مباشر مدمج بسلاسة في تجربة التصفح',
    ],
    problem_solved: 'إزالة تردد العملاء عند الشراء أونلاين بتمكينهم من رؤية كل زاوية وتفصيلة في المنتج بوضوح مذهل.',
    is_demo: true,
    is_published: true,
    badge: 'عرض ثلاثي الأبعاد 360°',
    accent_color: '#10B981',
    created_at: '2026-03-03T13:00:00Z',
    updated_at: '2026-03-03T13:00:00Z',
    demo_url: '/demos/creative-landing/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'customizable',
    industry: 'ecommerce',
    target_audience: [
      'ماركات الأحذية والملابس الرياضية والإكسسوارات',
      'شركات الأثاث والديكور والتصميم الداخلي',
      'صناع المنتجات الفاخرة والساعات والمجوهرات',
    ],
    delivery_scope: [
      'عارض الـ 3D التفاعلي 360 درجة المبرمج بتقنية WebGL',
      'نظام تبديل الألوان والخامات لحظياً بنقرة واحدة',
      'أزرار الشراء السريع ونوافذ التفاصيل التفاعلية',
      'تحسين الأداء ليعمل بسلاسة على شاشات الهواتف دون بطء',
    ],
    customization_options: [
      'رفع وإدراج مجسمات ثلاثية الأبعاد خاصة بمنتجاتك (GLTF/GLB)',
      'تخصيص زوايا الإضاءة والظلال وخلفية العرض',
      'ربط مباشر بسلة الشراء في متجرك الحالي',
    ],
    estimated_timeline: '5 - 9 أيام عمل',
    faq_items: [
      {
        question: 'هل يعمل العرض ثلاثي الأبعاد على هواتف أندرويد وآيفون؟',
        answer: 'نعم، تم تحسين محرك الرندرة ليعمل بمعدل 60 إطاراً في الثانية (60 FPS) على كافة الهواتف الذكية.',
      },
    ],
    tech_specs: [
      { label: 'محرك الجرافيك', value: 'WebGL / Three.js Optimized' },
      { label: 'معدل الإطارات', value: 'Smooth 60 FPS' },
      { label: 'تنسيق المجسمات', value: 'GLTF, GLB, Draco Compressed' },
    ],
  },
  {
    id: 'p-fatora-pro',
    title: 'نظام الفاتورة الإلكترونية السحابي وإدارة الحسابات (Fatora Pro)',
    slug: 'fatora-pro-invoicing-system',
    short_description: 'منظومة سحابية متكاملة لإنشاء الفواتير الضريبية وتوليد رمز QR، متابعة المدفوعات، وإدارة العملاء للشركات والمستقلين.',
    detailed_description: `نظام فواتير احترافي متوافق مع معايير الفوترة الإلكترونية الحديثة، يتيح إصدار الفواتير وعروض الأسعار في ثوانٍ، وتصديرها بصيغة PDF قابلة للطباعة والمشاركة، مع تتبع حالة السداد وتوليد رموز الاستجابة السريعة (QR Code) المعتمدة.`,
    category_id: 'c7777777-7777-7777-7777-777777777777',
    category: INITIAL_CATEGORIES[6],
    cover_image: '/projects/fatora-cover.png',
    gallery_images: ['/projects/fatora-cover.png'],
    project_type: 'منظومة فواتير سحابية (SaaS Invoicing)',
    technology_tags: ['ZATCA / Tax QR Code', 'PDF Generation Engine', 'Client Ledger', 'Payment Tracking', 'Multi-currency'],
    features: [
      'إنشاء فواتير ضريبية مفصلة مع توليد تلقائي لرمز الـ QR',
      'تصدير فوري للفاتورة بصيغة PDF بتنسيق رسمي معتمد',
      'سجل شامل للعملاء وتاريخ المعاملات والفواتير المستحقة',
      'دعم تعدد العملات (EGP, SAR, USD, EUR) وحساب الضرائب بدقة',
    ],
    problem_solved: 'تنظيم المعاملات المالية والتخلص من الفواتير الورقية اليدوية وتجنب الأخطاء الحسابية وتأخير التحصيل.',
    is_demo: true,
    is_published: true,
    badge: 'فواتير ضريبية معتمدة',
    accent_color: '#059669',
    created_at: '2026-03-02T15:00:00Z',
    updated_at: '2026-03-02T15:00:00Z',
    demo_url: '/demos/fatora/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'services',
    target_audience: [
      'الشركات الصغيرة والمتوسطة والمكاتب المهنية',
      'المستقلون والمستشارون ومقدمو الخدمات الحرة',
      'شركات المقاولات والتوريدات والصيانة',
    ],
    delivery_scope: [
      'منظومة الفواتير السحابية كاملة مع لوحة التحكم',
      'محرك توليد ملفات الـ PDF وطباعة الفواتير برمز QR',
      'إدارة دليل العملاء وبنود الخدمات والأسعار',
      'إحصائيات الإيرادات والمبالغ المحصلة والمتبقية',
    ],
    customization_options: [
      'تخصيص تصميم وقالب الفاتورة بشعار وهوية شركتك',
      'ضبط نسب الضرائب وشروط السداد والحسابات البنكية',
      'ربط بوابات دفع إلكترونية لتمكين العميل من سداد الفاتورة أونلاين',
    ],
    estimated_timeline: '2 - 4 أيام عمل للإطلاق',
    faq_items: [
      {
        question: 'هل يمكن إرسال الفاتورة للعميل عبر الواتساب مباشرة؟',
        answer: 'نعم، يوفر النظام زراً فورياً لمشاركة رابط الفاتورة أو ملف الـ PDF عبر واتساب بنقرة واحدة.',
      },
    ],
    tech_specs: [
      { label: 'الرمز الضريبي', value: 'Base64 TLV / Tax Authority QR' },
      { label: 'توليد المستندات', value: 'Client-side & Server-side PDF' },
      { label: 'العملات', value: 'Multi-Currency Support' },
    ],
  },
  {
    id: 'p-emad-arafat-consulting',
    title: 'منصة المستشار عماد عرفات لحجز الاستشارات والجلسات التدريبية',
    slug: 'emad-arafat-consulting-platform',
    short_description: 'موقع استشاري وبراند شخصي متكامل لحجز الجلسات الاستشارية أونلاين، استعراض الخبرات، وتنسيق المواعيد المباشرة.',
    detailed_description: `بوابة رقمية مخصصة للمستشارين والخبراء وأصحاب الكفاءات المهنية لبناء حضور قوي وتنظيم مواعيد العملاء باحترافية.
    
تجمع بين عرض السيرة الذاتية وقصص النجاح والشهادات، ونظام حجز جلسات دقيق يربط بين الموعد المناسب للعميل وجدول المستشار مع تأكيد فوري عبر واتساب والبريد الإلكتروني.`,
    category_id: 'c5555555-5555-5555-5555-555555555555',
    category: INITIAL_CATEGORIES[4],
    cover_image: '/projects/emad-arafat-cover.png',
    gallery_images: ['/projects/emad-arafat-cover.png', '/projects/emad-arafat-photo.png'],
    project_type: 'منصة استشارات وبراند شخصي (Consulting Platform)',
    technology_tags: ['Session Booking Engine', 'Personal Branding UI', 'Client Testimonials', 'WhatsApp Sync', 'Calendar Integration'],
    features: [
      'حجز مواعيد الجلسات الاستشارية باليوم والساعة المناسبة',
      'عرض باقات الاستشارات (فردية، شركات، مكثفة) بتفاصيلها',
      'معرض آراء العملاء وتجارب المستفيدين السابقة الموثقة',
      'تكامل كامل مع واتساب المستشار للرد والتنسيق المباشر',
    ],
    problem_solved: 'تحويل طلبات الاستشارات المبعثرة على السوشيال ميديا إلى نظام حجز منظم يرفع قيمة الاستشارة وموثوقيتها.',
    is_demo: true,
    is_published: true,
    badge: 'استشارات مهنية معتمدة',
    accent_color: '#4F46E5',
    created_at: '2026-03-01T10:00:00Z',
    updated_at: '2026-03-01T10:00:00Z',
    demo_url: '/demos/emad-arafat/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'education',
    target_audience: [
      'المستشارون الإداريون والماليون والتقنيون والقانونيون',
      'المدربون والمدربون المعتمدون وصناع المحتوى المهني',
      'المراكز التدريبية وبيوت الخبرة المستقلة',
    ],
    delivery_scope: [
      'الموقع الإلكتروني والبراند الشخصي المتكامل',
      'نظام حجز الجلسات وربط التقويم التفاعلي',
      'عرض سيرة الإنجازات والشهادات والظهور الإعلامي',
      'ربط مباشر بـ Google Meet أو Zoom ورسائل واتساب التذكيرية',
    ],
    customization_options: [
      'تعديل باقات الاستشارات وأسعارها ومدد كل جلسة',
      'ربط تقويم Google Calendar لمنع تعارض المواعيد تلقائياً',
      'إضافة بوابات دفع إلكترونية لتحصيل رسوم الجلسة مسبقاً',
    ],
    estimated_timeline: '3 - 5 أيام عمل للإطلاق المخصص',
    faq_items: [
      {
        question: 'هل يمكن تقديم دورات مسجلة إلى جانب الجلسات الحية؟',
        answer: 'نعم، يمكن توسيع المنصة لإضافة قسم للدورات التدريبية المسجلة وبيعها باشتراكات.',
      },
    ],
    tech_specs: [
      { label: 'نوع النظام', value: 'Consulting Booking Portal' },
      { label: 'التقويم', value: 'Google Calendar / Outlook Sync Ready' },
      { label: 'الاجتماعات', value: 'Zoom / Google Meet API Integrated' },
    ],
  },
  {
    id: 'p-ibrahem-kassap-3d',
    title: 'معرض الأعمال الرقمي ثلاثي الأبعاد للمهندس إبراهيم كساب',
    slug: 'ibrahem-kassap-3d-portfolio',
    short_description: 'بورتفوليو رقمي ثلاثي الأبعاد تفاعلي مذهل يعرض المشاريع البرمجية والخبرات التقنية بأسلوب سينمائي يرسخ الهوية.',
    detailed_description: `تجربة بورتفوليو برمجية ثلاثية الأبعاد تنقل استعراض الأعمال الشخصية إلى مستوى غير مسبوق من الاحترافية والابتكار.
    
تتضمن بيئة تفاعلية تستجيب لحركة الماوس واللمس، عرضاً ديناميكياً للتقنيات والمهارات، واستعراضاً لأبرز النماذج والمشاريع المنفذة مع إمكانية التواصل والتحميل الفوري للسيرة الذاتية.`,
    category_id: 'c5555555-5555-5555-5555-555555555555',
    category: INITIAL_CATEGORIES[4],
    cover_image: '/projects/ibrahem-kassap-cover.png',
    gallery_images: ['/projects/ibrahem-kassap-cover.png', '/projects/ibrahem-kassap-photo.png'],
    project_type: 'بورتفوليو رقمي ثلاثي الأبعاد (3D Web)',
    technology_tags: ['3D CSS Matrix', 'Interactive Canvas', 'Animated Skills Showcase', 'Direct CV Download'],
    features: [
      'استعراض ثلاثي الأبعاد للمشاريع والمهارات البرمجية',
      'تفاعل حركي مع لمس الشاشة وحركة الماوس',
      'أزرار تواصل مباشر للتوظيف وطلب الأعمال الحرة',
      'تحميل السيرة الذاتية المحدثة بنقرة واحدة',
    ],
    problem_solved: 'إبهار أصحاب الشركات والعملاء وتأكيد القدرات البرمجية الفائقة من اللحظة الأولى لدخول الموقع.',
    is_demo: true,
    is_published: true,
    badge: 'بورتفوليو 3D مبهر',
    accent_color: '#7C3AED',
    created_at: '2026-02-28T11:00:00Z',
    updated_at: '2026-02-28T11:00:00Z',
    demo_url: '/demos/ibrahem-kassap-3d/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'services',
    target_audience: [
      'المبرمجون والمصممون والمبدعون المستقلون',
      'مهندسو البرمجيات والـ 3D والفنانون الرقميون',
      'المتخصصون الراغبون في بناء علامة شخصية استثنائية تجلب عقود العمل',
    ],
    delivery_scope: [
      'الموقع ثلاثي الأبعاد التفاعلي متوافق مع كافة الشاشات',
      'معرض الأعمال الديناميكي وقسم استعراض المهارات الحركي',
      'زر تنزيل السيرة الذاتية المباشر ونموذج التواصل',
      'ربط حسابات التواصل الاجتماعي وروابط GitHub وLinkedIn',
    ],
    customization_options: [
      'استبدال البيانات والصور والأعمال المنفذة ببياناتك',
      'تخصيص ثيم الألوان والخطوط وتأثيرات الإضاءة ثلاثية الأبعاد',
      'إضافة أقسام جديدة مثل المقالات أو شهادات العملاء',
    ],
    estimated_timeline: '2 - 4 أيام عمل للإطلاق',
    faq_items: [
      {
        question: 'هل يمكن ربط البورتفوليو بمدونة أو مقالات تقنية؟',
        answer: 'نعم، المنصة قابلة للتوسع لإضافة مدونة شخصية ونظام إدارة مقالات كامل.',
      },
    ],
    tech_specs: [
      { label: 'التقنية الحركية', value: '3D CSS Transforms & Canvas' },
      { label: 'سرعة التحميل', value: 'Ultra Fast (< 800ms)' },
      { label: 'التوافق', value: 'Mobile, Tablet & Desktop' },
    ],
  },
  {
    id: 'p-rgb-clock-app',
    title: 'تطبيق ويب رقمي بإضاءات RGB نيون وتأثيرات بصرية حركية',
    slug: 'rgb-neon-digital-clock-app',
    short_description: 'أداة ويب حية تعرض التوقيت والتاريخ بدقة فائقة بتأثيرات إضاءة نيون RGB ديناميكية وتصميم داكن مريح وممتع.',
    detailed_description: `نموذج لأدوات وتطبيقات الويب التفاعلية الخفيفة (Micro Web Apps).
    
يوفر شاشة عرض رقمية ذكية تناسب خلفيات الشاشات ومكاتب العمل وأجواء غرف الألعاب (Gaming Setups) بأسلوب Cyberpunk وألوان متدفقة ديناميكية تمتاز باستهلاك شبه منعدم لموارد الجهاز.`,
    category_id: 'c8888888-8888-8888-8888-888888888888',
    category: INITIAL_CATEGORIES[7],
    cover_image: '/projects/rgb-clock-cover.png',
    gallery_images: ['/projects/rgb-clock-cover.png'],
    project_type: 'تطبيق ويب رقمي تفاعلي',
    technology_tags: ['HTML5 Canvas', 'Neon Glow CSS', 'Precise Time Engine', 'Ultra-lightweight'],
    features: [
      'عرض رقمي دقيق للوقت والتاريخ بالثواني',
      'توهج نيون RGB متدرج ومتحرك بانسيابية',
      'دعم وضع الشاشة الكاملة ومناسب لكافة الأجهزة',
      'خفيف وفائق السرعة دون أي تباطؤ في الجهاز',
    ],
    problem_solved: 'إبراز القدرة على تصميم وبرمجة أدوات وتطبيقات ويب خفيفة وشديدة الجاذبية البصرية.',
    is_demo: true,
    is_published: true,
    badge: 'أداة ويب نيون',
    accent_color: '#06B6D4',
    created_at: '2026-02-26T18:00:00Z',
    updated_at: '2026-02-26T18:00:00Z',
    demo_url: '/demos/rgb-clock/index.html',
    avg_rating: undefined,
    review_count: 0,
    production_status: 'ready_to_launch',
    industry: 'technology',
    target_audience: [
      'استوديوهات ومكاتب البث المباشر (Gaming & Streaming)',
      'عشاق التصاميم الرقمية الداكنة وتنسيقات الـ Cyberpunk',
      'المواقع التي ترغب في ودجت عرض وقت وتاريخ جذاب للزوار',
    ],
    delivery_scope: [
      'تطبيق الساعة النيون التفاعلية مع دعم ملء الشاشة',
      'محرك تدفق ألوان الـ RGB الديناميكي الخفيف',
      'كود نظيف خفيف جاهز للعمل كودجت أو تطبيق مستقل',
      'توافق كامل مع مختلف دقات الشاشات والموبايل',
    ],
    customization_options: [
      'تعديل نمط الخطوط ومجموعات ألوان النيون المتدفقة',
      'إضافة مؤقت عد تنازلي أو تنبيهات صوتية للأوقات المهمة',
      'تضمين شعار شركتك أو اسمك داخل شاشة العرض',
    ],
    estimated_timeline: '1 - 2 يوم عمل',
    faq_items: [
      {
        question: 'هل يمكن استخدامه كشاشة توقف أو خلفية شاشة للمكتب؟',
        answer: 'نعم، يدعم وضع الشاشة الكاملة بضغطة زر ويحافظ على الإضاءة الحية بسلاسة.',
      },
    ],
    tech_specs: [
      { label: 'نوع التطبيق', value: 'Interactive Micro Web App' },
      { label: 'حجم الكود', value: 'Ultra Compact (< 30KB)' },
      { label: 'استهلاك المعالج', value: '< 1% CPU Usage' },
    ],
  },
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 's-web-dev',
    slug: 'website-development',
    title: 'تصميم وتطوير مواقع الشركات والواجهات الرقمية',
    headline: 'واجهات رقمية تعكس مكانة شركتك وتجذب كبار العملاء والمستثمرين',
    short_description: 'نبني مواقع تعريفية وحلول ويب متطورة تجمع بين جمال التصميم، موثوقية الكود، وسرعة التحميل الفائقة.',
    detailed_description: `في عصر المنافسة الرقمية الشرسة، موقعك الإلكتروني هو المقر الرئيسي لأعمالك في العالم الرقمي. نحن في "أنجزها" لا نكتفي بتركيب قوالب مسبقة، بل نعتمد نهجاً هندسياً يبدأ من دراسة هوية شركتك، تحليل منافسيك، وهندسة تجربة مستخدم (UX) تحول الزائر العادي إلى عميل مخلص.
    
نستخدم أحدث أطر العمل مثل Next.js و React، مع الالتزام بأدق معايير محركات البحث (SEO) وتجربة الموبايل الفائقة، مما يمنح موقعك سرعة تحميل استثنائية وأعلى مستويات الأمان والاستقرار.`,
    icon_name: 'Building2',
    hero_badge: 'مواقع شركات احترافية',
    benefits: [
      'سرعة تحميل فائقة تحقق معايير Google Core Web Vitals بتفوق.',
      'تصميم مخصص 100% يعبر عن هوية شركتك دون قوالب جاهزة متكررة.',
      'تهيئة داخلية شاملة لمحركات البحث (On-Page SEO) لضمان سرعة الأرشفة.',
      'تجاوب سلس مع شاشات الهواتف والتابلت وأجهزة سطح المكتب.',
      'لوحة تحكم إدارية سهلة لتحديث الأخبار والصور والمشاريع بنقرة زر.',
    ],
    deliverables: [
      'واجهة المستخدم وتجربة التصفح (UI/UX) مصممة خصيصاً لعلامتك التجارية.',
      'برمجة الواجهات الأمامية والخلفية باستخدام Next.js و TypeScript.',
      'لوحة إدارة محتوى سريعة وسهلة الاستخدام.',
      'ربط دومين الشركة وحسابات البريد الإلكتروني الرسمية.',
      'شهادة أمان SSL واستضافة سحابية عالية الاستقرار.',
      'دعم فني وتدريب كامل لفريقك بعد الإطلاق.',
    ],
    suitable_for: [
      'الشركات والمؤسسات التي تبحث عن واجهة تعزز موثوقيتها أمام المستثمرين.',
      'مكاتب المحاماة، الاستشارات، والخدمات المهنية.',
      'الشركات العقارية ومكاتب التطوير والمقاولات.',
      'الشركات الصناعية واللوجستية ووكالات الاستيراد والتصدير.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'Supabase'],
    timeline_estimate: 'من 7 إلى 14 يوم عمل حسب حجم الموقع',
    faq: [
      {
        question: 'هل يمكنني تعديل وإضافة صفحات بعد استلام الموقع؟',
        answer: 'بالتأكيد، نسلمك لوحة إدارة سهلة وبسيطة تتيح لك تعديل النصوص، إضافة خدمات، ورفع صور جديدة بدون كتابة كود.',
      },
      {
        question: 'هل الموقع متوافق مع الموبايل ومتصفحات الهواتف؟',
        answer: 'نعم، نعتمد استراتيجية Mobile-First في التصميم لضمان أعلى درجات السلاسة والسرعة على كافة الهواتف.',
      },
    ],
  },
  {
    id: 's-ecommerce',
    slug: 'ecommerce-development',
    title: 'برمجة وتطوير المتاجر الإلكترونية المتكاملة',
    headline: 'متاجر رقمية سريعة مصممة لرفع معدل التحويل والمبيعات وضمان أمان المعاملات',
    short_description: 'نبني متاجر إلكترونية عصرية ببوابات دفع متنوعة، إدارة مخزون دقيقة، وصفحة دفع سريعة تضاعف مبيعاتك.',
    detailed_description: `نجاح المتجر الإلكتروني لا يعتمد فقط على عرض المنتجات، بل على سهولة وسرعة رحلة العميل من تصفح المنتج وحتى إتمام الدفع. نطور في أنجزها متاجر إلكترونية ذات بنية معمارية قوية تختصر خطوات الشراء وتقلل من سلات الشراء المتروكة.
    
نوفر تكاملاً متكاملاً مع بوابات الدفع الإلكتروني المعتمدة (فيزا، ماستركارد، فودافون كاش، محافظ إلكترونية، تابي، وتمارا) مع إدارة سلسة للمخزون والفواتير والربط الآلي مع شركات الشحن.`,
    icon_name: 'ShoppingBag',
    hero_badge: 'تجارة إلكترونية متطورة',
    benefits: [
      'صفحة دفع سريعة بخطوة واحدة (One-Step Checkout) لتقليل ترك السلات.',
      'ربط سلس مع بوابات الدفع الإلكتروني والمحافظ المحلية والدولية.',
      'إدارة متقدمة للمخزون وتنبيهات فورية عند نفاد الكميات.',
      'تتبع آلي لحالات الطلبات وإشعارات للمشتري عبر واتساب والبريد.',
      'دعم تعدد العملات واللغات وضريبة القيمة المضافة بدقة.',
    ],
    deliverables: [
      'متجر إلكتروني متكامل متجاوب مع كافة الأجهزة.',
      'سلة مشتريات ذكية وقابلة للحفظ والمشاركة.',
      'لوحة إدارة المنتجات، التصنيفات، الأسعار، وكوبونات الخصم.',
      'ربط بوابة الدفع الإلكتروني المفضلة لديك.',
      'تكامل مع شركات الشحن لحساب التكلفة تلقائياً.',
      'تقارير مبيعات وتحليلات أداء دورية.',
    ],
    suitable_for: [
      'براندات الأزياء، الملابس، والإكسسوارات.',
      'متاجر الإلكترونيات، الهواتف، وقطع الغيار.',
      'محلات العطور ومستحضرات التجميل والمكملات الغذائية.',
      'الموردون وتجار الجملة الراغبون في بيع منتجاتهم للجمهور مباشرة.',
    ],
    technologies: ['Next.js Commerce', 'Tailwind CSS', 'PayMob API', 'Stripe', 'PostgreSQL', 'Cloudflare CDN'],
    timeline_estimate: 'من 10 إلى 20 يوم عمل',
    faq: [
      {
        question: 'ما هي بوابات الدفع التي يمكن ربطها بالمتجر؟',
        answer: 'ندعم PayMob و Fawry و Tabby و Tamara و Stripe و PayPal وجميع المحافظ الإلكترونية المصرية والخليجية.',
      },
      {
        question: 'هل يمكن ربط المتجر بشركات الشحن والتوصيل؟',
        answer: 'نعم، يمكن ربطه مع Bosta و Aramex و Mylerz وشركات الشحن المحلية لحساب تكلفة الشحن وطباعة بوالص الشحن تلقائياً.',
      },
    ],
  },
  {
    id: 's-mobile-apps',
    slug: 'mobile-app-development',
    title: 'تطوير تطبيقات الهواتف الذكية (iOS & Android)',
    headline: 'تطبيقات هاتفية فائقة السلاسة والأداء بتجربة مستخدم لا تُنسى',
    short_description: 'نصمم ونطور تطبيقات جوال عصرية لهواتف آبل وأندرويد بأداء أصيل وتكامل مع الإشعارات الفورية وبوابات الدفع.',
    detailed_description: `تطبيق الهاتف هو القناة الأقرب لعملائك والأكثر قدرة على تحقيق ولاء مستمر للعلامة التجارية. نطور في أنجزها تطبيقات هواتف ذكية تمتاز بالسرعة الخارقة، التصميم الانسيابي، واستهلاك الطاقة المنخفض.
    
نرافقك من رسم الشاشات الأولى (Wireframes) وحتى اختبار الأداء الشامل ونشر التطبيق رسمياً على متجري App Store و Google Play، مع توفير لوحة تحكم سحابية لإدارة البيانات وإرسال الإشعارات الترويجية الفورية.`,
    icon_name: 'Smartphone',
    hero_badge: 'تطبيقات هواتف ذكية',
    benefits: [
      'تطبيق موحد يعمل بكفاءة قصوى على كل من هواتف iPhone وأجهزة Android.',
      'نظام إشعارات فورية (Push Notifications) لإعادة تفعيل وتنشيط المستخدمين.',
      'أداء سريع واستجابة فورية للمس مع رسوم حركية انسيابية.',
      'حماية فائقة لبيانات العملاء وعمليات تسجيل الدخول والدفع.',
      'مرافقة كاملة في إجراءات الفحص والقبول لدى Apple و Google.',
    ],
    deliverables: [
      'تصميم واجهات وتجربة استخدام تفاعلية كاملة (Figma Prototypes).',
      'الكود المصدري للتطبيق جاهز للإنتاج.',
      'لوحة تحكم إدارية سحابية لإدارة المحتوى والطلبات والمستخدمين.',
      'نشر التطبيق على متجري App Store و Google Play.',
      'ضمان وصيانة برمجية بعد النشر ومعالجة أي تحديثات في أنظمة التشغيل.',
    ],
    suitable_for: [
      'تطبيقات التوصيل والخدمات اللوجستية عند الطلب.',
      'منصات الحجوزات، المواعيد الطبية، وحجوزات الفنادق.',
      'تطبيقات المتاجر الإلكترونية لزيادة مبيعات الهواتف.',
      'منصات التعليم الإلكتروني والدورات التدريبية التفاعلية.',
    ],
    technologies: ['React Native', 'Flutter', 'TypeScript', 'Node.js', 'Firebase Push', 'REST / GraphQL'],
    timeline_estimate: 'من 20 إلى 40 يوم عمل حسب تعقيد الميزات',
    faq: [
      {
        question: 'هل تتولون نشر التطبيق على حساباتنا في Google Play و App Store؟',
        answer: 'نعم، نتولى تجهيز كل متطلبات المتجرين، شهادات التوقيع، ومتابعة إجراءات المراجعة حتى النشر والقبول.',
      },
    ],
  },
  {
    id: 's-management-systems',
    slug: 'management-systems',
    title: 'برمجة الأنظمة الإدارية ونقاط البيع (POS & ERP)',
    headline: 'أنظمة تشغيل داخلية سحابية تضبط العمليات، المخازن، الحسابات، والفواتير بنقرة زر',
    short_description: 'أتمتة أعمالك اليومية بنظام سحابي مرن يربط الفروع، المبيعات، المخزون، والتقارير المالية دون تعقيد.',
    detailed_description: `إدارة العمليات المعقدة بالدفاتر أو الجداول العادية تسبب هدراً كبيراً في الوقت والأرباح. نحن نبني أنظمة سحابية مخصصة لإدارة موارد الشركات (ERP) ونقاط البيع (POS) مصممة لتلائم تماماً الدورة المستندية وطريقة عمل نشاطك التجاري.
    
تتيح لك أنظمتنا مراقبة حركة المبيعات، جرد المخزون في الفروع المختلفة لحظياً، إدارة فواتير المشتريات والموردين، وتوليد تقارير مالية وضريبية دقيقة تساعدك على اتخاذ القرارات الصحيحة في الوقت المناسب.`,
    icon_name: 'LayoutDashboard',
    hero_badge: 'أنظمة إدارية سحابية',
    benefits: [
      'فواتير ضريبية إلكترونية فورية متوافقة مع متطلبات الضرائب ورمز الـ QR.',
      'ربط لحظي بين كافة الفروع والمخازن ونقاط البيع السحابية.',
      'صلاحيات وصول دقيقة للموظفين والكاشير والمشرفين والمديرين.',
      'تقارير أرباح وخسائر وجرد مخزون لحظية بدون تأخير.',
      'إمكانية العمل على التابلت أو أجهزة الكاشير العادية والكمبيوتر.',
    ],
    deliverables: [
      'نظام إدارة سحابي متكامل بقواعد بيانات آمنة ونسخ احتياطي.',
      'واجهة كاشير سريعة تدعم قارئ الباركود وطباعة الإيصالات الحرارية.',
      'وحدة إدارة المخزون، الموردين، والمشتريات.',
      'لوحة تقارير وإحصائيات مالية مفصلة.',
      'دليل تدريب موظفين ودعم فني متواصل.',
    ],
    suitable_for: [
      'متاجر التجزئة، السوبرماركت، والصيدليات.',
      'المطاعم، الكافيهات، وسلاسل الضيافة.',
      'شركات المقاولات، التوريدات، والمخازن المركزية.',
      'العيادات والمراكز الطبية والمختبرات.',
    ],
    technologies: ['React', 'Next.js', 'PostgreSQL', 'WebSockets', 'Tailwind CSS', 'ESC/POS Printing'],
    timeline_estimate: 'من 15 إلى 30 يوم عمل',
    faq: [
      {
        question: 'هل يمكن للنظام العمل في حال انقطاع الإنترنت المؤقت؟',
        answer: 'نعم، نوفر وحدات كاشير تدعم الحفظ المحلي (Offline Storage) وإعادة المزامنة التلقائية فور عودة الاتصال.',
      },
    ],
  },
  {
    id: 's-ai-solutions',
    slug: 'ai-solutions',
    title: 'حلول وأدوات الذكاء الاصطناعي وأتمتة الأعمال',
    headline: 'دمج الذكاء الاصطناعي في خدماتك لخدمة العملاء على مدار الساعة وخفض التكاليف',
    short_description: 'تطوير مساعدين أذكياء مدربين على بيانات نشاطك، وأتمتة الردود على المحادثات واستخراج البيانات آلياً.',
    detailed_description: `الذكاء الاصطناعي لم يعد رفاهية، بل ميزة تنافسية كبرى تقطع التكاليف التشغيلية وتضاعف سرعة خدمة العملاء. نحن في أنجزها نبني حلول ذكاء اصطناعي تطبيقية موجهة مباشرة لخدمة أهداف عملك الحقيقية.
    
نقوم بتدريب نماذج لغوية ذكية على بيانات شركتك، كتالوجات منتجاتك، وأسئلتك الشائعة لتوليد ردود دقيقة 24 ساعة يومياً، إلى جانب حلول استخراج البيانات من المستندات وأتمتة المهام الروتينية لرفع إنتاجية موظفيك.`,
    icon_name: 'Cpu',
    hero_badge: 'ذكاء اصطناعي وأتمتة',
    benefits: [
      'رد آلي ذكي ودقيق على العملاء على مدار الساعة عبر الموقع أو واتساب.',
      'تدريب النماذج على وثائق وملفات وأسعار شركتك الحصرية دون تخمين.',
      'أتمتة المهام اليومية المتكررة وتوفير مئات ساعات العمل لفريقك.',
      'تحليلات عميقة لأسئلة واحتياجات العملاء ورصد المشكلات مبكراً.',
      'حماية وخصوصية تامة لبيانات شركتك وعملائك.',
    ],
    deliverables: [
      'شات بوت ذكاء اصطناعي تفاعلي قابل للتضمين في موقعك وتطبيقاتك.',
      'لوحة تحكم لإدارة قواعد المعرفة وتحديث وثائق التدريب.',
      'ربط مع قنوات المحادثات (واتساب، تيليجرام، الويب).',
      'واجهات برمجة تطبيقات (API) مخصصة لاستخدام الذكاء الاصطناعي في أنظمتك.',
    ],
    suitable_for: [
      'الشركات ذات الحجم الكبير من استفسارات العملاء المتكررة.',
      'منصات التجارة الإلكترونية لمساعدة الزبائن في ترشيح المنتجات.',
      'المؤسسات التعليمية والتدريبية للرد على استفسارات الطلاب.',
      'شركات الـ SaaS والخدمات التقنية.',
    ],
    technologies: ['Gemini API', 'OpenAI API', 'Vector Embeddings', 'LangChain', 'FastAPI', 'Next.js'],
    timeline_estimate: 'من 8 إلى 18 يوم عمل',
    faq: [
      {
        question: 'هل يمكن للشات بوت تحويل المحادثة لموظف بشري إذا واجه سؤالاً معقداً؟',
        answer: 'نعم، يمكن برمجة شروط ذكية تحول العميل فوراً إلى محادثة واتساب أو نظام التذاكر مع موظف بشري.',
      },
    ],
  },
  {
    id: 's-custom-software',
    slug: 'custom-software',
    title: 'تطوير البرمجيات والحلول الرقمية المخصصة (Custom SaaS)',
    headline: 'نبني منصات سحابية وحلولاً برمجية معمّرة ومصممة بدقة لتلائم متطلبات عملك الفريدة',
    short_description: 'تحويل أفكارك الاستثنائية إلى منصات رقمية قابلة للتوسع بملايين الزيارات مع كود نظيف وتوثيق هندسي شامل.',
    detailed_description: `إذا كانت فكرة مشروعك غير تقليدية ولا يمكن تلبيتها بالحلول الجاهزة، فأنت بحاجة إلى فريق هندسي يصمم النظام من الصفر بأدق المعايير العالمية. نحن في أنجزها نبني حلول SaaS ومنصات رقمية متخصصة تضمن لك التوسع دون الحاجة لإعادة كتابة الكود مستقبلاً.
    
نتبع منهجية هندسية صارمة تشمل اختبارات الجودة الأوتوماتيكية، تأمين الثغرات، معمارية الخدمات السحابية، وتقديم كود مصدري منظم وموثق بالكامل لتكون مالكاً كاملاً لأصول مشروعك الرقمية.`,
    icon_name: 'Code2',
    hero_badge: 'هندسة برمجيات مخصصة',
    benefits: [
      'ملكية كاملة 100% للكود المصدري وقواعد البيانات والأصول الرقمية.',
      'بنية معمارية قابلة للتوسع ملايين المستخدمين بدون انهيار السيرفرات.',
      'أعلى معايير الأمان السيبراني وحماية البيانات والتشفير.',
      'اختبارات جودة آلية (Automated Tests) تضمن خلو النظام من العيوب.',
      'توثيق هندسي شامل لواجهات البرمجة (API Documentation).',
    ],
    deliverables: [
      'وثيقة المتصفحات المعمارية وهندسة النظام (System Architecture).',
      'الكود المصدري الكامل للمشروع مع مستودع Git خاص.',
      'بيئة استضافة سحابية مهيأة مع خط أنابيب النشر المستمر (CI/CD).',
      'لوحات تحكم إدارية وشاشات مستخدمين متكاملة.',
      'فترة ضمان وصيانة تشغيلية بعد التسليم.',
    ],
    suitable_for: [
      'رواد الأعمال والشركات الناشئة أصحاب أفكار الـ SaaS الجديدة.',
      'المنصات الوسيطة (Marketplaces) التي تربط بين مقدمي الخدمات والمستخدمين.',
      'المؤسسات التي تتطلب دورات عمل داخلية استثنائية ومعقدة.',
      'الشركات الراغبة في استبدال أنظمتها القديمة بحلول سحابية حديثة.',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS / Vercel', 'Vitest'],
    timeline_estimate: 'من 25 إلى 60 يوم عمل حسب نطاق المشروع',
    faq: [
      {
        question: 'هل نحصل على الكود المصدري بالكامل؟',
        answer: 'نعم، تسلم كافة الأكواد والمستودعات والتوثيق الهندسي لتكون ملكاً خالصاً لشركتك دون أي قيود.',
      },
    ],
  },
  {
    id: 's-maintenance',
    slug: 'website-maintenance',
    title: 'الصيانة الدورية والتأمين السحابي للمواقع والأنظمة',
    headline: 'حماية على مدار الساعة، نسخ احتياطي يومي، وتحديثات برمجية تضمن استقرار مشروعك الدائم',
    short_description: 'حزم صيانة شهرية متكاملة تضمن عمل موقعك وسيرفراتك بأعلى كفاءة وسرعة، مع استجابة فورية لأي طوارئ.',
    detailed_description: `إطلاق الموقع هو فقط بداية الرحلة. بدون صيانة وتحديثات أمنية مستمرة، يصبح موقعك عرضة للثغرات، بطء التحميل، وتراجع الترتيب في محركات البحث. تقدم أنجزها خدمة الرعاية السحابية والصيانة الشاملة للمواقع والأنظمة الرقمية.
    
يتولى فريقنا مراقبة السيرفرات 24/7، عمل نسخ احتياطي يومي، تحديث الحزم البرمجية لمنع الثغرات، وتسريع الاستجابة وحل أي مشكلة تقنية طارئة في دقائق معدودة حتى تتفرغ أنت لإدارة وتنمية أعمالك باطمئنان.`,
    icon_name: 'ShieldCheck',
    hero_badge: 'حماية وصيانة 24/7',
    benefits: [
      'مراقبة لحظية للسيرفرات وتنبيهات فورية عند أي تباطؤ أو انقطاع.',
      'نسخ احتياطي يومي سحابي واستعادة فورية عند أي طارئ بنقرة واحدة.',
      'تحديث دوري للحزم والمكتبات البرمجية وسد الثغرات الأمنية.',
      'فحص مستمر لسرعة الموقع وتحسين مؤشرات الأداء Core Web Vitals.',
      'دعم فني مخصص وسريع عبر قنوات تواصل مباشرة وواتساب.',
    ],
    deliverables: [
      'تقرير أداء وأمان شهري مفصل لحالة موقعك وسيرفراتك.',
      'ساعات عمل شهرية مخصصة لإجراء أي تعديلات أو إضافات برمجية.',
      'فحص أمني دوري ضد البرمجيات الخبيثة وهجمات الحرمان من الخدمة DDoS.',
      'تجديد وإدارة شهادات الأمان SSL والدومين والاستضافة السحابية.',
    ],
    suitable_for: [
      'المتاجر الإلكترونية التي لا تحتمل توقف الموقع لدقيقة واحدة.',
      'مواقع الشركات الكبرى التي تعتمد على البريد والموقع في تعاقداتها.',
      'المنصات التعليمية والطبية ذات الزيارات اليومية المستمرة.',
      'أي صاحب عمل يرغب في راحة البال والتفرغ التام للتسويق والمبيعات.',
    ],
    technologies: ['Vercel Monitoring', 'Uptime Kuma', 'Cloudflare WAF', 'PostgreSQL Backups', 'Sentry Error Tracking'],
    timeline_estimate: 'اشتراكات شهرية وسنوية تبدأ فور التعاقد',
    faq: [
      {
        question: 'ما هي سرعة الاستجابة في حال حدوث عطل طارئ بالموقع؟',
        answer: 'فريقنا متاح على مدار الساعة، وزمن الاستجابة للأعطال الطارئة يقل عن 15 دقيقة لمشتركي باقات الصيانة.',
      },
    ],
  },
  {
    id: 's-technical-seo',
    slug: 'technical-seo',
    title: 'تحسين محركات البحث التقني والتصدر العضوي (Technical SEO)',
    headline: 'نهيئ موقعك لتصدر نتائج البحث الأولى، وجذب زيارات مؤهلة تحقق مبيعات مستدامة',
    short_description: 'هندسة بنية موقعك، تسريع Core Web Vitals، وضبط بيانات Schema JSON-LD لتتصدر المنافسين في جوجل.',
    detailed_description: `أفضل موقع في العالم لا قيمة له إذا لم يستطع عملاؤك العثور عليه في نتائج البحث الأولى. يركز فريق أنجزها على تحسين محركات البحث التقني (Technical SEO) الذي تبحث عنه عناكب جوجل ومحركات الذكاء الاصطناعي لرفع موثوقية موقعك.
    
نقوم بإعادة هيكلة العناوين والرابط الداخلية، توليد ملفات Sitemap و Robots ديناميكية، تصحيح الأكواد وبناء بيانات Schema.org الغنية، وتخفيض زمن الاستجابة إلى أقصى حد ممكن ليحصل موقعك على تقييمات خضراء في أداة Google PageSpeed Insights.`,
    icon_name: 'Search',
    hero_badge: 'تصدر محركات البحث',
    benefits: [
      'تحقيق العلامة الكاملة 95+ في مؤشرات الأداء وسرعة التحميل من جوجل.',
      'بناء خريطة بيانات Schema JSON-LD متقدمة تمكن جوجل من فهم خدماتك.',
      'بنية روابط داخلية نظيفة ومعمارية صفحات خالية من الأخطاء والروابط المكسورة.',
      'تصدر الكلمات المفتاحية ذات القيمة التجارية العالية في قطاعك.',
      'تقارير دورية دقيقة لحركة الزيارات، النقرات، ومعدلات النمو العضوي.',
    ],
    deliverables: [
      'فحص تقني شامل لعيوب الموقع الحالية مع خطة تصحيح مفصلة.',
      'تطبيق كافة الإصلاحات التقنية على الكود والواجهات وقواعد البيانات.',
      'إعداد وربط منصة Google Search Console و Google Analytics 4.',
      'ملف خريطة الموقع (Sitemap Index) ديناميكي متجدد تلقائياً.',
      'متابعة شهرية للكلمات المفتاحية والظهور في نتائج البحث العربية.',
    ],
    suitable_for: [
      'الشركات الراغبة في تدفق عملاء دائم دون الاعتماد فقط على الإعلانات الممولة.',
      'المتاجر الإلكترونية لزيادة مبيعات المنتجات في نتائج البحث المجانية.',
      'المراكز الطبية ومكاتب الخدمات المهنية محلياً ودولياً.',
      'المنصات والمواقع التي تعاني من بطء في الأرشفة أو تراجع الزيارات.',
    ],
    technologies: ['JSON-LD Schemas', 'Next.js Metadata API', 'Google Search Console', 'Lighthouse 11', 'OpenGraph Protocol'],
    timeline_estimate: 'تنفيذ فني أولي خلال 7 أيام، والنتائج التراكمية خلال 30 إلى 90 يوماً',
    faq: [
      {
        question: 'متى تبدأ نتائج تحسين محركات البحث في الظهور؟',
        answer: 'التحسينات التقنية وسرعة الموقع تظهر وتُعتمد فورياً من جوجل خلال 3-7 أيام، بينما يرتفع الترتيب والزيارات العضوية تدريجياً خلال 4-8 أسابيع.',
      },
    ],
  },
];

export const INITIAL_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'b-1',
    slug: 'how-to-choose-between-ready-made-and-custom-software',
    title: 'كيف تختار بين شراء نظام برمجي جاهز أو تطوير مشروعك الرقمي من الصفر؟',
    excerpt: 'مقارنة هندسية ومالية شاملة تساعد أصحاب الشركات ورواد الأعمال على اتخاذ القرار الصحيح بين سرعة النماذج الجاهزة ومرونة البناء المخصص.',
    content: `عندما يقرر رائد الأعمال أو صاحب الشركة إطلاق مشروعه الرقمي، يواجه السؤال الأبرز: هل أبدأ بنظام أو قالب جاهز أم أقوم بتطوير نظام مخصص بالكامل من الصفر؟

### 1. الحلول الجاهزة (Ready-Made Products):
تعتبر النماذج الجاهزة الخيار الأمثل عندما يكون الهدف هو:
- **سرعة الإطلاق:** البدء خلال أيام قليلة واختبار الفكرة في السوق فوراً.
- **التكلفة الأولية المنخفضة:** استثمار مالي معقول يناسب البدايات.
- **الاستقرار المثبت:** النظام تم اختباره مسبقاً مع عملاء حقيقيين.

### 2. البناء المخصص (Custom Software Engineering):
يكون التطوير المخصص ضرورياً وحتمياً عندما:
- تكون فكرة مشروعك فريدة ولها دورة عمل خاصة لا يمكن للبرامج الجاهزة استيعابها.
- تخطط للتوسع لملايين الزيارات والمعاملات اليومية وتحتاج بنية تحتية قوية.
- تحتاج لربط أنظمة داخلية متعددة ومعقدة وامتلاك الكود المصدري بالكامل.

### الخلاصة وتوصية "أنجزها":
في منصة "أنجزها"، نوفر لك كلا المسارين بوضوح وموثوقية: يمكنك اختيار نموذج حقيقي من معرض مشاريعنا وتخصيصه لإطلاقه في أيام، أو بدء جلسة استكشاف لبناء مشروعك الفريد بالكامل على مقاس أهدافك.`,
    author: {
      name: 'فريق أنجزها الهندسي',
      role: 'قسم هندسة وتطوير المنتجات الرقمية',
      avatar: '/projects/ibrahem-kassap-photo.png',
    },
    category: 'هندسة البرمجيات',
    tags: ['نظم مخصصة', 'نماذج جاهزة', 'استشارات برمجية', 'تطوير المواقع'],
    read_time: '5 دقائق',
    published_at: '2026-03-15T09:00:00Z',
    updated_at: '2026-03-15T09:00:00Z',
    cover_image: '/projects/miraj-cover.png',
  },
  {
    id: 'b-2',
    slug: 'core-web-vitals-and-conversion-rates-guide',
    title: 'دليل مؤشرات تجربة الصفحة (Core Web Vitals) وتأثير سرعة الموقع على مضاعفة المبيعات',
    excerpt: 'كيف تؤدي ثانية واحدة في سرعة تحميل الموقع إلى زيادة معدل التحويل بنسبة تتجاوز 20%، والخطوات الهندسية المتبعة في منصة أنجزها.',
    content: `تؤكد أحدث دراسات جوجل لتجربة المستخدم أن المواقع التي تتأخر ثانية واحدة إضافية في التحميل تخسر في المتوسط 7% من المبيعات و 11% من مشاهدات الصفحات.

### ما هي مؤشرات Core Web Vitals الأساسية؟
1. **LCP (Largest Contentful Paint):** قياس زمن ظهور أكبر عنصر بصري في الصفحة (الهدف: أقل من 2.5 ثانية).
2. **INP (Interaction to Next Paint):** قياس سرعة استجابة الموقع لنقرات وتفاعلات الزائر (الهدف: أقل من 200 مللي ثانية).
3. **CLS (Cumulative Layout Shift):** قياس استقرار العناصر البصرية ومنع اهتزازها أثناء التحميل (الهدف: أقل من 0.1).

### كيف نحقق هذه المعايير في مشاريع أنجزها؟
- استخدام المعمارية الحديثة مع Next.js و React Server Components.
- ضغط الصور وتوليد صيغ WebP الحديثة مع تحديد أبعاد واضحة لتفادي انزلاق الشاشة.
- التخلص من الأكواد الزائدة والمكتبات الثقيلة غير الضرورية.
- استضافة المواقع على شبكات توزيع عالمية فائقة السرعة Vercel Edge CDN.`,
    author: {
      name: 'م. إبراهيم كساب',
      role: 'Principal Software Architect',
      avatar: '/projects/ibrahem-kassap-photo.png',
    },
    category: 'أداء الويب والـ SEO',
    tags: ['Core Web Vitals', 'سرعة المواقع', 'تحسين التحويل', 'Google Lighthouse'],
    read_time: '4 دقائق',
    published_at: '2026-03-10T14:00:00Z',
    updated_at: '2026-03-10T14:00:00Z',
    cover_image: '/projects/domzi-cover.png',
  },
  {
    id: 'b-3',
    slug: 'building-high-converting-ecommerce-store-mena',
    title: 'أسرار بناء متجر إلكتروني فائق التحويل في مصر والشرق الأوسط لعام 2026',
    excerpt: 'تحليل لأهم عوامل نجاح المتاجر العربية: الدفع عند الاستلام، المحافظ الإلكترونية، سلاسة تجربة الموبايل، والواتساب الذكي.',
    content: `سوق التجارة الإلكترونية في الشرق الأوسط ومصر يشهد نمواً متسارعاً، ولكن التحدي الأكبر يظل "معدل التحويل" (Conversion Rate). كيف تجعل الزائر يثق في متجرك ويضغط "تأكيد الطلب"؟

### 1. بوابات الدفع المحلية المتنوعة:
في مصر، الدفع عبر المحافظ الإلكترونية مثل "فودافون كاش" و "إنستاباي" بالإضافة إلى خيارات الدفع اللاحق (Buy Now Pay Later) مثل تابي وتمارا أصبح عاملاً حاسماً في إتمام الصفقات.

### 2. زر الشراء عبر الواتساب:
العميل العربي يفضل التفاعل المباشر. إضافة خيار "طلب سريع بالواتساب" بجانب زر الدفع الإلكتروني يرفع المبيعات بنسبة تصل إلى 35% خاصة للمنتجات التي تحتاج لاستفسار سريع.

### 3. تجربة موبايل لا تقبل المساومة:
أكثر من 85% من عمليات الشراء تتم عبر الهاتف المحمول. يجب أن تكون صفحة الدفع بسيطة ومباشرة دون طلب حقول غير ضرورية.

في "أنجزها"، نصمم جميع متاجرنا لتراعي هذه الخصائص النفسية والسلوكية للمتسوق العربي لنضمن لأصحاب الأعمال أعلى عائد على استثماراتهم الإعلانية.`,
    author: {
      name: 'فريق أنجزها الهندسي',
      role: 'خبراء تحسين معدل التحويل (CRO)',
      avatar: '/projects/ibrahem-kassap-photo.png',
    },
    category: 'التجارة الإلكترونية',
    tags: ['متاجر إلكترونية', 'معدل التحويل', 'بوابات الدفع', 'تجربة المستخدم العربي'],
    read_time: '6 دقائق',
    published_at: '2026-03-05T12:00:00Z',
    updated_at: '2026-03-05T12:00:00Z',
    cover_image: '/projects/fatora-cover.png',
  },
];
