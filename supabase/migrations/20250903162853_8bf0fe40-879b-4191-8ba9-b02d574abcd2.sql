-- Create animals table for the sanctuary rescue ledger
CREATE TABLE public.animals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age INTEGER,
  story TEXT,
  photo_url TEXT,
  sponsor_status TEXT NOT NULL DEFAULT 'available' CHECK (sponsor_status IN ('available', 'pending', 'sponsored')),
  sponsor_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (animals are public information)
CREATE POLICY "Animals are viewable by everyone" 
ON public.animals 
FOR SELECT 
USING (true);

-- Create policies for authenticated users to manage animals
CREATE POLICY "Authenticated users can insert animals" 
ON public.animals 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update animals" 
ON public.animals 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete animals" 
ON public.animals 
FOR DELETE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_animals_updated_at
BEFORE UPDATE ON public.animals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample animals for the sanctuary
INSERT INTO public.animals (name, species, age, story, sponsor_status) VALUES
('Luna', 'Horse', 8, 'Luna came to us after being rescued from neglect. She has blossomed into a gentle soul who loves carrots and morning brushing sessions.', 'available'),
('Oliver', 'Goat', 3, 'Oliver arrived as an orphaned baby and has grown into our resident comedian. He keeps everyone entertained with his playful antics.', 'sponsored'),
('Daisy', 'Cow', 12, 'Daisy spent years in industrial farming before finding peace at our sanctuary. She now enjoys sunny pastures and the company of her herd.', 'available'),
('Winston', 'Pig', 5, 'Winston was surrendered when he grew too large for his family home. This intelligent fellow loves belly rubs and solving puzzle feeders.', 'pending'),
('Sage', 'Chicken', 2, 'Sage was rescued from a battery farm and took months to trust humans again. She now rules the roost with gentle confidence.', 'available');