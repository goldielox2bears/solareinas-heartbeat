-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can insert animals" ON public.animals;
DROP POLICY IF EXISTS "Authenticated users can delete animals" ON public.animals;
DROP POLICY IF EXISTS "Authenticated users can update animals" ON public.animals;

-- Create secure admin-only policies
CREATE POLICY "Only admins can insert animals" 
ON public.animals 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update animals" 
ON public.animals 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete animals" 
ON public.animals 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));