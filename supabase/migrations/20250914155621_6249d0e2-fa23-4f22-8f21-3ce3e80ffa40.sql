-- Create volunteer_applications table
CREATE TABLE public.volunteer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  application_type TEXT NOT NULL CHECK (application_type IN ('individual', 'family')),
  volunteer_interests TEXT[] NOT NULL DEFAULT '{}',
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE,
  hours_per_week INTEGER NOT NULL,
  available_from DATE NOT NULL,
  available_to DATE NOT NULL,
  approval_status TEXT NOT NULL DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected')),
  user_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT min_commitment_check CHECK (available_to >= available_from + INTERVAL '21 days')
);

-- Enable Row Level Security
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for volunteer_applications table
-- Only approved applications are viewable by everyone
CREATE POLICY "Approved applications are viewable by everyone" 
ON public.volunteer_applications 
FOR SELECT 
USING (approval_status = 'approved');

-- Admins can view all applications
CREATE POLICY "Admins can view all applications" 
ON public.volunteer_applications 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Anyone can submit applications
CREATE POLICY "Anyone can submit applications" 
ON public.volunteer_applications 
FOR INSERT 
WITH CHECK (true);

-- Only admins can update applications (for approval/editing)
CREATE POLICY "Only admins can update applications" 
ON public.volunteer_applications 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Only admins can delete applications
CREATE POLICY "Only admins can delete applications" 
ON public.volunteer_applications 
FOR DELETE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_volunteer_applications_updated_at
BEFORE UPDATE ON public.volunteer_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();