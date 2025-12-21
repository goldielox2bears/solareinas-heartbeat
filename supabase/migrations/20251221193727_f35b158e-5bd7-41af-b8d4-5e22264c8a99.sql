-- Fix: Prevent authenticated users from harvesting donor emails
-- Users should only be able to see their OWN sponsorships, admins can see all

-- Drop the confusing/conflicting SELECT policies
DROP POLICY IF EXISTS "Block anonymous access to sponsorships" ON public.sponsorships;
DROP POLICY IF EXISTS "Users can view their own sponsorships" ON public.sponsorships;
DROP POLICY IF EXISTS "Admins can view all sponsorships" ON public.sponsorships;

-- Create a single, clear SELECT policy:
-- Users can only view their own sponsorships (where user_id matches auth.uid())
-- Admins can view all sponsorships
CREATE POLICY "Users can only view their own sponsorships"
ON public.sponsorships
FOR SELECT
USING (
  (auth.uid() = user_id) OR is_admin(auth.uid())
);