# Supabase Setup

## 1. Aplicar Esquema
En el panel de Supabase -> SQL Editor:

1. Copiá el contenido de `supabase/sql/schema.sql` y ejecutalo.
2. (Opcional) Revisá `supabase/sql/policies.sql` para entender las políticas y adaptarlas.

Esto crea tablas: `users_profiles`, `addresses`, `products`, `orders`, `order_items` y activa RLS con políticas básicas.

## 2. Verificar RLS
En cada tabla creada, asegurate de que RLS esté activado. El script ya llama `enable row level security`, pero podés verificar en el panel.

## 3. Sembrar Productos (Seed)
Una vez exista la tabla `products`, corré:

```powershell
cd backend
npm run db:seed
```

Esto hace upsert de algunos productos de ejemplo (aceite, filtro, bujía) basados en `sku`.

## 4. Crear Usuario Admin
Registrá un usuario normal vía `/api/v1/auth/register`. Luego en el panel de Supabase -> Auth -> Users:

1. Editá el usuario.
2. En `app_metadata` agregá: `{ "role": "admin" }`.

Alternativa futura: script para promover admin por email (se puede agregar en `scripts/seed-admin.ts`).

## 5. Políticas Personalizadas
- Productos: solo lectura pública (policy `products_public_select`). Modificaciones via service role.
- Addresses / Orders: acceso dueño (auth.uid() = user_id).
- order_items: select cuando el usuario es dueño de la orden.

Si querés permitir que un usuario *admin* modifique productos desde la API sin usar service role directo, agregá política extra:

```sql
create policy products_admin_write on products for all
  using (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  with check (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');
```

Y luego la API podría usar el token del admin (sin recurrir al service role). De momento el código usa `adminClient` (service role) para create/update/delete.

## 6. RPC `perform_order`
Para pedidos atómicos (descontar stock + crear filas), crea la función indicada en `policies.sql` (sección comentada) y luego usa `supabase.rpc('perform_order', { _user: <uuid>, _items: <jsonb> })` en el servicio de órdenes.

## 7. Próximos Pasos
- Añadir índices adicionales según búsqueda (por nombre, sku, full text).
- Añadir migrador automatizado (Supabase CLI o psql migrations) si querés CI/CD.

## 8. Troubleshooting
Error `PGRST205 Could not find the table 'public.products'`: la tabla aún no existe. Aplicá `schema.sql` y reintenta.

Error de políticas (forbidden): revisá que el usuario tenga `app_metadata.role = admin` para operaciones protegidas.

---
Listo. Aplicá el esquema, corré el seed y ya podés cargar productos reales.
