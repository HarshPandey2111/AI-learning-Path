/*
  # Fix RLS policies for learning paths

  1. Changes
    - Add policies to allow public access during development
    - Enable insert and select operations for all users
*/

-- Temporarily disable RLS
ALTER TABLE learning_paths DISABLE ROW LEVEL SECURITY;

-- Create development policies for public access
CREATE POLICY "Allow public insert to learning_paths" 
  ON learning_paths FOR INSERT 
  TO PUBLIC 
  WITH CHECK (true);

CREATE POLICY "Allow public select from learning_paths" 
  ON learning_paths FOR SELECT 
  TO PUBLIC 
  USING (true);

-- Re-enable RLS
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;