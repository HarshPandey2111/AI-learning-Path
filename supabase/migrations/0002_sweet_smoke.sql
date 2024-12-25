
INSERT INTO students (id, user_id, name, email, learning_style, preferred_difficulty)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  auth.uid(),
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