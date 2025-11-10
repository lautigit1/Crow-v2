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

  async create(body: CreateProductInput, token: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { data, error } = await client.from('products').insert(body).select('*').single();
    if (error) throw error;
    return data;
  }

  async update(id: string, body: UpdateProductInput, token: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { data, error } = await client.from('products').update(body).eq('id', id).select('*').single();
    if (error) throw error;
    return data;
  }

  async remove(id: string, token: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { error } = await client.from('products').delete().eq('id', id);
    if (error) throw error;
    return { ok: true };
  }
}
