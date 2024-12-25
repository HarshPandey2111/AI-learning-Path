/*
  # Fix Seed Data

  1. Changes
    - Add proper auth handling for seed data
    - Add RLS policies for public access during development
    - Update seed data to work without auth
*/

-- Temporarily disable RLS to allow seeding
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
ALTER TABLE interests DISABLE ROW LEVEL SECURITY;
ALTER TABLE weaknesses DISABLE ROW LEVEL SECURITY;
ALTER TABLE workshops DISABLE ROW LEVEL SECURITY;
ALTER TABLE mentors DISABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks DISABLE ROW LEVEL SECURITY;

-- Clear existing data
TRUNCATE students, interests, weaknesses, workshops, mentors, daily_tasks CASCADE;

-- Insert mock student (without user_id for development)
INSERT INTO students (id, name, email, learning_style, preferred_difficulty)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'John Doe',
  'john@example.com',
  'visual',
  'beginner'
);

-- Insert interests
INSERT INTO interests (student_id, category, interest_level)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'programming', 8),
  ('123e4567-e89b-12d3-a456-426614174000', 'design', 7);

-- Insert weaknesses
INSERT INTO weaknesses (student_id, category, current_level)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'time management', 4),
  ('123e4567-e89b-12d3-a456-426614174000', 'public speaking', 5);

-- Insert sample workshops
INSERT INTO workshops (title, description, category, difficulty, duration_minutes, max_participants)
VALUES 
  ('Intro to Web Development', 'Learn the basics of HTML, CSS, and JavaScript', 'programming', 'beginner', 120, 30),
  ('UI/UX Fundamentals', 'Master the basics of user interface design', 'design', 'beginner', 90, 25);

-- Insert sample mentor
INSERT INTO mentors (name, expertise, availability)
VALUES (
  'Sarah Smith',
  ARRAY['programming', 'design'],
  '{"weekdays": ["monday", "wednesday"], "hours": ["9:00", "14:00"]}'::jsonb
);

-- Re-enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE weaknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;

-- Add development policies for public access
CREATE POLICY "Allow public read access to students" ON students
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access to interests" ON interests
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access to weaknesses" ON weaknesses
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access to workshops" ON workshops
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access to mentors" ON mentors
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public read access to daily_tasks" ON daily_tasks
  FOR SELECT TO PUBLIC USING (true);

CREATE POLICY "Allow public insert to daily_tasks" ON daily_tasks
  FOR INSERT TO PUBLIC WITH CHECK (true);