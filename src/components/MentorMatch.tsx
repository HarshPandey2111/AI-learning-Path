import React from 'react';
import { Brain, Users } from 'lucide-react';
import type { Mentor } from '../lib/types';
import { useMentorActions } from '../hooks/useMentorActions';
import { ActionButton } from './ActionButton';

interface MentorMatchProps {
  mentor: Mentor | null;
}

export function MentorMatch({ mentor }: MentorMatchProps) {
  const { scheduleSession, statuses } = useMentorActions();

  if (!mentor) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Users className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-semibold">Your Mentor Match</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-indigo-100 p-4 rounded-full">
          <Brain className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{mentor.name}</h3>
          <p className="text-gray-600">Expert in: {mentor.expertise.join(', ')}</p>
          <ActionButton
            onClick={() => scheduleSession(mentor.id)}
            status={statuses[mentor.id]}
            defaultText="Schedule Session"
            loadingText="Scheduling..."
            className="mt-2 px-4 py-2 bg-indigo-600 text-white"
          />
        </div>
      </div>
    </div>
  );
}