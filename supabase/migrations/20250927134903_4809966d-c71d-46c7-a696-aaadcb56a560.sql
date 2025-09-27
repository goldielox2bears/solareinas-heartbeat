-- Add policy to block anonymous access to sponsorships table
-- This prevents email harvesting by ensuring only authenticated users can view sponsorship data
CREATE POLICY "Block anonymous access to sponsorships" 
ON public.sponsorships 
FOR SELECT 
TO anon 
USING (false);