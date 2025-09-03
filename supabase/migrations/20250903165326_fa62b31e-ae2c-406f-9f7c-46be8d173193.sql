-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on animals table
DROP TRIGGER IF EXISTS update_animals_updated_at ON public.animals;
CREATE TRIGGER update_animals_updated_at
    BEFORE UPDATE ON public.animals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();