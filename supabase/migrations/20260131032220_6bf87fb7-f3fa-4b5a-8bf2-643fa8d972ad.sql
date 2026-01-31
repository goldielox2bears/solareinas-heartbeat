-- Seed the 6 products for the Shop

-- 1. THE GROVE BAR (Hero Product)
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy, scent, faq,
  seo_title, seo_description, sort_order
) VALUES (
  'THE GROVE BAR',
  'the-grove-bar',
  true,
  'Olive oil soap • Slow-cured • Ranch bar',
  900,
  'Full-size bar',
  '{}',
  'The bar that started it all. Crafted from our own olive oil, slow-cured for 6 months, and made entirely on the ranch.',
  'Our signature olive oil soap is hand-crafted using estate-grown olives, pressed on solar power, and cured slowly to develop a rich, gentle lather. No palm oil. No shortcuts. Just pure, regenerative care for your skin.',
  ARRAY['Gentle cleansing without stripping natural oils', 'Rich, creamy lather from cold-pressed olive oil', 'Suitable for all skin types including sensitive skin', 'Long-lasting bar that gets better with age'],
  ARRAY['Wet the bar and lather between your hands', 'Apply the rich lather to face and body', 'Rinse thoroughly with warm water', 'Let the bar dry between uses for longest life'],
  ARRAY['Made from our own estate-grown olives', 'Slow-cured for 6 months minimum', 'No palm oil—ever', 'Solar-powered production', 'Zero waste process—everything returns to the land'],
  ARRAY['100% extra virgin olive oil base', 'No synthetic fragrances or preservatives', 'Naturally occurring glycerin retained', 'Simple ingredients you can pronounce'],
  'Unscented, natural olive',
  '[{"question": "How long does one bar last?", "answer": "With proper drying between uses, one bar typically lasts 4-6 weeks of daily use."}, {"question": "Is it safe for sensitive skin?", "answer": "Yes! The gentle olive oil formula is ideal for sensitive and reactive skin types."}, {"question": "Why is it called slow-cured?", "answer": "We cure each bar for a minimum of 6 months, allowing the soap to become harder, longer-lasting, and gentler on skin."}]',
  'THE GROVE BAR | Ranch-Made Olive Oil Soap | Solareinas',
  'Hand-crafted olive oil soap from Solareinas Ranch. Slow-cured for 6 months, made with estate-grown olives. 100% proceeds fund animal rescue and land regeneration.',
  1
);

-- 2. Workday Hand Balm
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy,
  seo_title, seo_description, sort_order
) VALUES (
  'workday hand balm',
  'workday-hand-balm',
  false,
  'Nourish balm • Ranch-tested',
  1200,
  '60ml tin',
  '{}',
  'Tested by hands that work the land.',
  'A rich, protective balm created for hands that work hard. Made with olive oil, shea butter, and ranch-grown lavender. Absorbs quickly without leaving residue.',
  ARRAY['Deep nourishment for dry, working hands', 'Quick absorption—no greasy residue', 'Protective barrier against the elements', 'Subtle lavender scent from our own garden'],
  ARRAY['Warm a small amount between your palms', 'Massage into hands, focusing on dry areas', 'Use after washing hands or before bed'],
  ARRAY['Created for ranch workers, by ranch workers', 'Tested in real working conditions', 'Lavender grown on-site'],
  ARRAY['Olive oil from our groves', 'Ethically sourced shea butter', 'Ranch-grown lavender', 'Beeswax for protection'],
  'Workday Hand Balm | Ranch-Tested Nourishing Balm | Solareinas',
  'Rich hand balm tested by hands that work the land. Made with olive oil, shea butter, and ranch-grown lavender. 100% proceeds fund the sanctuary.',
  2
);

-- 3. Ranch Glow Serum
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy,
  seo_title, seo_description, sort_order
) VALUES (
  'ranch glow serum',
  'ranch-glow-serum',
  false,
  'Fresh-air glow • Daily hydration • 100% natural',
  2400,
  '30ml dropper bottle',
  '{}',
  'The glow that comes from fresh air and good work.',
  'A lightweight daily serum that delivers deep hydration without heaviness. Pure olive oil base enriched with rosehip and vitamin E for that healthy, outdoor glow.',
  ARRAY['Lightweight daily hydration', 'Absorbs quickly without oiliness', 'Promotes healthy, radiant skin', 'Perfect under makeup or alone'],
  ARRAY['Apply 3-4 drops to clean, damp skin', 'Gently press into face and neck', 'Use morning and evening for best results'],
  ARRAY['Inspired by the glow of ranch life', 'Olive oil cold-pressed from our groves', 'Simple, effective formula'],
  ARRAY['Cold-pressed olive oil', 'Rosehip seed oil', 'Vitamin E', 'No synthetic additives'],
  'Ranch Glow Serum | Daily Hydration Serum | Solareinas',
  'Lightweight daily serum for healthy, radiant skin. Made with cold-pressed olive oil and rosehip. 100% proceeds fund animal rescue.',
  3
);

-- 4. Soft Earth Powder Polish
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy,
  seo_title, seo_description, sort_order
) VALUES (
  'soft earth powder polish',
  'soft-earth-powder-polish',
  false,
  'Polish + rinse • Glow (get the grit off)',
  1800,
  '100g jar',
  '{}',
  'Sometimes you need to get the grit off.',
  'A gentle exfoliating powder that activates with water. Made with finely ground olive pits and white clay to polish away dullness and reveal fresh, glowing skin.',
  ARRAY['Gentle physical exfoliation', 'Removes dead skin and dullness', 'Reveals fresh, radiant skin', 'Suitable for weekly use'],
  ARRAY['Mix a small amount with water to form a paste', 'Massage gently in circular motions', 'Rinse thoroughly with warm water', 'Follow with serum or moisturizer'],
  ARRAY['Olive pit powder from our own pressing', 'Zero-waste ingredient sourcing', 'Gentle enough for regular use'],
  ARRAY['Finely ground olive pit powder', 'French white kaolin clay', 'Oat flour for softness', 'No microplastics—ever'],
  'Soft Earth Powder Polish | Gentle Exfoliating Polish | Solareinas',
  'Gentle exfoliating powder made with olive pits and white clay. Reveals fresh, glowing skin. 100% proceeds fund the sanctuary.',
  4
);

-- 5. It''s All About the Mane
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy,
  seo_title, seo_description, sort_order
) VALUES (
  'it''s all about the mane',
  'its-all-about-the-mane',
  false,
  'Soothe + soften • Ranch-made',
  1600,
  '100ml bottle',
  '{}',
  'Named for our horses. Made for your hair.',
  'A nourishing hair oil inspired by the care we give our horses'' manes. Light yet deeply conditioning, it tames frizz and adds shine without weighing hair down.',
  ARRAY['Tames frizz and flyaways', 'Adds healthy shine', 'Nourishes without heaviness', 'Safe for all hair types'],
  ARRAY['Apply a few drops to damp or dry hair', 'Focus on mid-lengths and ends', 'Use as a finishing oil or overnight treatment'],
  ARRAY['Inspired by horse mane care', 'Olive oil base from our estate', 'Light formula that never weighs down'],
  ARRAY['Cold-pressed olive oil', 'Argan oil', 'Rosemary extract', 'Natural vitamin E'],
  'It''s All About the Mane | Nourishing Hair Oil | Solareinas',
  'Nourishing hair oil inspired by horse mane care. Tames frizz and adds shine. 100% proceeds fund animal rescue.',
  5
);

-- 6. Afterglow Body Butter
INSERT INTO public.products (
  name, slug, hero, descriptor_line, price_cents, size, images,
  hero_hook, short_description, key_benefits, how_to_use, why_its_different, ingredient_philosophy, scent,
  seo_title, seo_description, sort_order
) VALUES (
  'afterglow body butter',
  'afterglow-body-butter',
  false,
  'Whipped butter • Lavender + sage • Soft + sexy skin • 100% natural',
  2200,
  '200ml jar',
  '{}',
  'For the moment after the work is done.',
  'A luxuriously whipped body butter that melts into skin, leaving it impossibly soft. Scented with ranch-grown lavender and wild sage for a calming, grounding finish to any day.',
  ARRAY['Intensely moisturizing without heaviness', 'Whipped texture melts into skin', 'Calming lavender + sage scent', 'Perfect after-shower luxury'],
  ARRAY['Scoop a generous amount after showering', 'Massage into skin while still slightly damp', 'Allow to absorb fully before dressing'],
  ARRAY['Whipped by hand in small batches', 'Lavender and sage grown on-site', 'Luxurious but never wasteful'],
  ARRAY['Shea butter', 'Olive oil from our groves', 'Coconut oil', 'Ranch-grown lavender + wild sage'],
  'Lavender + Sage',
  'Afterglow Body Butter | Whipped Lavender Sage Butter | Solareinas',
  'Luxuriously whipped body butter with lavender and sage. Soft, sexy skin with 100% natural ingredients. 100% proceeds fund the sanctuary.',
  6
);