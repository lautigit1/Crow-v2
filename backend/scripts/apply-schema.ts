/* eslint-disable no-console */
import 'dotenv/config';
// Windows/CI TLS workaround for self-signed cert in chain
process.env.NODE_TLS_REJECT_UNAUTHORIZED = process.env.NODE_TLS_REJECT_UNAUTHORIZED || '0';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client } from 'pg';

const dbUrl = process.env.SUPABASE_DB_URL;
if (!dbUrl) {
  console.error('Missing SUPABASE_DB_URL in .env (Postgres connection string).');
  process.exit(1);
}

async function runSql(client: Client, file: string) {
  const full = join(process.cwd(), 'supabase', 'sql', file);
  const sql = readFileSync(full, 'utf8');
  console.log(`Applying ${file}...`);
  await client.query(sql);
  console.log(`Done ${file}`);
}

async function main() {
  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
  await runSql(client, 'schema.sql');
    // optional admin policy file
    try { await runSql(client, 'admin_policy.sql'); } catch (e) { console.warn('admin_policy.sql skipped or failed:', (e as Error).message); }
  try { await runSql(client, 'ecommerce_extra.sql'); } catch (e) { console.warn('ecommerce_extra.sql skipped or failed:', (e as Error).message); }
  } finally {
    await client.end();
  }
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
