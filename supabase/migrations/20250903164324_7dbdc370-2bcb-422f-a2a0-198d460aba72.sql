-- Import animals from provided JSON, mapping fields to existing schema
-- Mapping rules:
-- - type -> species
-- - status "Hopefully Waiting for You" -> sponsor_status='available', sponsor_name=NULL
-- - status "Loved by <Name>" -> sponsor_status='sponsored', sponsor_name='<Name>'
-- - ignore provided numeric ids; let DB generate UUIDs

-- 1) Luna (Horse): available
INSERT INTO public.animals (name, species, age, story, sponsor_status, sponsor_name)
SELECT 'Luna', 'Horse', NULL,
       'Luna was rescued from a nearby village where she had been left without care. She now roams free with the herd and loves apples.',
       'available', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.animals a WHERE a.name = 'Luna' AND a.species = 'Horse'
);

-- 2) Diego (Mule): available
INSERT INTO public.animals (name, species, age, story, sponsor_status, sponsor_name)
SELECT 'Diego', 'Mule', NULL,
       'Diego is a gentle giant mule who carried firewood in his past life. Now he enjoys peaceful days under the olive trees.',
       'available', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.animals a WHERE a.name = 'Diego' AND a.species = 'Mule'
);

-- 3) Estrella (Horse): Loved by Anna -> sponsored by Anna
INSERT INTO public.animals (name, species, age, story, sponsor_status, sponsor_name)
SELECT 'Estrella', 'Horse', NULL,
       'Estrella is the youngest mare on the ranch. Curious and full of energy, she’s always the first to greet new visitors.',
       'sponsored', 'Anna'
WHERE NOT EXISTS (
  SELECT 1 FROM public.animals a WHERE a.name = 'Estrella' AND a.species = 'Horse'
);

-- 4) Bella (Dog): available
INSERT INTO public.animals (name, species, age, story, sponsor_status, sponsor_name)
SELECT 'Bella', 'Dog', NULL,
       'Bella was abandoned as a puppy, but she quickly became the ranch’s most loyal guardian and a favorite with visitors.',
       'available', NULL
WHERE NOT EXISTS (
  SELECT 1 FROM public.animals a WHERE a.name = 'Bella' AND a.species = 'Dog'
);

-- 5) Sol (Cat): Loved by Marco -> sponsored by Marco
INSERT INTO public.animals (name, species, age, story, sponsor_status, sponsor_name)
SELECT 'Sol', 'Cat', NULL,
       'Sol was found in the olive groves as a stray kitten. She loves sunbathing on the farmhouse windowsill.',
       'sponsored', 'Marco'
WHERE NOT EXISTS (
  SELECT 1 FROM public.animals a WHERE a.name = 'Sol' AND a.species = 'Cat'
);
