export type ProjectCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon_name: string;
  display_order: number;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  detailed_description: string;
  category_id: string;
  category?: ProjectCategory;
  cover_image: string;
  gallery_images: string[];
  project_type: string;
  technology_tags: string[];
  features: string[];
  problem_solved?: string;
  is_demo: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  avg_rating?: number;
  review_count?: number;
  badge?: string;
  accent_color?: string;
  demo_url?: string;
};

export type UserProfile = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  created_at?: string;
  updated_at?: string;
};

export type Review = {
  id: string;
  project_id: string;
  user_id?: string;
  display_name: string;
  comment: string;
  rating: number; // 1 to 5
  is_hidden?: boolean;
  created_at: string;
};

export type InquiryAttachment = {
  id: string;
  inquiry_id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  is_voice_recording: boolean;
  created_at: string;
};

export type InquiryInternalNote = {
  id: string;
  inquiry_id: string;
  author_email: string;
  note: string;
  created_at: string;
};

export type InquiryStatus =
  | 'new'          // جديد
  | 'in_review'    // قيد المراجعة
  | 'contacted'    // تم التواصل
  | 'in_progress'  // قيد التنفيذ
  | 'completed'    // مكتمل
  | 'closed';      // مغلق

export type ProjectInquiry = {
  id: string; // e.g. "ENG-2026-XXXX"
  user_id?: string;
  full_name: string;
  phone: string;
  email: string;
  category_id?: string;
  category_name?: string;
  execution_mode: 'existing_project' | 'custom_project';
  selected_project_id?: string;
  selected_project_title?: string;
  project_title?: string; // Optional working title
  description: string;
  budget_range?: string;
  budget_currency?: 'EGP' | 'USD';
  desired_timeframe?: string;
  additional_features?: string;
  status: InquiryStatus;
  notification_status: 'pending' | 'sent' | 'failed';
  notification_error?: string;
  created_at: string;
  updated_at: string;
  attachments?: InquiryAttachment[];
  internal_notes?: InquiryInternalNote[];
};

export type NotificationLog = {
  id: string;
  inquiry_id: string;
  recipient: string;
  status: 'sent' | 'failed';
  error_message?: string;
  created_at: string;
};

export type BudgetRange = {
  id: string;
  label: string;
  egp: string;
  usd: string;
};
