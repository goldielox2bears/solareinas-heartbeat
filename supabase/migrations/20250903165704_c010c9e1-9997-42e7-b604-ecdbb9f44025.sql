-- Create storage bucket for animal photos
INSERT INTO storage.buckets (id, name, public) VALUES ('animal-photos', 'animal-photos', true);

-- Create policies for animal photo uploads
CREATE POLICY "Animal photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'animal-photos');

CREATE POLICY "Authenticated users can upload animal photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'animal-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update animal photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'animal-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete animal photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'animal-photos' AND auth.role() = 'authenticated');