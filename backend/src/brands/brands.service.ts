import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';
import type { BrandInput } from './brands.dto.js';

@Injectable()
export class BrandsService {
  constructor(private readonly db: DatabaseService) {}

  async list() {
    const { data, error } = await this.db.anonClient.from('brands').select('*').order('name');
    if (error) throw error; return data;
  }

  async get(id: string) {
    const { data, error } = await this.db.anonClient.from('brands').select('*').eq('id', id).single();
    if (error) throw error; return data;
  }

  async create(input: BrandInput, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { data, error } = await client.from('brands').insert(input).select('*').single();
    if (error) throw error; return data;
  }

  async update(id: string, input: BrandInput, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { data, error } = await client.from('brands').update(input).eq('id', id).select('*').single();
    if (error) throw error; return data;
  }

  async remove(id: string, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { error } = await client.from('brands').delete().eq('id', id);
    if (error) throw error; return { ok: true };
  }
}
