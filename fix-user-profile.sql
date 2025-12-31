-- Create function to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee'),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Manually create profile for existing admin1@inventori.com
INSERT INTO public.users (id, email, name, role, created_at)
SELECT 
  id,
  email,
  'Admin User',
  'admin',
  created_at
FROM auth.users 
WHERE email = 'admin1@inventori.com'
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  name = EXCLUDED.name;

-- Manually create profile for existing bangoosrox@gmail.com
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
