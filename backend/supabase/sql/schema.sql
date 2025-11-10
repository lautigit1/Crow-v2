-- Schema DDL for Crow (execute in Supabase SQL editor or via migrations)

-- Extensions (if not already enabled)
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- Users profile table (maps auth.users -> extra metadata)
create table if not exists users_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'authenticated',
  name text,
  created_at timestamptz default now()
);

-- Addresses
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  line1 text not null,
  line2 text,
  city text not null,
  province text not null,
  postal_code text not null,
  country text not null,
  created_at timestamptz default now()
);
create index if not exists idx_addresses_user on addresses(user_id);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  sku text unique not null,
  price integer not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_products_name on products using gin (to_tsvector('simple', name));

-- Orders
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  total integer not null default 0,
  created_at timestamptz default now()
);
create index if not exists idx_orders_user on orders(user_id);

-- Order items
create table if not exists order_items (
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  primary key (order_id, product_id)
);
create index if not exists idx_order_items_product on order_items(product_id);

-- Simple updated_at trigger for products
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_products_updated on products;
create trigger trg_products_updated
before update on products
for each row execute procedure set_updated_at();

-- Basic RLS enablement
alter table users_profiles enable row level security;
alter table addresses enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Policies (mirror outline in policies.sql, adapt to your needs)
-- Public read for products
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'products_public_select') then
    create policy products_public_select on products for select using (true);
  end if;
end $$;

-- Service role full modify (implicit by service role bypassing RLS) or define explicit policies if needed.

-- User owned data policies
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'addresses_owner') then
    create policy addresses_owner on addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'orders_owner') then
    create policy orders_owner on orders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'order_items_join') then
    create policy order_items_join on order_items for select using (exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid()));
  end if;
end $$;
