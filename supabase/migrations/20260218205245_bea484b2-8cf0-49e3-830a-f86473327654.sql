-- Drop the existing INSERT policy that only allows authenticated users
DROP POLICY IF EXISTS "Authenticated users can create unverified sponsorships" ON public.sponsorships;

-- Create a new policy that allows both anon and authenticated users to submit sponsorships
CREATE POLICY "Anyone can create unverified sponsorships"
ON public.sponsorships
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM animals
    WHERE animals.id = sponsorships.animal_id
    AND animals.available_for_sponsorship = true
  )
  AND (user_id IS NULL OR user_id = auth.uid())
  AND admin_verified = false
);