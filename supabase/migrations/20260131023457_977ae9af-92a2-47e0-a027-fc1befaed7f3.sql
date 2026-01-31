-- Add Ebony the cat to the animals table
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
  'Ebony',
  'Cat',
  '/images/ebony.jpeg',
  'He is a kitty that thinks he is a puppy. Ebony is fearless amongst the BIG dog family. Often swatting tails and then snuggling in for a nap in a large furry neck. No claw aggressive and syringe fed as a baby. Only 9 months old. Learning new things every day.',
  'available',
  1,
  true,
  2500
);