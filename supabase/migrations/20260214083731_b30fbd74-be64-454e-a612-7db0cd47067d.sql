
-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;

-- Keep existing "Users can view their own profile" and "Admins can view all profiles" policies
-- They already cover the correct access patterns
