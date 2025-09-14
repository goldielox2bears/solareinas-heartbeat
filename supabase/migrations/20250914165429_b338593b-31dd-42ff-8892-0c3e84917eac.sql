-- Update user role to admin for bohrn.farm@gmail.com
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'bohrn.farm@gmail.com'
);