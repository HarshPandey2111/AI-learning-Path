import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_STUDENT_ID } from '../lib/constants';
import { getFutureDate } from '../lib/dates';
import { ONE_MONTH_MS } from '../lib/constants';
import { useActionStatus } from './useActionStatus';

export function useWorkshopActions() {
  const { statuses, startAction, finishAction } = useActionStatus();

  const enrollInWorkshop = useCallback(async (workshopId: string) => {
    try {
      startAction(workshopId);

      const { data: existingEnrollment } = await supabase
        .from('learning_paths')
        .select('id')
        .eq('workshop_id', workshopId)
        .eq('student_id', MOCK_STUDENT_ID)
        .maybeSingle();

      if (existingEnrollment) {
        finishAction(workshopId, false, 'Already enrolled in this workshop');
        return;
      }

      const { error } = await supabase
        .from('learning_paths')
        .insert({
          workshop_id: workshopId,
          student_id: MOCK_STUDENT_ID,
          status: 'enrolled',
          start_date: new Date().toISOString(),
          end_date: getFutureDate(ONE_MONTH_MS)
        });

      if (error) throw error;
      finishAction(workshopId, true);
    } catch (error) {
      console.error('Error enrolling in workshop:', error);
      finishAction(workshopId, false, 'Failed to enroll in workshop');
    }
  }, [startAction, finishAction]);

  return { enrollInWorkshop, statuses };
}