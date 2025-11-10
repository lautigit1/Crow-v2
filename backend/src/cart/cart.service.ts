import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class CartService {
  constructor(private readonly db: DatabaseService) {}

  async getOrCreateCart(userId: string) {
    try {
      const { data: existingCart, error: findError } = await this.db.adminClient
        .from('carts')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (findError) {
        // If table missing or any error, fall back to virtual cart (empty)
        return { id: null, user_id: userId, status: 'virtual' } as any;
      }
      if (existingCart) return existingCart;

      const { data: newCart, error: createError } = await this.db.adminClient
        .from('carts')
        .insert({ user_id: userId, status: 'active' })
        .select('*')
        .single();

      if (createError) {
        return { id: null, user_id: userId, status: 'virtual' } as any;
      }
      return newCart;
    } catch {
      return { id: null, user_id: userId, status: 'virtual' } as any;
    }
  }

  async getCartItems(userId: string) {
  const cart = await this.getOrCreateCart(userId);
  if (!cart.id) return [];
    
    const { data, error } = await this.db.adminClient
      .from('cart_items')
      .select(`
        cart_id,
        product_id,
        variant_id,
        quantity,
        products:product_id (
          id,
          name,
          price,
          stock,
          image_url,
          description
        )
      `)
      .eq('cart_id', cart.id);
    if (error) return [];
    return data ?? [];
  }

  async addItem(userId: string, productId: string, quantity: number, variantId?: string) {
  const cart = await this.getOrCreateCart(userId);
  if (!cart.id) return { cart_id: null, product_id: productId, quantity, variant_id: variantId || null };

    // Check if item already exists
    const { data: existing } = await this.db.adminClient
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .single();

    if (existing) {
      // Update quantity
      const { data, error } = await this.db.adminClient
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('variant_id', variantId || null)
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } else {
      // Insert new item
      const { data, error } = await this.db.adminClient
        .from('cart_items')
        .insert({ 
          cart_id: cart.id, 
          product_id: productId, 
          variant_id: variantId || null,
          quantity 
        })
        .select('*')
        .single();

      if (error) throw error;
      return data;
    }
  }

  async updateQuantity(userId: string, productId: string, quantity: number, variantId?: string) {
    const cart = await this.getOrCreateCart(userId);
    if (!cart.id) {
      if (quantity <= 0) return { deleted: true };
      return { cart_id: null, product_id: productId, quantity, variant_id: variantId || null };
    }

    if (quantity <= 0) {
      // Remove item
      const { error } = await this.db.adminClient
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .eq('variant_id', variantId || null);

      if (error) throw error;
      return { deleted: true };
    }

    const { data, error } = await this.db.adminClient
      .from('cart_items')
      .update({ quantity })
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null)
      .select('*')
      .single();

    if (error) return { cart_id: cart.id, product_id: productId, quantity, variant_id: variantId || null };
    return data;
  }

  async removeItem(userId: string, productId: string, variantId?: string) {
  const cart = await this.getOrCreateCart(userId);
  if (!cart.id) return { ok: true };

    const { error } = await this.db.adminClient
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .eq('variant_id', variantId || null);

    if (error) throw error;
    return { ok: true };
  }

  async clearCart(userId: string) {
  const cart = await this.getOrCreateCart(userId);
  if (!cart.id) return { ok: true };

    const { error } = await this.db.adminClient
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (error) throw error;
    return { ok: true };
  }
}
