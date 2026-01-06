-- Create community testimonials table
CREATE TABLE public.community_testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  photo_url TEXT,
  approval_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved testimonials
CREATE POLICY "Anyone can view approved testimonials"
ON public.community_testimonials
FOR SELECT
USING (approval_status = 'approved');

-- Authenticated users can view their own testimonials
CREATE POLICY "Users can view their own testimonials"
ON public.community_testimonials
FOR SELECT
USING (auth.uid() = user_id);

-- Authenticated users can submit testimonials
CREATE POLICY "Authenticated users can submit testimonials"
ON public.community_testimonials
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending testimonials
CREATE POLICY "Users can update their own pending testimonials"
ON public.community_testimonials
FOR UPDATE
USING (auth.uid() = user_id AND approval_status = 'pending');

-- Admins can manage all testimonials
CREATE POLICY "Admins can manage all testimonials"
ON public.community_testimonials
FOR ALL
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_community_testimonials_updated_at
BEFORE UPDATE ON public.community_testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();