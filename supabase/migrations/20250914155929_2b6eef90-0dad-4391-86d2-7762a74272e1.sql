-- Fix security issue: Restrict approved applications to authenticated users only
DROP POLICY "Approved applications are viewable by everyone" ON public.volunteer_applications;

-- Create new policy that requires authentication to view approved applications
CREATE POLICY "Approved applications are viewable by authenticated users" 
ON public.volunteer_applications 
FOR SELECT 
TO authenticated
USING (approval_status = 'approved');