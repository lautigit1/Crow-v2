# Crow Backend API (NestJS + Supabase)

Fortaleza API, modular y segura, diseñada para trabajar con RLS en Supabase.

## Rápido inicio

1. Copia `.env.example` a `.env` y completa las variables.
2. Instala deps: `npm ci`
3. Dev: `npm run start:dev`

## Filosofía de seguridad
- RLS SIEMPRE habilitado.
- La API firma el Access Token con el mismo secreto JWT que Supabase para que `auth.uid()` funcione en Postgres.
- Mutaciones admin sólo con `service_role` y `RolesGuard`.

