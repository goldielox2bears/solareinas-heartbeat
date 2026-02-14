
-- Create gifts table to store gift submissions
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  message TEXT,
  amount_cents INTEGER NOT NULL,
  gift_type TEXT NOT NULL, -- 'project', 'animal', or 'custom'
  gift_target TEXT, -- project name or animal name
  animal_id UUID REFERENCES public.animals(id),
  status TEXT NOT NULL DEFAULT 'pending',
  notified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- Public can insert gifts (with validation)
CREATE POLICY "Anyone can submit a gift"
ON public.gifts
FOR INSERT
WITH CHECK (
  donor_name IS NOT NULL
  AND length(trim(donor_name)) >= 2
  AND donor_email IS NOT NULL
  AND donor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND amount_cents > 0
  AND gift_type IN ('project', 'animal', 'custom')
);

-- Only admins can view gifts
CREATE POLICY "Only admins can view gifts"
ON public.gifts
FOR SELECT
USING (is_admin(auth.uid()));

-- Only admins can update gifts
CREATE POLICY "Only admins can update gifts"
ON public.gifts
FOR UPDATE
USING (is_admin(auth.uid()));

-- Only admins can delete gifts
CREATE POLICY "Only admins can delete gifts"
ON public.gifts
FOR DELETE
USING (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_gifts_updated_at
BEFORE UPDATE ON public.gifts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
