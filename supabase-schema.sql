-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'employee')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'low_stock', 'out_of_stock')),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_inventory_status ON inventory(status);
CREATE INDEX IF NOT EXISTS idx_inventory_created_by ON inventory(created_by);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Create policies for inventory table
CREATE POLICY "Admins can do everything" ON inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Managers can view and update inventory" ON inventory
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Managers can update inventory" ON inventory
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Employees can view inventory" ON inventory
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() AND users.role IN ('admin', 'manager', 'employee')
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_inventory_updated_at 
  BEFORE UPDATE ON inventory 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Function to update inventory status based on quantity
CREATE OR REPLACE FUNCTION update_inventory_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quantity = 0 THEN
    NEW.status = 'out_of_stock';
  ELSIF NEW.quantity <= 5 THEN
    NEW.status = 'low_stock';
  ELSE
    NEW.status = 'available';
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update status based on quantity
CREATE TRIGGER update_inventory_status_trigger
  BEFORE INSERT OR UPDATE ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_inventory_status();

-- Insert sample data
INSERT INTO users (email, name, role) VALUES
('admin@inventori.com', 'Admin User', 'admin'),
('manager@inventori.com', 'Manager User', 'manager'),
('employee@inventori.com', 'Employee User', 'employee');

INSERT INTO inventory (name, description, quantity, category, location, created_by) VALUES
('Laptop Dell XPS 15', 'High-performance laptop for development', 10, 'Electronics', 'Rack A-1', (SELECT id FROM users WHERE role = 'admin')),
('Office Chair', 'Ergonomic office chair', 25, 'Furniture', 'Storage Room B', (SELECT id FROM users WHERE role = 'admin')),
('Printer HP LaserJet', 'Monochrome laser printer', 3, 'Electronics', 'Office Area', (SELECT id FROM users WHERE role = 'admin')),
('Whiteboard', '4x6 feet whiteboard with markers', 8, 'Office Supplies', 'Meeting Room 1', (SELECT id FROM users WHERE role = 'admin')),
('Standing Desk', 'Adjustable height standing desk', 15, 'Furniture', 'Rack C-2', (SELECT id FROM users WHERE role = 'admin'));
