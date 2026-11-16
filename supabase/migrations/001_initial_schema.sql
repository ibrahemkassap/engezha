-- ====================================================================
-- ENGEZHA (انجزها) - Database Schema Migration
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Project Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    cover_image TEXT NOT NULL,
    gallery_images TEXT[] NOT NULL DEFAULT '{}',
    project_type VARCHAR(100) NOT NULL,
    technology_tags TEXT[] NOT NULL DEFAULT '{}',
    features TEXT[] NOT NULL DEFAULT '{}',
    problem_solved TEXT,
    is_demo BOOLEAN NOT NULL DEFAULT true,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for category lookup and slug lookup
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    display_name VARCHAR(120) NOT NULL,
    comment TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    is_hidden BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reviews_project ON reviews(project_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);

-- View for Project Rating Aggregations
CREATE OR REPLACE VIEW project_rating_summary AS
SELECT 
    project_id,
    ROUND(AVG(rating)::numeric, 1) AS avg_rating,
    COUNT(id)::int AS review_count
FROM reviews
WHERE is_hidden = false
GROUP BY project_id;

-- 5. Project Inquiries Table
CREATE TABLE IF NOT EXISTS project_inquiries (
    id VARCHAR(30) PRIMARY KEY, -- Formatted readable ID: e.g. ENG-2026-XXXX
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    category_name VARCHAR(150),
    execution_mode VARCHAR(30) NOT NULL CHECK (execution_mode IN ('existing_project', 'custom_project')),
    selected_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    selected_project_title VARCHAR(255),
    description TEXT NOT NULL,
    budget_range VARCHAR(100),
    desired_timeframe VARCHAR(100),
    status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'in_progress', 'completed', 'closed')),
    notification_status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed')),
    notification_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON project_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON project_inquiries(created_at DESC);

-- 6. Inquiry Attachments Table
CREATE TABLE IF NOT EXISTS inquiry_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id VARCHAR(30) NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    is_voice_recording BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_attachments_inquiry ON inquiry_attachments(inquiry_id);

-- 7. Inquiry Internal Notes Table (Admin Only)
CREATE TABLE IF NOT EXISTS inquiry_internal_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id VARCHAR(30) NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
    author_email VARCHAR(255) NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notes_inquiry ON inquiry_internal_notes(inquiry_id);

-- 8. Email Notification Logs Table
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id VARCHAR(30) NOT NULL REFERENCES project_inquiries(id) ON DELETE CASCADE,
    recipient VARCHAR(255) NOT NULL,
    status VARCHAR(30) NOT NULL CHECK (status IN ('sent', 'failed')),
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_notification_logs_inquiry ON notification_logs(inquiry_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiry_internal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Categories: Public read, Admin manage
CREATE POLICY "Public categories read" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin categories manage" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Projects: Public read published only, Admin manage all
CREATE POLICY "Public projects read" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admin projects manage" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Reviews: Public read visible, Public insert with rating constraint, Admin manage all
CREATE POLICY "Public reviews read" ON reviews FOR SELECT USING (is_hidden = false);
CREATE POLICY "Public reviews insert" ON reviews FOR INSERT WITH CHECK (
    rating >= 1 AND rating <= 5 AND length(trim(comment)) > 0 AND length(comment) <= 1500
);
CREATE POLICY "Admin reviews manage" ON reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inquiries: Public insert only, authenticated admin view & update
CREATE POLICY "Public inquiries insert" ON project_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin inquiries manage" ON project_inquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inquiry Attachments: Public insert, authenticated admin view & manage
CREATE POLICY "Public inquiry attachments insert" ON inquiry_attachments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin inquiry attachments manage" ON inquiry_attachments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Internal Notes: Authenticated admin only
CREATE POLICY "Admin internal notes manage" ON inquiry_internal_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Notification Logs: Authenticated admin only
CREATE POLICY "Admin notification logs manage" ON notification_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enable Realtime for reviews table
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
