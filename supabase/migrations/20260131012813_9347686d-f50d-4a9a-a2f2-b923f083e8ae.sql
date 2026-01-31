-- Add policy to allow authenticated users to view other profiles
-- This enables community features like seeing who submitted testimonials
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);