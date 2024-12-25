/*
  # Add task tracking fields
  
  1. Changes
    - Add tracking fields to daily_tasks table:
      - completed_at: When the task was completed
      - status: Current task status (pending, in_progress, completed)
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add status type for tasks
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed');

-- Add tracking columns to daily_tasks
ALTER TABLE daily_tasks 
  ADD COLUMN IF NOT EXISTS status task_status DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS completed_at timestamptz;