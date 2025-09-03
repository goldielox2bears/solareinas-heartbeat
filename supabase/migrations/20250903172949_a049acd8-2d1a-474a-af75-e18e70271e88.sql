-- Update animals table policies to allow anonymous inserts for demo purposes
-- Drop existing restrictive insert policy
DROP POLICY IF EXISTS "Authenticated users can insert animals" ON public.animals;

-- Create new policy allowing anonymous inserts
CREATE POLICY "Anyone can insert animals" 
ON public.animals 
FOR INSERT 
WITH CHECK (true);

-- Keep other policies as they are for select, update, delete