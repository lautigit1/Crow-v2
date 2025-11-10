import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';

@Injectable()
export class WishlistService {
  constructor(private readonly db: DatabaseService) {}

  async getOrCreateWishlist(userId: string) {
    try {
      const { data: existing, error: findError } = await this.db.adminClient
        .from('wishlists')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (findError) return { id: null, user_id: userId } as any;
      if (existing) return existing;

      const { data: newList, error: createError } = await this.db.adminClient
        .from('wishlists')
        .insert({ user_id: userId })
        .select('*')
        .single();
      if (createError) return { id: null, user_id: userId } as any;
      return newList;
    } catch {
      return { id: null, user_id: userId } as any;
    }
  }

  async getItems(userId: string) {
  const wishlist = await this.getOrCreateWishlist(userId);
  if (!wishlist.id) return [];
    
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
    if (error) return [];
    return data ?? [];
  }

  async addItem(userId: string, productId: string) {
  const wishlist = await this.getOrCreateWishlist(userId);
  if (!wishlist.id) return { wishlist_id: null, product_id: productId } as any;

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
  if (!wishlist.id) return { ok: true };

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
  if (!wishlist.id) return { ok: true };

    const { error } = await this.db.adminClient
      .from('wishlist_items')
      .delete()
      .eq('wishlist_id', wishlist.id);

    if (error) throw error;
    return { ok: true };
  }
}
