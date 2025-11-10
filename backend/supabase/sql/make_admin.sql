-- Script para convertir un usuario en administrador
-- Reemplaza 'tu_email@ejemplo.com' con tu email real

-- OPCIÓN 1: Convertir por email
UPDATE public.users_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'tu_email@ejemplo.com'
);

-- OPCIÓN 2: Ver todos los usuarios y sus roles actuales
SELECT 
  u.id,
  u.email,
  u.created_at,
  p.role,
  p.name
FROM auth.users u
LEFT JOIN public.users_profiles p ON p.id = u.id
ORDER BY u.created_at DESC;

-- OPCIÓN 3: Convertir el primer usuario en admin (si sos el único)
-- UPDATE public.users_profiles
-- SET role = 'admin'
-- WHERE id = (
--   SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1
-- );
