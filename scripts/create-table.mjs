import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uaofatcgdvpcysaviima.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2ZhdGNnZHZwY3lzYXZpaW1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc5MzkxOCwiZXhwIjoyMDkyMzY5OTE4fQ.2OrLyCNhNBYgiIwlIEJGoAWi6QyAUugd16TEIdbCqWQ';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const sql = `
CREATE TABLE IF NOT EXISTS products (
  id               SERIAL PRIMARY KEY,
  sku              VARCHAR(50)  UNIQUE NOT NULL,
  name             VARCHAR(255) NOT NULL,
  brand            VARCHAR(50)  NOT NULL,
  type             VARCHAR(50)  NOT NULL,
  shade            VARCHAR(20),
  shade_label      VARCHAR(50),
  price            DECIMAL(10,2) NOT NULL,
  original_price   DECIMAL(10,2),
  badge            VARCHAR(20) CHECK (badge IN ('Best Seller','New','Sale')),
  rating           DECIMAL(2,1) DEFAULT 5.0,
  review_count     INT          DEFAULT 0,
  image_url        VARCHAR(500),
  in_stock         BOOLEAN      DEFAULT TRUE,
  category         VARCHAR(100),
  is_featured      BOOLEAN      DEFAULT FALSE,
  sort_order       INT          DEFAULT 0,
  created_at       TIMESTAMPTZ  DEFAULT NOW()
);
`;

// Try raw SQL via rpc
const { data, error } = await supabase.rpc('exec_sql', { sql });

if (error) {
  console.log('rpc exec_sql failed:', error.message);

  // Try using the REST /sql endpoint (newer Supabase versions)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'apikey': SERVICE_ROLE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({ query: sql }),
  });
  console.log('REST status:', res.status, await res.text());
} else {
  console.log('Table created successfully:', data);
}
