-- Extra ecommerce schema: categories, brands, images, variants, carts, wishlists, coupons, reviews, payments, shipments, inventory

-- BRANDS
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now()
);
alter table brands enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'brands_public_select') then
    create policy brands_public_select on brands for select using (true);
  end if;
end $$;

-- CATEGORIES (self-referencing hierarchy)
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  parent_id uuid references categories(id) on delete set null,
  created_at timestamptz default now()
);
create index if not exists idx_categories_parent on categories(parent_id);
alter table categories enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'categories_public_select') then
    create policy categories_public_select on categories for select using (true);
  end if;
end $$;

-- Ensure products has optional brand_id
alter table products add column if not exists brand_id uuid references brands(id) on delete set null;

-- PRODUCT-CATEGORIES M2M
create table if not exists products_categories (
  product_id uuid not null references products(id) on delete cascade,
  category_id uuid not null references categories(id) on delete cascade,
  primary key (product_id, category_id)
);
alter table products_categories enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'products_categories_public_select') then
    create policy products_categories_public_select on products_categories for select using (true);
  end if;
end $$;

-- PRODUCT IMAGES
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  position int not null default 0,
  created_at timestamptz default now()
);
create index if not exists idx_product_images_product on product_images(product_id);
alter table product_images enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'product_images_public_select') then
    create policy product_images_public_select on product_images for select using (true);
  end if;
end $$;

-- PRODUCT VARIANTS (optional override of price/stock)
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text,
  sku text unique,
  price integer check (price >= 0),
  stock integer default 0 check (stock >= 0),
  attributes jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_variants_product on product_variants(product_id);
alter table product_variants enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'product_variants_public_select') then
    create policy product_variants_public_select on product_variants for select using (true);
  end if;
end $$;

-- CARTS
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_carts_user on carts(user_id);
alter table carts enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'carts_owner_all') then
    create policy carts_owner_all on carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

-- CART ITEMS
create table if not exists cart_items (
  cart_id uuid not null references carts(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  variant_id uuid references product_variants(id) on delete set null,
  quantity int not null check (quantity > 0),
  primary key (cart_id, product_id, variant_id)
);
create index if not exists idx_cart_items_cart on cart_items(cart_id);
alter table cart_items enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'cart_items_owner_all') then
    create policy cart_items_owner_all on cart_items for all using (
      exists (select 1 from carts c where c.id = cart_id and c.user_id = auth.uid())
    ) with check (
      exists (select 1 from carts c where c.id = cart_id and c.user_id = auth.uid())
    );
  end if;
end $$;

-- WISHLISTS
create table if not exists wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
create index if not exists idx_wishlists_user on wishlists(user_id);
alter table wishlists enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'wishlists_owner_all') then
    create policy wishlists_owner_all on wishlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;

-- WISHLIST ITEMS
create table if not exists wishlist_items (
  wishlist_id uuid not null references wishlists(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  primary key (wishlist_id, product_id)
);
create index if not exists idx_wishlist_items_list on wishlist_items(wishlist_id);
alter table wishlist_items enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'wishlist_items_owner_all') then
    create policy wishlist_items_owner_all on wishlist_items for all using (
      exists (select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid())
    ) with check (
      exists (select 1 from wishlists w where w.id = wishlist_id and w.user_id = auth.uid())
    );
  end if;
end $$;

-- COUPONS
create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  kind text not null default 'percent', -- percent | fixed
  amount integer not null check (amount >= 0),
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions int,
  min_amount integer,
  created_at timestamptz default now()
);
alter table coupons enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'coupons_public_select') then
    create policy coupons_public_select on coupons for select using (true);
  end if;
end $$;

-- COUPON REDEMPTIONS
create table if not exists coupon_redemptions (
  id uuid primary key default gen_random_uuid(),
  coupon_id uuid not null references coupons(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,
  redeemed_at timestamptz default now()
);
create index if not exists idx_coupon_redemptions_coupon on coupon_redemptions(coupon_id);
alter table coupon_redemptions enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'coupon_redemptions_owner_select') then
    create policy coupon_redemptions_owner_select on coupon_redemptions for select using (auth.uid() = user_id);
  end if;
end $$;

-- REVIEWS
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  title text,
  body text,
  approved boolean not null default false,
  created_at timestamptz default now()
);
create index if not exists idx_reviews_product on reviews(product_id);
create index if not exists idx_reviews_user on reviews(user_id);
alter table reviews enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'reviews_owner_manage') then
    create policy reviews_owner_manage on reviews for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'reviews_public_select') then
    create policy reviews_public_select on reviews for select using (approved = true);
  end if;
end $$;

-- PAYMENTS
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  amount integer not null check (amount >= 0),
  currency text not null default 'ARS',
  status text not null default 'pending',
  raw jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_payments_order on payments(order_id);
alter table payments enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'payments_owner_select') then
    create policy payments_owner_select on payments for select using (
      exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
    );
  end if;
end $$;

-- SHIPMENTS
create table if not exists shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  carrier text,
  tracking_code text,
  status text not null default 'processing',
  address jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_shipments_order on shipments(order_id);
alter table shipments enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'shipments_owner_select') then
    create policy shipments_owner_select on shipments for select using (
      exists (select 1 from orders o where o.id = order_id and o.user_id = auth.uid())
    );
  end if;
end $$;

-- INVENTORY MOVEMENTS
create table if not exists inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  variant_id uuid references product_variants(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  delta int not null, -- positive or negative
  reason text,
  created_at timestamptz default now()
);
create index if not exists idx_inv_mov_product on inventory_movements(product_id);
create index if not exists idx_inv_mov_variant on inventory_movements(variant_id);
alter table inventory_movements enable row level security;
do $$ begin
  if not exists (select 1 from pg_policies where policyname = 'inventory_movements_public_select') then
    create policy inventory_movements_public_select on inventory_movements for select using (false);
  end if;
end $$;
