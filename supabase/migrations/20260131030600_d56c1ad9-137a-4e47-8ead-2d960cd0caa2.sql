-- Create Products CMS collection for the Shop
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Core fields
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  hero boolean NOT NULL DEFAULT false,
  descriptor_line text,
  price_cents integer NOT NULL,
  size text,
  images text[] DEFAULT '{}',
  
  -- Product page copy sections
  hero_hook text,
  short_description text,
  key_benefits text[] DEFAULT '{}',
  how_to_use text[] DEFAULT '{}',
  why_its_different text[] DEFAULT '{}',
  ingredient_philosophy text[] DEFAULT '{}',
  scent text,
  faq jsonb DEFAULT '[]',
  
  -- SEO fields
  seo_title text,
  seo_description text,
  
  -- Metadata
  available boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone"
ON public.products
FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert products"
ON public.products
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can update products"
ON public.products
FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete products"
ON public.products
FOR DELETE
USING (is_admin(auth.uid()));

-- Create updated_at trigger
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on slug for fast lookups
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_hero ON public.products(hero);
CREATE INDEX idx_products_sort ON public.products(sort_order);