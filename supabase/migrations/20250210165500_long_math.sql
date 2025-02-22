/*
  # Create Societies and Inventory Schema
  
  1. New Tables
    - `societies`: Stores society information
      - id (uuid, primary key)
      - name (text)
      - address (text)
      - latitude (double precision)
      - longitude (double precision)
      - phone (text)
      - opening_hours (text)
      - created_at (timestamptz)
      
    - `inventory_items`: Stores inventory for each society
      - id (uuid, primary key)
      - society_id (uuid, foreign key)
      - name (text)
      - quantity (integer)
      - unit (text)
      - price (numeric)
      - created_at (timestamptz)
      
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create societies table
CREATE TABLE societies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  latitude double precision NOT NULL,
  longitude double precision NOT NULL,
  phone text NOT NULL,
  opening_hours text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create inventory_items table
CREATE TABLE inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  society_id uuid NOT NULL REFERENCES societies(id) ON DELETE CASCADE,
  name text NOT NULL,
  quantity integer NOT NULL,
  unit text NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE societies ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Add policies for public read access
CREATE POLICY "Allow public read access" ON societies
  FOR SELECT TO public USING (true);
  
CREATE POLICY "Allow public read access" ON inventory_items
  FOR SELECT TO public USING (true);

-- Insert sample societies
INSERT INTO societies (name, address, latitude, longitude, phone, opening_hours) VALUES
  ('Mandya Agricultural Society', 'Near Bus Stand, Mandya, Karnataka', 12.5246, 76.8960, '08232-222345', '9:00 AM - 6:00 PM'),
  ('Hassan Farmers Cooperative', 'BM Road, Hassan, Karnataka', 13.0068, 76.1003, '08172-268790', '8:30 AM - 7:00 PM'),
  ('Mysore Rural Society', 'Bannur Road, Mysore', 12.2958, 76.6394, '08212-456789', '9:00 AM - 6:30 PM'),
  ('Tumkur Cooperative Society', 'MG Road, Tumkur', 13.3379, 77.1173, '08162-234567', '9:00 AM - 6:00 PM'),
  ('Shimoga Farmers Society', 'SH-1, Shimoga', 13.9299, 75.5681, '08182-345678', '8:00 AM - 7:00 PM'),
  ('Belgaum Agricultural Coop', 'College Road, Belgaum', 15.8497, 74.4977, '08312-345678', '9:00 AM - 6:00 PM'),
  ('Dharwad Rural Society', 'PB Road, Dharwad', 15.4589, 75.0078, '08362-456789', '8:30 AM - 6:30 PM'),
  ('Gulbarga Cooperative', 'Station Road, Gulbarga', 17.3297, 76.8343, '08472-345678', '9:00 AM - 7:00 PM'),
  ('Bijapur Farmers Society', 'Market Road, Bijapur', 16.8302, 75.7100, '08352-234567', '8:00 AM - 6:00 PM'),
  ('Raichur Agricultural Coop', 'Main Road, Raichur', 16.2120, 77.3439, '08532-345678', '9:00 AM - 6:30 PM');

-- Insert inventory items for each society
INSERT INTO inventory_items (society_id, name, quantity, unit, price) 
SELECT 
  s.id,
  item_name,
  quantity,
  unit,
  price
FROM societies s
CROSS JOIN (
  VALUES 
    ('Rice', 1000, 'kg', 45),
    ('Wheat', 500, 'kg', 35),
    ('Ragi', 300, 'kg', 40),
    ('Jowar', 400, 'kg', 30),
    ('Toor Dal', 200, 'kg', 120),
    ('Urad Dal', 150, 'kg', 110),
    ('Sugar', 300, 'kg', 42),
    ('Fertilizer', 200, 'bags', 500),
    ('Seeds', 100, 'packets', 75),
    ('Pesticides', 50, 'liters', 450)
) AS items(item_name, quantity, unit, price);