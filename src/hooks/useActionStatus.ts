import { useState } from 'react';
import type { ActionStatus, ActionStatuses } from '../lib/types';

const defaultStatus: ActionStatus = {
  loading: false,
  error: null,
  success: false
};

export function useActionStatus() {
  const [statuses, setStatuses] = useState<ActionStatuses>({});

  const startAction = (id: string) => {
    setStatuses(prev => ({
      ...prev,
      [id]: { ...defaultStatus, loading: true }
    }));
  };

  const finishAction = (id: string, success: boolean, error: string | null = null) => {
    setStatuses(prev => ({
      ...prev,
      [id]: { loading: false, success, error }
    }));
  };

  const resetStatus = (id: string) => {
    setStatuses(prev => {
      const newStatuses = { ...prev };
      delete newStatuses[id];
      return newStatuses;
    });
  };

  return {
    statuses,
    startAction,
    finishAction,
    resetStatus
  };
}