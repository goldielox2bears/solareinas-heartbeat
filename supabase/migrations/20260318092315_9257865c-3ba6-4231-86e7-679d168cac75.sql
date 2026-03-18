
-- Drop existing permissive update policy
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- New policy: users can update own profile but NOT elevate role
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (
  auth.uid() = user_id
  AND (role IS NULL OR role = 'member')
);

-- Fix INSERT policy
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id
  AND (role IS NULL OR role = 'member')
);
