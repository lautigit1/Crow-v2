import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class WishlistService {
  constructor(private readonly db: DatabaseService) {}

  async getOrCreateWishlist(userId: string) {
    // Try to find wishlist
    const { data: existing } = await this.db.adminClient
      .from('wishlists')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existing) return existing;

    // Create new wishlist
    const { data: newList, error } = await this.db.adminClient
      .from('wishlists')
      .insert({ user_id: userId })
      .select('*')
      .single();

    if (error) throw error;
    return newList;
  }

  async getItems(userId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);
    
    const { data, error } = await this.db.adminClient
      .from('wishlist_items')
      .select(`
        wishlist_id,
        product_id,
        products:product_id (
          id,
          name,
          price,
          stock,
          image_url,
          description
        )
      `)
      .eq('wishlist_id', wishlist.id);

    if (error) throw error;
    return data || [];
  }

  async addItem(userId: string, productId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const { data, error } = await this.db.adminClient
      .from('wishlist_items')
      .insert({ wishlist_id: wishlist.id, product_id: productId })
      .select('*')
      .single();

    if (error) {
      // If already exists, just return
      if (error.code === '23505') {
        return { message: 'Product already in wishlist' };
      }
      throw error;
    }
    return data;
  }

  async removeItem(userId: string, productId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const { error } = await this.db.adminClient
      .from('wishlist_items')
      .delete()
      .eq('wishlist_id', wishlist.id)
      .eq('product_id', productId);

    if (error) throw error;
    return { ok: true };
  }

  async clearWishlist(userId: string) {
    const wishlist = await this.getOrCreateWishlist(userId);

    const { error } = await this.db.adminClient
      .from('wishlist_items')
      .delete()
      .eq('wishlist_id', wishlist.id);

    if (error) throw error;
    return { ok: true };
  }
}
