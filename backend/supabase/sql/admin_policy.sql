-- Create admin write policy for products using Supabase JWT app_metadata.role
do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'products_admin_write') then
    create policy products_admin_write on products for all
      using (coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin')
      with check (coalesce((auth.jwt() -> 'app_metadata' ->> 'role'), '') = 'admin');
  end if;
end $$;
