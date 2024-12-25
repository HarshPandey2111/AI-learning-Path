import React from 'react';
import { Target } from 'lucide-react';
import type { DailyTask as DailyTaskType } from '../lib/types';
import { useTaskActions } from '../hooks/useTaskActions';
import { ActionButton } from './ActionButton';

interface DailyTaskProps {
  task: DailyTaskType | null;
}

export function DailyTask({ task }: DailyTaskProps) {
  const { startTask, statuses } = useTaskActions();

  if (!task) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <Target className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-semibold">Today's Task</h2>
      </div>
      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <ActionButton
          onClick={() => startTask(task.id)}
          status={statuses[task.id]}
          defaultText="Start Task"
          loadingText="Starting..."
          className="mt-4 px-4 py-2 bg-indigo-600 text-white"
        />
      </div>
    </div>
  );
}