/* eslint-disable no-console */
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL as string;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!url || !serviceRole) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceRole, { auth: { persistSession: false } });

async function upsertProduct(sku: string, name: string, price: number, stock: number) {
  const { data: existing, error: findErr } = await supabase.from('products').select('*').eq('sku', sku).maybeSingle();
  if (findErr) throw findErr;
  if (existing) {
    const { error } = await supabase.from('products').update({ name, price, stock }).eq('id', existing.id);
    if (error) throw error;
    console.log(`Updated product ${sku}`);
    return;
  }
  const { error } = await supabase.from('products').insert({ sku, name, price, stock });
  if (error) throw error;
  console.log(`Inserted product ${sku}`);
}

async function main() {
  // Sample initial catalog
  await upsertProduct('ACE-10W40-1L', 'Aceite 10W40 1L', 7999, 25);
  await upsertProduct('FIL-AIR-FOCUS', 'Filtro de Aire Ford Focus', 5499, 15);
  await upsertProduct('BUJ-NGK-BKR6E', 'Bujía NGK BKR6E', 1999, 40);
  // Seed brands & categories
  const upsert = async (table: string, uniqueKey: string, row: Record<string, unknown>) => {
    const { data: existing, error: findErr } = await supabase.from(table).select('*').eq(uniqueKey, row[uniqueKey] as any).maybeSingle();
    if (findErr) throw findErr;
    if (existing) {
      const { error } = await supabase.from(table).update(row).eq('id', (existing as any).id);
      if (error) throw error; console.log(`Updated ${table} ${row[uniqueKey]}`);
    } else {
      const { error } = await supabase.from(table).insert(row);
      if (error) throw error; console.log(`Inserted ${table} ${row[uniqueKey]}`);
    }
  };
  await upsert('brands', 'name', { name: 'NGK' });
  await upsert('brands', 'name', { name: 'ACDelco' });
  await upsert('categories', 'slug', { name: 'Motor', slug: 'motor' });
  await upsert('categories', 'slug', { name: 'Filtros', slug: 'filtros' });
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
