-- Tighten profiles SELECT policy to prevent public access
-- Drop existing public read policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Ensure RLS is enabled (no-op if already enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow only authenticated users to read profiles
CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Keep existing insert/update self policies as-is
-- INSERT policy: Users can insert their own profile
-- UPDATE policy: Users can update their own profile