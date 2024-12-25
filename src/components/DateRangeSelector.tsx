import React from 'react';

interface DateRangeSelectorProps {
  value: 'week' | 'month' | 'year';
  onChange: (range: 'week' | 'month' | 'year') => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex gap-2">
      {(['week', 'month', 'year'] as const).map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-4 py-2 rounded-md ${
            value === range
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {range.charAt(0).toUpperCase() + range.slice(1)}
        </button>
      ))}
    </div>
  );
}