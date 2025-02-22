/*
  # Add government schemes and subsidies

  1. New Tables
    - `government_schemes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `eligibility` (text)
      - `benefits` (text)
      - `last_date` (date)
      - `documentation_required` (text[])
      - `created_at` (timestamp)

    - `subsidies`
      - `id` (uuid, primary key)
      - `item_id` (uuid, references inventory_items)
      - `amount` (numeric)
      - `percentage` (numeric)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create government schemes table
CREATE TABLE IF NOT EXISTS government_schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  eligibility text NOT NULL,
  benefits text NOT NULL,
  last_date date NOT NULL,
  documentation_required text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create subsidies table
CREATE TABLE IF NOT EXISTS subsidies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  percentage numeric NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subsidies ENABLE ROW LEVEL SECURITY;

-- Add policies for public read access
CREATE POLICY "Allow public read access" ON government_schemes
  FOR SELECT TO public USING (true);

CREATE POLICY "Allow public read access" ON subsidies
  FOR SELECT TO public USING (true);

-- Insert sample government schemes
INSERT INTO government_schemes (title, description, eligibility, benefits, last_date, documentation_required) VALUES
  (
    'PM Kisan Samman Nidhi',
    'Direct income support to farmers for agricultural expenses',
    'All small and marginal farmers with cultivable land',
    'Rs. 6000 per year in three equal installments',
    '2024-12-31',
    ARRAY['Aadhaar Card', 'Land Records', 'Bank Account Details']
  ),
  (
    'Soil Health Card Scheme',
    'Provides information on soil nutrient status and fertilizer recommendations',
    'All farmers with agricultural land',
    'Free soil testing and fertilizer recommendations',
    '2024-12-31',
    ARRAY['Land Records', 'Farmer ID']
  ),
  (
    'Karnataka Raitha Suraksha',
    'State insurance scheme for farmers',
    'Farmers registered in Karnataka',
    'Insurance coverage up to Rs. 5 lakhs',
    '2024-09-30',
    ARRAY['Aadhaar Card', 'Land Records', 'Bank Account Details', 'EPIC Card']
  ),
  (
    'Krishi Yantra Dhare',
    'Farm equipment subsidy scheme',
    'Small and marginal farmers in Karnataka',
    'Up to 50% subsidy on farm equipment',
    '2024-08-31',
    ARRAY['Land Records', 'Income Certificate', 'Bank Account Details']
  );

-- Update inventory items with more data
INSERT INTO inventory_items (name, quantity, unit, price, society_id) VALUES
  ('Organic Fertilizer', 2000, 'kg', 15, (SELECT id FROM societies LIMIT 1)),
  ('NPK Fertilizer', 1500, 'kg', 25, (SELECT id FROM societies LIMIT 1)),
  ('Hybrid Seeds', 500, 'packets', 120, (SELECT id FROM societies LIMIT 1)),
  ('Pesticides', 200, 'liters', 450, (SELECT id FROM societies LIMIT 1)),
  ('Irrigation Equipment', 50, 'sets', 2500, (SELECT id FROM societies LIMIT 1)),
  ('Organic Pesticides', 300, 'liters', 350, (SELECT id FROM societies LIMIT 1)),
  ('Soil Nutrients', 1000, 'kg', 30, (SELECT id FROM societies LIMIT 1)),
  ('Growth Promoters', 250, 'liters', 200, (SELECT id FROM societies LIMIT 1)),
  ('Bio Fertilizers', 800, 'kg', 40, (SELECT id FROM societies LIMIT 1)),
  ('Vermicompost', 1500, 'kg', 20, (SELECT id FROM societies LIMIT 1));

-- Add subsidies for items
INSERT INTO subsidies (item_id, amount, percentage, description) 
SELECT 
  id as item_id,
  CASE 
    WHEN price > 1000 THEN 500
    WHEN price > 100 THEN 50
    ELSE 10
  END as amount,
  CASE 
    WHEN price > 1000 THEN 20
    WHEN price > 100 THEN 25
    ELSE 30
  END as percentage,
  'Government subsidy for agricultural inputs'
FROM inventory_items;