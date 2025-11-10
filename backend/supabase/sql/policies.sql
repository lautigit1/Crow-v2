-- RLS Policies (run in Supabase SQL editor)

-- ============================================
-- USERS_PROFILES
-- ============================================
-- Users can read and update their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON users_profiles;
CREATE POLICY "Users can view own profile" 
  ON users_profiles FOR SELECT 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users_profiles;
CREATE POLICY "Users can update own profile" 
  ON users_profiles FOR UPDATE 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can insert profiles" ON users_profiles;
CREATE POLICY "Service role can insert profiles" 
  ON users_profiles FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- ADDRESSES
-- ============================================
-- Users can manage their own addresses
DROP POLICY IF EXISTS "Users can view own addresses" ON addresses;
CREATE POLICY "Users can view own addresses" 
  ON addresses FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own addresses" ON addresses;
CREATE POLICY "Users can insert own addresses" 
  ON addresses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own addresses" ON addresses;
CREATE POLICY "Users can update own addresses" 
  ON addresses FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own addresses" ON addresses;
CREATE POLICY "Users can delete own addresses" 
  ON addresses FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- PRODUCTS
-- ============================================
-- Public read, service role write
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Service role can insert products" ON products;
CREATE POLICY "Service role can insert products" 
  ON products FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can update products" ON products;
CREATE POLICY "Service role can update products" 
  ON products FOR UPDATE 
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role can delete products" ON products;
CREATE POLICY "Service role can delete products" 
  ON products FOR DELETE 
  USING (auth.role() = 'service_role');

-- ============================================
-- BRANDS
-- ============================================
DROP POLICY IF EXISTS "Brands are viewable by everyone" ON brands;
CREATE POLICY "Brands are viewable by everyone" 
  ON brands FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Service role can manage brands" ON brands;
CREATE POLICY "Service role can manage brands" 
  ON brands FOR ALL 
  USING (auth.role() = 'service_role');

-- ============================================
-- CATEGORIES
-- ============================================
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
CREATE POLICY "Categories are viewable by everyone" 
  ON categories FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Service role can manage categories" ON categories;
CREATE POLICY "Service role can manage categories" 
  ON categories FOR ALL 
  USING (auth.role() = 'service_role');

-- ============================================
-- ORDERS
-- ============================================
-- Users can only see and create their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
CREATE POLICY "Users can view own orders" 
  ON orders FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own orders" ON orders;
CREATE POLICY "Users can create own orders" 
  ON orders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Service role can read all orders (for admin)
DROP POLICY IF EXISTS "Service role can view all orders" ON orders;
CREATE POLICY "Service role can view all orders" 
  ON orders FOR SELECT 
  USING (auth.role() = 'service_role');

-- ============================================
-- ORDER_ITEMS
-- ============================================
-- Users can view items from their own orders
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
CREATE POLICY "Users can view own order items" 
  ON order_items FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own order items" ON order_items;
CREATE POLICY "Users can insert own order items" 
  ON order_items FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Service role can manage all order items
DROP POLICY IF EXISTS "Service role can manage order items" ON order_items;
CREATE POLICY "Service role can manage order items" 
  ON order_items FOR ALL 
  USING (auth.role() = 'service_role');

-- ============================================
-- OPTIONAL: Atomic order creation function
-- ============================================
CREATE OR REPLACE FUNCTION public.perform_order(_user uuid, _items jsonb)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE 
  _order_id uuid := gen_random_uuid();
  _item record;
BEGIN
  INSERT INTO orders(id, user_id, status) VALUES (_order_id, _user, 'pending');
  
  FOR _item IN SELECT 
    (item->>'productId')::uuid AS product_id, 
    (item->>'qty')::int AS qty 
  FROM jsonb_array_elements(_items) AS item 
  LOOP
    -- Check and decrement stock
    UPDATE products 
    SET stock = stock - _item.qty 
    WHERE id = _item.product_id AND stock >= _item.qty;
    
    IF NOT FOUND THEN 
      RAISE EXCEPTION 'Insufficient stock for product %', _item.product_id; 
    END IF;
    
    INSERT INTO order_items(order_id, product_id, quantity) 
    VALUES (_order_id, _item.product_id, _item.qty);
  END LOOP;
  
  UPDATE orders SET status = 'confirmed' WHERE id = _order_id;
  RETURN _order_id;
END;
$$;
