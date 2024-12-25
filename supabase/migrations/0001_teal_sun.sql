

-- Create enum types for common categories
CREATE TYPE learning_style AS ENUM ('visual', 'auditory', 'kinesthetic', 'reading_writing');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  email text NOT NULL,
  learning_style learning_style NOT NULL,
  preferred_difficulty difficulty_level DEFAULT 'beginner',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Strengths table
CREATE TABLE IF NOT EXISTS strengths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  category text NOT NULL,
  proficiency_level integer CHECK (proficiency_level BETWEEN 1 AND 10),
  created_at timestamptz DEFAULT now()
);

-- Weaknesses table
CREATE TABLE IF NOT EXISTS weaknesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  category text NOT NULL,
  current_level integer CHECK (current_level BETWEEN 1 AND 10),
  created_at timestamptz DEFAULT now()
);

-- Interests table
CREATE TABLE IF NOT EXISTS interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  category text NOT NULL,
  interest_level integer CHECK (interest_level BETWEEN 1 AND 10),
  created_at timestamptz DEFAULT now()
);

-- Workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty difficulty_level NOT NULL,
  duration_minutes integer NOT NULL,
  max_participants integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  expertise text[] NOT NULL,
  availability jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Learning paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  workshop_id uuid REFERENCES workshops(id),
  mentor_id uuid REFERENCES mentors(id),
  status text NOT NULL DEFAULT 'pending',
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Daily tasks table
CREATE TABLE IF NOT EXISTS daily_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  difficulty difficulty_level NOT NULL,
  completed boolean DEFAULT false,
  due_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE strengths ENABLE ROW LEVEL SECURITY;
ALTER TABLE weaknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON students FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own strengths"
  ON strengths FOR SELECT
  USING ((SELECT user_id FROM students WHERE id = student_id) = auth.uid());

CREATE POLICY "Users can view their own weaknesses"
  ON weaknesses FOR SELECT
  USING ((SELECT user_id FROM students WHERE id = student_id) = auth.uid());

CREATE POLICY "Users can view their own interests"
  ON interests FOR SELECT
  USING ((SELECT user_id FROM students WHERE id = student_id) = auth.uid());

CREATE POLICY "Everyone can view workshops"
  ON workshops FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view mentor profiles"
  ON mentors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own learning paths"
  ON learning_paths FOR SELECT
  USING ((SELECT user_id FROM students WHERE id = student_id) = auth.uid());

CREATE POLICY "Users can view their own daily tasks"
  ON daily_tasks FOR SELECT
  USING ((SELECT user_id FROM students WHERE id = student_id) = auth.uid());