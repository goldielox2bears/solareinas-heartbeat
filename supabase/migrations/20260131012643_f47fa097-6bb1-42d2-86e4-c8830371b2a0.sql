-- Drop the overly permissive INSERT policies
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can submit applications" ON public.volunteer_applications;

-- Create more restrictive INSERT policy for newsletter_subscribers
-- Ensures email is provided and has valid format (basic check)
CREATE POLICY "Public can subscribe with valid email"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (
  email IS NOT NULL 
  AND length(trim(email)) > 5 
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Create more restrictive INSERT policy for volunteer_applications
-- Ensures required fields are provided and links user_id if authenticated
CREATE POLICY "Public can submit complete applications"
ON public.volunteer_applications
FOR INSERT
TO public
WITH CHECK (
  full_name IS NOT NULL 
  AND length(trim(full_name)) >= 2
  AND application_type IS NOT NULL
  AND available_from IS NOT NULL
  AND available_to IS NOT NULL
  AND hours_per_week > 0
  AND (user_id IS NULL OR user_id = auth.uid())
);