-- Create sponsorships table for animal adoptions
CREATE TABLE public.sponsorships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE NOT NULL,
  sponsor_name TEXT NOT NULL,
  sponsor_email TEXT NOT NULL,
  sponsorship_type TEXT NOT NULL CHECK (sponsorship_type IN ('monthly', 'annual')),
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'completed')),
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  payment_method TEXT,
  stripe_subscription_id TEXT,
  special_requests TEXT,
  founding_guardian BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sponsorships ENABLE ROW LEVEL SECURITY;

-- Create policies for sponsorships
CREATE POLICY "Users can view their own sponsorships" 
ON public.sponsorships 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create sponsorships" 
ON public.sponsorships 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own sponsorships" 
ON public.sponsorships 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sponsorships" 
ON public.sponsorships 
FOR SELECT 
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update all sponsorships" 
ON public.sponsorships 
FOR UPDATE 
USING (is_admin(auth.uid()));

-- Add sponsorship pricing to animals table
ALTER TABLE public.animals 
ADD COLUMN monthly_sponsorship_cents INTEGER,
ADD COLUMN annual_sponsorship_cents INTEGER,
ADD COLUMN available_for_sponsorship BOOLEAN DEFAULT true,
ADD COLUMN current_sponsors_count INTEGER DEFAULT 0,
ADD COLUMN max_sponsors INTEGER DEFAULT 1;

-- Create trigger for automatic timestamp updates on sponsorships
CREATE TRIGGER update_sponsorships_updated_at
BEFORE UPDATE ON public.sponsorships
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update existing animals with sponsorship pricing
UPDATE public.animals 
SET 
  monthly_sponsorship_cents = CASE 
    WHEN species ILIKE '%horse%' OR species ILIKE '%mule%' THEN 7500
    WHEN species ILIKE '%dog%' THEN 4000
    WHEN species ILIKE '%cat%' THEN 2000
    ELSE 3000
  END,
  annual_sponsorship_cents = CASE 
    WHEN species ILIKE '%horse%' OR species ILIKE '%mule%' THEN 90000
    WHEN species ILIKE '%dog%' THEN 48000
    WHEN species ILIKE '%cat%' THEN 24000
    ELSE 36000
  END,
  available_for_sponsorship = true;