-- Create profile for bangoosrox@gmail.com
INSERT INTO public.users (id, email, name, role, created_at)
SELECT 
  id,
  email,
  'Bangoos Admin',
  'admin',
  created_at
FROM auth.users 
WHERE email = 'bangoosrox@gmail.com'
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  name = EXCLUDED.name;

-- Check if user was created
SELECT * FROM public.users WHERE email = 'bangoosrox@gmail.com';
