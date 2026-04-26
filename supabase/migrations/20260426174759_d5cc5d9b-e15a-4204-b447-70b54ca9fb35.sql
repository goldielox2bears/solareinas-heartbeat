UPDATE public.products
SET
  name = 'Ranch Hands Balm',
  slug = 'ranch-hands-balm',
  descriptor_line = 'Olive + beeswax balm • For hardworking hands',
  hero_hook = 'A small-batch olive and beeswax balm for hardworking hands.',
  short_description = 'Made with olive oil from our groves, shea butter, ranch-grown lavender, and beeswax. Rich, protective, and fast-absorbing — built for hands that work the land.',
  seo_title = 'Ranch Hands Balm | Olive + Beeswax Hand Balm | Solareinas',
  seo_description = 'A small-batch olive and beeswax balm for hardworking hands. Made on the ranch with olive oil, shea butter, and lavender. 100% proceeds fund the sanctuary.',
  updated_at = now()
WHERE slug = 'workday-hand-balm';

UPDATE public.products
SET
  name = 'Soft Earth Powder Polish',
  seo_title = 'Soft Earth Powder Polish | Gentle Exfoliating Polish | Solareinas',
  updated_at = now()
WHERE slug = 'soft-earth-powder-polish';

UPDATE public.products
SET
  name = 'Afterglow Body Butter',
  seo_title = 'Afterglow Body Butter | Whipped Lavender Sage Butter | Solareinas',
  updated_at = now()
WHERE slug = 'afterglow-body-butter';

UPDATE public.products
SET
  name = 'It''s All About the Mane',
  seo_title = 'It''s All About the Mane | Nourishing Hair Oil | Solareinas',
  updated_at = now()
WHERE slug = 'its-all-about-the-mane';