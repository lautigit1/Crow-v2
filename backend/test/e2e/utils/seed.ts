import { INestApplication } from '@nestjs/common';
import { DatabaseService } from '../../../src/core/database.service.js';

export async function ensureProduct(app: INestApplication, sku: string) {
  const db = app.get(DatabaseService).adminClient;
  const { data: found, error: findErr } = await db.from('products').select('*').eq('sku', sku).maybeSingle();
  if (findErr) throw findErr;
  if (found) return found;
  const { data, error } = await db
    .from('products')
    .insert({ name: 'E2E Producto', price: 1234, stock: 5, sku })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function cleanupProduct(app: INestApplication, sku: string) {
  const db = app.get(DatabaseService).adminClient;
  await db.from('products').delete().eq('sku', sku);
}
