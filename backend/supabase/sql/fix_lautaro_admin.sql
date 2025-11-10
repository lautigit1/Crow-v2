-- Script para asegurar que las cuentas de Lautaro Salinas tengan rol admin

-- Ver estado actual de usuarios con "lautaro" o "salinas"
SELECT 
  u.id,
  u.email,
  p.role,
  p.name
FROM auth.users u
LEFT JOIN public.users_profiles p ON p.id = u.id
WHERE 
  LOWER(u.email) LIKE '%lautaro%' 
  OR LOWER(u.email) LIKE '%salinas%'
  OR LOWER(p.name) LIKE '%lautaro%'
  OR LOWER(p.name) LIKE '%salinas%';

-- Actualizar rol a admin para todas las cuentas de Lautaro Salinas
UPDATE public.users_profiles
SET role = 'admin'
WHERE id IN (
  SELECT u.id
  FROM auth.users u
  LEFT JOIN public.users_profiles p ON p.id = u.id
  WHERE 
    LOWER(u.email) LIKE '%lautaro%' 
    OR LOWER(u.email) LIKE '%salinas%'
    OR LOWER(p.name) LIKE '%lautaro%'
    OR LOWER(p.name) LIKE '%salinas%'
);

-- Verificar cambios
SELECT 
  u.id,
  u.email,
  p.role,
  p.name
FROM auth.users u
LEFT JOIN public.users_profiles p ON p.id = u.id
WHERE 
  LOWER(u.email) LIKE '%lautaro%' 
  OR LOWER(u.email) LIKE '%salinas%'
  OR LOWER(p.name) LIKE '%lautaro%'
  OR LOWER(p.name) LIKE '%salinas%';
