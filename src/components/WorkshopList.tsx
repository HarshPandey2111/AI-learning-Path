import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Workshop } from '../lib/types';
import { useWorkshopActions } from '../hooks/useWorkshopActions';
import { ActionButton } from './ActionButton';

interface WorkshopListProps {
  workshops: Workshop[];
}

export function WorkshopList({ workshops }: WorkshopListProps) {
  const { enrollInWorkshop, statuses } = useWorkshopActions();

  if (!workshops.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-4">
        <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-semibold">Recommended Workshops</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg mb-2">{workshop.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-indigo-600">{workshop.category}</span>
              <ActionButton
                onClick={() => enrollInWorkshop(workshop.id)}
                status={statuses[workshop.id]}
                defaultText="Enroll"
                loadingText="Enrolling..."
                className="px-3 py-1 bg-indigo-100 text-indigo-700"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}