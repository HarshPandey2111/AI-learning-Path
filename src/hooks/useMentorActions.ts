import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_STUDENT_ID, ONE_WEEK_MS } from '../lib/constants';
import { getFutureDate } from '../lib/dates';
import { useActionStatus } from './useActionStatus';

export function useMentorActions() {
  const { statuses, startAction, finishAction } = useActionStatus();

  const scheduleSession = useCallback(async (mentorId: string) => {
    try {
      startAction(mentorId);

      const { data: existingSession } = await supabase
        .from('learning_paths')
        .select('id')
        .eq('mentor_id', mentorId)
        .eq('student_id', MOCK_STUDENT_ID)
        .eq('status', 'scheduled')
        .maybeSingle();

      if (existingSession) {
        finishAction(mentorId, false, 'Already have a session scheduled');
        return;
      }

      const { error } = await supabase
        .from('learning_paths')
        .insert({
          mentor_id: mentorId,
          student_id: MOCK_STUDENT_ID,
          status: 'scheduled',
          start_date: new Date().toISOString(),
          end_date: getFutureDate(ONE_WEEK_MS)
        });

      if (error) throw error;
      finishAction(mentorId, true);
    } catch (error) {
      console.error('Error scheduling session:', error);
      finishAction(mentorId, false, 'Failed to schedule session');
    }
  }, [startAction, finishAction]);

  return { scheduleSession, statuses };
}