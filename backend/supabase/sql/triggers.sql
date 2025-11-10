-- Database Triggers for automatic profile creation
-- Run this in Supabase SQL Editor

-- ============================================
-- AUTO-CREATE USER PROFILE ON AUTH.USERS INSERT
-- ============================================
-- This trigger automatically creates a users_profiles record
-- whenever a new user is created in auth.users

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users_profiles (id, role, name, created_at)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_app_meta_data->>'role')::text, 'authenticated'),
    COALESCE((NEW.raw_user_meta_data->>'name')::text, NEW.email),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists, then create it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
