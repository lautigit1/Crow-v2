import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../core/database.service.js';
import type { CategoryInput } from './categories.dto.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly db: DatabaseService) {}

  async list() {
    const { data, error } = await this.db.anonClient.from('categories').select('*').order('name');
    if (error) throw error; return data;
  }

  async get(id: string) {
    const { data, error } = await this.db.anonClient.from('categories').select('*').eq('id', id).single();
    if (error) throw error; return data;
  }

  async create(input: CategoryInput, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const row = { name: input.name, slug: input.slug, parent_id: input.parentId ?? null };
    const { data, error } = await client.from('categories').insert(row).select('*').single();
    if (error) throw error; return data;
  }

  async update(id: string, input: CategoryInput, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const row = { name: input.name, slug: input.slug, parent_id: input.parentId ?? null };
    const { data, error } = await client.from('categories').update(row).eq('id', id).select('*').single();
    if (error) throw error; return data;
  }

  async remove(id: string, token?: string) {
    const client = token ? this.db.forUser(token) : this.db.adminClient;
    const { error } = await client.from('categories').delete().eq('id', id);
    if (error) throw error; return { ok: true };
  }
}
