import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class CartService {
  constructor(private readonly db: DatabaseService) {}

  async getOrCreateCart(userId: string) {
    // Try to find active cart
    const { data: existingCart } = await this.db.adminClient
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (existingCart) return existingCart;

    // Create new cart
    const { data: newCart, error } = await this.db.adminClient
      .from('carts')
      .insert({ user_id: userId, status: 'active' })
      .select('*')
      .single();

    if (error) throw error;
    return newCart;
  }

  async getCartItems(userId: string) {
    const cart = await this.getOrCreateCart(userId);
    
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

    if (error) throw error;
    return data || [];
  }

  async addItem(userId: string, productId: string, quantity: number, variantId?: string) {
    const cart = await this.getOrCreateCart(userId);

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

    if (error) throw error;
    return data;
  }

  async removeItem(userId: string, productId: string, variantId?: string) {
    const cart = await this.getOrCreateCart(userId);

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

    const { error } = await this.db.adminClient
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (error) throw error;
    return { ok: true };
  }
}
