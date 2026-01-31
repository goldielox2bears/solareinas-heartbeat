-- Add Buffy the dog to the animals table
INSERT INTO public.animals (
  name,
  species,
  photo_url,
  story,
  sponsor_status,
  age,
  available_for_sponsorship,
  monthly_sponsorship_cents
) VALUES (
  'Buffy',
  'Dog',
  '/images/buffy.jpeg',
  'She is the queen with the heart of a princess. Rescued from Attawapiskat, a native reservation in Northern Ontario Canada, she is 15 years old and sings when one of her favourite people visit. She is the leader of the pack and the forever puppy, ready for anything. Her recent cancer tumour removal was successful and she continues to announce the joy of every new day!',
  'available',
  15,
  true,
  3500
);