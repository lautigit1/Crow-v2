import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';

type OrderItem = { productId: string; qty: number };

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async create(userId: string, items: OrderItem[], token: string) {
    if (!Array.isArray(items) || items.length === 0) throw new BadRequestException('No items');
    const client = this.db.forUser(token);
    const { data, error } = await client.rpc('perform_order', { _user: userId, _items: items });
    if (error) throw error;
    return { orderId: data };
  }

  async list(userId: string, token: string) {
    // Use admin client to avoid RLS issues and return empty array for new users
    const { data, error } = await this.db.adminClient
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', userId);
    if (error) return [];
    return data ?? [];
  }
}
