UPDATE public.products
SET
  name = 'The Daily Dew',
  slug = 'the-daily-dew',
  descriptor_line = 'Hydrating serum • Hyaluronic acid + inulin + niacinamide',
  hero_hook = 'A daily hydrating serum that pulls moisture from the air into your skin.',
  short_description = 'Light, dewy, fast-absorbing. Hyaluronic acid, inulin, and niacinamide plump, hydrate, and brighten — like the first hour of morning light.',
  key_benefits = ARRAY[
    'Pulls moisture from the air into the skin',
    'Plumps, hydrates, and brightens',
    'Light, dewy, fast-absorbing finish',
    'Daily hydration anchor of the Solareinas ritual'
  ],
  how_to_use = ARRAY[
    'Apply 3–4 drops to clean, damp skin',
    'Press gently into face and neck',
    'Follow with cream',
    'Use morning and evening'
  ],
  why_its_different = ARRAY[
    'Built around hyaluronic acid — the only ingredient that pulls water from air to skin',
    'Inulin and niacinamide deepen the hydration story',
    'Designed as the daily hydration anchor of the Solareinas ritual line'
  ],
  ingredient_philosophy = ARRAY[
    'Hyaluronic acid — humectant',
    'Inulin — prebiotic humectant',
    'Niacinamide — barrier support and brightening',
    'Supporting humectants only — no fillers'
  ],
  seo_title = 'The Daily Dew | Hydrating Serum with Hyaluronic Acid | Solareinas',
  seo_description = 'A daily hydrating serum with hyaluronic acid, inulin, and niacinamide. Plumps, hydrates, brightens. From the Solareinas ritual line.',
  updated_at = now()
WHERE slug = 'ranch-glow-serum';