-- ====================================================================
-- ENGEZHA (انجزها) - Migration 002: Customer Auth, Profiles, Reviews & Inquiries
-- ====================================================================

-- 1. Customer Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 2. Extend Reviews Table with user_id and unique constraint
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Enforce one review per user per project
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_project_user 
ON reviews(project_id, user_id) 
WHERE user_id IS NOT NULL;

-- 3. Extend Project Inquiries Table with user_id, budget_currency, and project_title
ALTER TABLE project_inquiries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE project_inquiries ADD COLUMN IF NOT EXISTS budget_currency VARCHAR(10) DEFAULT 'EGP';
ALTER TABLE project_inquiries ADD COLUMN IF NOT EXISTS project_title VARCHAR(255);
ALTER TABLE project_inquiries ADD COLUMN IF NOT EXISTS additional_features TEXT;

CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON project_inquiries(user_id);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES UPDATE
-- ====================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
CREATE POLICY "Users can read own profile" ON profiles 
FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles 
FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admin view all profiles" ON profiles;
CREATE POLICY "Admin view all profiles" ON profiles 
FOR SELECT TO authenticated USING (true);

-- Reviews: Authenticated customers can insert and update their own review
DROP POLICY IF EXISTS "Authenticated users insert review" ON reviews;
CREATE POLICY "Authenticated users insert review" ON reviews 
FOR INSERT TO authenticated 
WITH CHECK (
    auth.uid() = user_id AND 
    rating >= 1 AND rating <= 5 AND 
    length(trim(comment)) > 0 AND 
    length(comment) <= 1500
);

DROP POLICY IF EXISTS "Users update own review" ON reviews;
CREATE POLICY "Users update own review" ON reviews 
FOR UPDATE TO authenticated 
USING (auth.uid() = user_id) 
WITH CHECK (
    auth.uid() = user_id AND 
    rating >= 1 AND rating <= 5 AND 
    length(trim(comment)) > 0 AND 
    length(comment) <= 1500
);

-- Inquiries: Authenticated users can view their own inquiries
DROP POLICY IF EXISTS "Users view own inquiries" ON project_inquiries;
CREATE POLICY "Users view own inquiries" ON project_inquiries 
FOR SELECT TO authenticated 
USING (auth.uid() = user_id);

-- Automatic Profile Creation Trigger on Auth Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, email, created_at, updated_at)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    new.email,
    now(),
    now()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
