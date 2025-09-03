-- Fix storage policies to allow anonymous uploads for admin interface
DROP POLICY IF EXISTS "Authenticated users can upload animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update animal photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete animal photos" ON storage.objects;

-- Create new policies that allow anonymous access for admin functionality
CREATE POLICY "Anyone can upload animal photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'animal-photos');

CREATE POLICY "Anyone can update animal photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'animal-photos');

CREATE POLICY "Anyone can delete animal photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'animal-photos');

-- Check if the trigger exists and recreate it properly
DROP TRIGGER IF EXISTS update_animals_updated_at ON public.animals;
CREATE TRIGGER update_animals_updated_at
    BEFORE UPDATE ON public.animals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();