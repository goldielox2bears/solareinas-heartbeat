-- Add admin verification column to sponsorships
ALTER TABLE public.sponsorships 
ADD COLUMN admin_verified BOOLEAN NOT NULL DEFAULT false;

-- Add verified_at timestamp and verified_by columns
ALTER TABLE public.sponsorships 
ADD COLUMN verified_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN verified_by UUID REFERENCES auth.users(id);

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Authenticated users can create sponsorships" ON public.sponsorships;

-- Create new INSERT policy - users can create but sponsorships start unverified
CREATE POLICY "Authenticated users can create unverified sponsorships"
ON public.sponsorships
FOR INSERT
TO authenticated
WITH CHECK (
  (EXISTS (
    SELECT 1 FROM animals
    WHERE animals.id = sponsorships.animal_id
    AND animals.available_for_sponsorship = true
  ))
  AND (user_id IS NULL OR user_id = auth.uid())
  AND admin_verified = false
);

-- Drop existing SELECT policy
DROP POLICY IF EXISTS "Users can only view their own sponsorships" ON public.sponsorships;

-- Create new SELECT policy - users see their own, admins see all
CREATE POLICY "Users can view their own sponsorships"
ON public.sponsorships
FOR SELECT
TO authenticated
USING (
  auth.uid() = user_id 
  OR is_admin(auth.uid())
);

-- Drop existing user UPDATE policy  
DROP POLICY IF EXISTS "Users can update their own sponsorships" ON public.sponsorships;

-- Users can only update non-sensitive fields on their own unverified sponsorships
CREATE POLICY "Users can update their own unverified sponsorships"
ON public.sponsorships
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id AND admin_verified = false)
WITH CHECK (auth.uid() = user_id AND admin_verified = false);

-- Keep admin update policy but ensure it allows verification
DROP POLICY IF EXISTS "Admins can update all sponsorships" ON public.sponsorships;

CREATE POLICY "Admins can update and verify all sponsorships"
ON public.sponsorships
FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));