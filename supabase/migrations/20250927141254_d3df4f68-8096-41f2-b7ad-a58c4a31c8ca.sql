-- Fix security vulnerability: restrict volunteer applications access to admins and applicants only
-- Drop the overly permissive policy that allows any authenticated user to view approved applications
DROP POLICY IF EXISTS "Approved applications are viewable by authenticated users" ON public.volunteer_applications;

-- Create a new secure policy that only allows:
-- 1. Admins to view all applications
-- 2. Users to view only their own applications (if user_id is set)
CREATE POLICY "Secure access to volunteer applications"
ON public.volunteer_applications
FOR SELECT
USING (
  -- Allow admins to view all applications
  is_admin(auth.uid())
  OR
  -- Allow users to view their own applications (when user_id is not null)
  (user_id IS NOT NULL AND auth.uid() = user_id)
);