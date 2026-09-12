// scripts/seed-templates.ts
//
// Run with: npx tsx scripts/seed-templates.ts
// (or: npx ts-node scripts/seed-templates.ts)
//
// Needs SUPABASE_SERVICE_ROLE_KEY — get it from Supabase Dashboard →
// Project Settings → API → service_role key. Never expose this in the
// browser or commit it; keep it only in .env.local (which should already
// be gitignored) and run this script locally / in CI, not client-side.

// import 'dotenv/config'; // loads .env.local — run `npm i -D dotenv` if you don't have it
import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { templates } from '@/app/components/templates/templates';
import type { Database } from '../types/database.types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in your environment (.env.local).'
  );
  process.exit(1);
}

const supabase = createClient<Database>(SUPABASE_URL, SERVICE_ROLE_KEY);

async function seedTemplates() {
  console.log(`Seeding ${templates.length} templates...`);

  const rows = templates.map((t) => ({
    id: t.id,
    name: t.name,
    category: t.category,
    layout: t.layout,
    component: t.component,
    thumbnail: t.thumbnail,
    default_theme: t.defaultTheme,
    allowed_fonts: t.allowedFonts,
    layout_config: t.layoutConfig ?? null,
  }));

  // Basic sanity check before writing anything — catches typos/missing
  // fields early instead of failing halfway through 27 rows.
  const missingId = rows.find((r) => !r.id || !r.name || !r.layout || !r.component);
  if (missingId) {
    console.error('A template is missing a required field (id/name/layout/component):', missingId);
    process.exit(1);
  }

  const duplicateIds = rows
    .map((r) => r.id)
    .filter((id, i, arr) => arr.indexOf(id) !== i);
  if (duplicateIds.length > 0) {
    console.error('Duplicate template ids found — every id must be unique:', duplicateIds);
    process.exit(1);
  }

  // Single batch upsert — one round trip instead of 27 sequential awaits.
  const { data, error } = await supabase
    .from('templates')
    .upsert(rows, { onConflict: 'id' })
    .select('id, name');

  if (error) {
    console.error('Upsert failed:', error.message);
    process.exit(1);
  }

  console.log(`Done. Upserted ${data?.length ?? 0} templates:`);
  data?.forEach((row) => console.log(`  - ${row.id} (${row.name})`));
}

seedTemplates().catch((err) => {
  console.error('Unexpected error while seeding templates:', err);
  process.exit(1);
});
