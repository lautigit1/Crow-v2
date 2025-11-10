import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';
import { CreateProductInput, UpdateProductInput } from './products.dto.js';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async list(q?: string) {
    let query = this.db.anonClient.from('products').select('*');
    if (q) query = query.ilike('name', `%${q}%`);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async get(id: string) {
    const { data, error } = await this.db.anonClient.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async create(body: CreateProductInput) {
    const { data, error } = await this.db.adminClient.from('products').insert(body).select('*').single();
    if (error) throw error;
    return data;
  }

  async update(id: string, body: UpdateProductInput) {
    const { data, error } = await this.db.adminClient.from('products').update(body).eq('id', id).select('*').single();
    if (error) throw error;
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.db.adminClient.from('products').delete().eq('id', id);
    if (error) throw error;
    return;
  }
}
