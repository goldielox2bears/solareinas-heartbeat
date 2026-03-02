
-- Create retreat signups table
CREATE TABLE public.retreat_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_riders INTEGER NOT NULL DEFAULT 1,
  riders JSONB NOT NULL DEFAULT '[]'::jsonb,
  interest_note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.retreat_signups ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a signup with valid data
CREATE POLICY "Anyone can submit retreat signup"
ON public.retreat_signups
FOR INSERT
WITH CHECK (
  name IS NOT NULL AND length(TRIM(BOTH FROM name)) >= 2
  AND email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND phone IS NOT NULL AND length(TRIM(BOTH FROM phone)) >= 6
  AND number_of_riders > 0 AND number_of_riders <= 6
);

-- Only admins can view signups
CREATE POLICY "Only admins can view retreat signups"
ON public.retreat_signups
FOR SELECT
USING (is_admin(auth.uid()));

-- Only admins can update signups
CREATE POLICY "Only admins can update retreat signups"
ON public.retreat_signups
FOR UPDATE
USING (is_admin(auth.uid()));

-- Only admins can delete signups
CREATE POLICY "Only admins can delete retreat signups"
ON public.retreat_signups
FOR DELETE
USING (is_admin(auth.uid()));

-- Timestamp trigger
CREATE TRIGGER update_retreat_signups_updated_at
BEFORE UPDATE ON public.retreat_signups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
