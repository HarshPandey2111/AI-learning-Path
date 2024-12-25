import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useMetrics } from '../hooks/useMetrics';
import { AttendanceChart } from '../components/charts/AttendanceChart';
import { FeedbackChart } from '../components/charts/FeedbackChart';
import { DateRangeSelector } from '../components/DateRangeSelector';

export function Dashboard() {
  const { metrics, loading, error, dateRange, setDateRange } = useMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <AttendanceChart data={metrics} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FeedbackChart data={metrics} />
        </div>
      </div>
    </div>
  );
}