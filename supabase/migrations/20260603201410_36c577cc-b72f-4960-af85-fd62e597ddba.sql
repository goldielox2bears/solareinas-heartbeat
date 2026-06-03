
-- =========================================================
-- ADDITIVE schema extension — no DROP, no RENAME, no data loss
-- =========================================================

-- ---------- product_categories ----------
CREATE TABLE IF NOT EXISTS public.product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_categories TO authenticated;
GRANT ALL ON public.product_categories TO service_role;

ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Categories viewable by everyone"
    ON public.product_categories FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can insert categories"
    ON public.product_categories FOR INSERT TO authenticated
    WITH CHECK (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can update categories"
    ON public.product_categories FOR UPDATE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can delete categories"
    ON public.product_categories FOR DELETE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TRIGGER IF EXISTS trg_product_categories_updated_at ON public.product_categories;
CREATE TRIGGER trg_product_categories_updated_at
  BEFORE UPDATE ON public.product_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.product_categories (name, slug, description, display_order) VALUES
  ('Skin + Body',               'skin-body',              'Small-batch skincare and body care made on the ranch.', 1),
  ('Equine + Ranch Care',       'equine-ranch-care',      'Useful care for the animals and the hands that care for them.', 2),
  ('Home + Calm',               'home-calm',              'Bring the calm of the farm home — candles, sprays, rituals.', 3),
  ('Gift Boxes',                'gift-boxes',             'Thoughtful ranch-made gifts with purpose.', 4),
  ('Animal Support Collection', 'animal-support',         'Products tied to specific animals and care needs.', 5),
  ('Olive Grove Goods',         'olive-grove',            'Estate olive oil and goods from the grove.', 6)
ON CONFLICT (slug) DO NOTHING;

-- ---------- farm_needs ----------
CREATE TABLE IF NOT EXISTS public.farm_needs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  need_title text NOT NULL,
  need_type text NOT NULL,
  description text,
  estimated_cost numeric(10,2),
  cost_currency text NOT NULL DEFAULT 'EUR',
  impact_unit text,
  animal_related boolean NOT NULL DEFAULT false,
  land_related boolean NOT NULL DEFAULT false,
  urgency_level text NOT NULL DEFAULT 'normal',
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.farm_needs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.farm_needs TO authenticated;
GRANT ALL ON public.farm_needs TO service_role;

ALTER TABLE public.farm_needs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Farm needs viewable by everyone"
    ON public.farm_needs FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can insert farm needs"
    ON public.farm_needs FOR INSERT TO authenticated
    WITH CHECK (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can update farm needs"
    ON public.farm_needs FOR UPDATE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can delete farm needs"
    ON public.farm_needs FOR DELETE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TRIGGER IF EXISTS trg_farm_needs_updated_at ON public.farm_needs;
CREATE TRIGGER trg_farm_needs_updated_at
  BEFORE UPDATE ON public.farm_needs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- product_impact ----------
CREATE TABLE IF NOT EXISTS public.product_impact (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  farm_need_id uuid REFERENCES public.farm_needs(id) ON DELETE SET NULL,
  impact_statement text NOT NULL,
  impact_disclaimer text NOT NULL DEFAULT 'Each purchase contributes to the overall care of the farm — animal feed, veterinary care, land regeneration, and daily operations.',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.product_impact TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_impact TO authenticated;
GRANT ALL ON public.product_impact TO service_role;

ALTER TABLE public.product_impact ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Product impact viewable by everyone"
    ON public.product_impact FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can insert product impact"
    ON public.product_impact FOR INSERT TO authenticated
    WITH CHECK (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can update product impact"
    ON public.product_impact FOR UPDATE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can delete product impact"
    ON public.product_impact FOR DELETE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TRIGGER IF EXISTS trg_product_impact_updated_at ON public.product_impact;
CREATE TRIGGER trg_product_impact_updated_at
  BEFORE UPDATE ON public.product_impact
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- impact_stats ----------
CREATE TABLE IF NOT EXISTS public.impact_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_label text NOT NULL,
  stat_value text NOT NULL,
  stat_context text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.impact_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.impact_stats TO authenticated;
GRANT ALL ON public.impact_stats TO service_role;

ALTER TABLE public.impact_stats ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Impact stats viewable by everyone"
    ON public.impact_stats FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can insert impact stats"
    ON public.impact_stats FOR INSERT TO authenticated
    WITH CHECK (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can update impact stats"
    ON public.impact_stats FOR UPDATE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Only admins can delete impact stats"
    ON public.impact_stats FOR DELETE TO authenticated
    USING (is_admin(auth.uid()));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DROP TRIGGER IF EXISTS trg_impact_stats_updated_at ON public.impact_stats;
CREATE TRIGGER trg_impact_stats_updated_at
  BEFORE UPDATE ON public.impact_stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ---------- products: additive columns only ----------
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS long_description text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS inventory_status text NOT NULL DEFAULT 'in_stock',
  ADD COLUMN IF NOT EXISTS impact_summary text,
  ADD COLUMN IF NOT EXISTS related_animal_id uuid REFERENCES public.animals(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS related_farm_need_id uuid REFERENCES public.farm_needs(id) ON DELETE SET NULL;

-- ---------- animals: additive columns only ----------
ALTER TABLE public.animals
  ADD COLUMN IF NOT EXISTS current_care_needs text,
  ADD COLUMN IF NOT EXISTS monthly_care_estimate numeric(10,2),
  ADD COLUMN IF NOT EXISTS favorite_product_connection text,
  ADD COLUMN IF NOT EXISTS care_status text NOT NULL DEFAULT 'stable',
  ADD COLUMN IF NOT EXISTS impact_story text,
  ADD COLUMN IF NOT EXISTS show_on_impact_page boolean NOT NULL DEFAULT false;

-- ---------- volunteers: additive columns only ----------
ALTER TABLE public.volunteers
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS testimonial text,
  ADD COLUMN IF NOT EXISTS photo_url text,
  ADD COLUMN IF NOT EXISTS dates_or_season text,
  ADD COLUMN IF NOT EXISTS contribution_type text,
  ADD COLUMN IF NOT EXISTS approved_for_public boolean NOT NULL DEFAULT false;
