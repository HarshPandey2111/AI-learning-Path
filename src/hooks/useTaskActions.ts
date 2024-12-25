import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useActionStatus } from './useActionStatus';

export function useTaskActions() {
  const { statuses, startAction, finishAction } = useActionStatus();

  const startTask = useCallback(async (taskId: string) => {
    try {
      startAction(taskId);

      const { error } = await supabase
        .from('daily_tasks')
        .update({ 
          status: 'in_progress',
          completed_at: null
        })
        .eq('id', taskId);

      if (error) throw error;
      finishAction(taskId, true);
    } catch (error) {
      console.error('Error starting task:', error);
      finishAction(taskId, false, 'Failed to start task');
    }
  }, [startAction, finishAction]);

  return { startTask, statuses };
}