-- Update user role to admin for the specific user ID
UPDATE public.profiles 
SET role = 'admin' 
WHERE user_id = '5363a133-9c3d-4dad-bdaa-2da8035e14ca';