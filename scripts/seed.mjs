const SUPABASE_URL = 'https://uaofatcgdvpcysaviima.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2ZhdGNnZHZwY3lzYXZpaW1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc5MzkxOCwiZXhwIjoyMDkyMzY5OTE4fQ.2OrLyCNhNBYgiIwlIEJGoAWi6QyAUugd16TEIdbCqWQ';

const products = [
  {
    sku: 'ZN-FSC-A2-001', name: 'Full Solid Zirconia Crown — A2 Shade',
    brand: 'Zircnova', type: 'Full Solid', shade: 'A2', shade_label: 'A2 / Natural',
    price: 12.99, original_price: null, badge: 'Best Seller',
    rating: 5.0, review_count: 214, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 1
  },
  {
    sku: 'ZN-ML2-A1-002', name: 'Multi-Layer 2.0 Premium Crown — A1',
    brand: 'Zircnova+PRO', type: 'Multi-Layer', shade: 'A1', shade_label: 'A1 / Bright White',
    price: 18.99, original_price: null, badge: 'New',
    rating: 5.0, review_count: 89, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: true, sort_order: 2
  },
  {
    sku: 'ZN-ANT-B1-003', name: 'High-Translucency Anterior Crown — B1',
    brand: 'Zircnova+RE', type: 'Anterior', shade: 'B1', shade_label: 'B1 / Light',
    price: 14.50, original_price: null, badge: null,
    rating: 4.0, review_count: 67, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 3
  },
  {
    sku: 'ZN-PST-A3-004', name: 'Posterior Full Solid Crown — A3 Shade',
    brand: 'Zircnova', type: 'Posterior', shade: 'A3', shade_label: 'A3 / Medium',
    price: 10.99, original_price: 15.99, badge: 'Sale',
    rating: 5.0, review_count: 143, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 4
  },
  {
    sku: 'ZN-ULT-A2-005', name: 'Ultra Strength Zirconia Crown — A2',
    brand: 'Zircnova+PRO', type: 'Full Solid', shade: 'A2', shade_label: 'A2 / Natural',
    price: 16.50, original_price: null, badge: null,
    rating: 5.0, review_count: 198, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 5
  },
  {
    sku: 'ZN-EST-OM1-006', name: 'Esthetic Multi-Layer Crown — OM1',
    brand: 'Zircnova+ME', type: 'Multi-Layer', shade: 'OM1', shade_label: 'OM1 / Bleached',
    price: 22.00, original_price: null, badge: 'New',
    rating: 5.0, review_count: 41, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 6
  },
  {
    sku: 'ZN-ECO-A3-007', name: 'Economy Full Solid Crown — A3.5',
    brand: 'Zircnova', type: 'Full Solid', shade: 'A3', shade_label: 'A3 / Medium',
    price: 8.99, original_price: 12.50, badge: 'Sale',
    rating: 4.0, review_count: 302, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 7
  },
  {
    sku: 'ZN-TMP-OM1-008', name: 'Temporary Crown — Bleach White',
    brand: 'Zircnova+RE', type: 'Temporary', shade: 'OM1', shade_label: 'OM1 / Bleached',
    price: 6.99, original_price: null, badge: null,
    rating: 4.0, review_count: 55, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 8
  },
  {
    sku: 'ZN-CMP-A2-009', name: 'Composite Layered Crown — A2 Natural',
    brand: 'Zircnova+FX', type: 'Composite', shade: 'A2', shade_label: 'A2 / Natural',
    price: 19.99, original_price: null, badge: 'Best Seller',
    rating: 5.0, review_count: 177, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 9
  },
  {
    sku: 'ZN-VNR-B1-010', name: 'Anterior Veneer Crown — B1 Light',
    brand: 'Zircnova+PRO', type: 'Anterior', shade: 'B1', shade_label: 'B1 / Light',
    price: 24.99, original_price: null, badge: null,
    rating: 5.0, review_count: 92, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 10
  },
  {
    sku: 'ZN-STR-A3-011', name: 'High Strength Posterior Crown — A3',
    brand: 'Zircnova', type: 'Posterior', shade: 'A3', shade_label: 'A3 / Medium',
    price: 11.50, original_price: 16.00, badge: 'Sale',
    rating: 4.0, review_count: 228, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 11
  },
  {
    sku: 'ZN-MON-A1-012', name: 'Monolithic Zirconia Crown — A1 Bright',
    brand: 'Zircnova+ME', type: 'Full Solid', shade: 'A1', shade_label: 'A1 / Bright White',
    price: 17.50, original_price: null, badge: 'New',
    rating: 5.0, review_count: 34, image_url: 'images/crown-trans.png',
    in_stock: true, category: 'Full Solid Crowns', is_featured: false, sort_order: 12
  },
];

const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'apikey': SERVICE_ROLE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  },
  body: JSON.stringify(products),
});

const data = await res.json();
if (res.ok) {
  console.log(`✓ Seeded ${data.length} products successfully.`);
} else {
  console.error('✗ Seed failed:', JSON.stringify(data, null, 2));
}
