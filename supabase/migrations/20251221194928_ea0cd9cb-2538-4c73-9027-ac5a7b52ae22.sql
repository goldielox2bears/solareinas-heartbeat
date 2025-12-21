-- Fix storage bucket security: Only admins can upload/modify/delete animal photos
-- Keep public read access for viewing photos

-- Drop the existing permissive policies
DROP POLICY IF EXISTS "Anyone can upload animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete animal photos" ON storage.objects;

-- Create admin-only policies for write operations
CREATE POLICY "Only admins can upload animal photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'animal-photos' AND is_admin(auth.uid()));

CREATE POLICY "Only admins can update animal photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'animal-photos' AND is_admin(auth.uid()));

CREATE POLICY "Only admins can delete animal photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'animal-photos' AND is_admin(auth.uid()));