-- Create volunteers table for Free Herd Circle
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  hours INTEGER NOT NULL DEFAULT 0,
  badges TEXT[] NOT NULL DEFAULT '{}',
  quote TEXT,
  joined_date DATE NOT NULL DEFAULT CURRENT_DATE,
  avatar_emoji TEXT DEFAULT '🌾',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteers table
CREATE POLICY "Volunteers are viewable by everyone" 
ON public.volunteers 
FOR SELECT 
USING (true);

CREATE POLICY "Only admins can insert volunteers" 
ON public.volunteers 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can update volunteers" 
ON public.volunteers 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can delete volunteers" 
ON public.volunteers 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_volunteers_updated_at
BEFORE UPDATE ON public.volunteers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample volunteer data
INSERT INTO public.volunteers (name, role, hours, badges, quote, joined_date, avatar_emoji) VALUES
('Maria Santos', 'Grove Restoration Volunteer', 42, ARRAY['🌳 Tree Planter', '🌊 Water Guardian', '✨ Monthly Helper'], 'Working with my hands in this peaceful place heals something in my soul.', '2024-03-01', '🌾'),
('Jake Thompson', 'Animal Care Assistant', 68, ARRAY['🐴 Horse Whisperer', '🏗️ Fence Builder', '🌟 Leadership'], 'Every fence post I set is a foundation for freedom.', '2024-01-01', '🌾'),
('The Chen Family', 'Weekend Warriors', 24, ARRAY['👨‍👩‍👧‍👦 Family Team', '🌱 New Growth'], 'Teaching our children that caring creates community.', '2024-04-01', '🌾');