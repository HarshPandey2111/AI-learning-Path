import { supabase } from '../supabase';
import { MOCK_STUDENT_ID } from '../constants';

export const checkExistingEnrollment = async (workshopId: string) => {
  const { data, error } = await supabase
    .from('learning_paths')
    .select('id')
    .eq('workshop_id', workshopId)
    .eq('student_id', MOCK_STUDENT_ID)
    .maybeSingle();
    
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const checkExistingSession = async (mentorId: string) => {
  const { data, error } = await supabase
    .from('learning_paths')
    .select('id')
    .eq('mentor_id', mentorId)
    .eq('student_id', MOCK_STUDENT_ID)
    .eq('status', 'scheduled')
    .maybeSingle();
    
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};