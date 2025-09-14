-- Add a new animal to the rescue ledger
INSERT INTO public.animals (name, species, age, story, sponsor_status) 
VALUES (
  'Luna', 
  'Horse', 
  8, 
  'Luna was rescued from a neglectful situation where she was severely underweight and had untreated hoof issues. After months of rehabilitation, she has blossomed into a gentle, trusting companion who loves trail rides and working with children in our therapy programs.',
  'available'
);