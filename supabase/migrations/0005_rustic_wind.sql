

-- Add student_id if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'learning_paths' AND column_name = 'student_id'
  ) THEN
    ALTER TABLE learning_paths ADD COLUMN student_id uuid REFERENCES students(id);
  END IF;
END $$;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON learning_paths;

-- Create new insert policy
CREATE POLICY "Allow insert for authenticated users" ON learning_paths
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM students 
      WHERE id = learning_paths.student_id
    )
  );