import { useState, useEffect } from 'react';
import { getWorkshopMetrics } from '../lib/api/metrics';
import type { WorkshopMetrics, WorkshopStats } from '../lib/types';

export function useMetrics() {
  const [metrics, setMetrics] = useState<WorkshopStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true);
        const data = await getWorkshopMetrics();
        const processedData = processMetrics(data, dateRange);
        setMetrics(processedData);
        setError(null);
      } catch (err) {
        setError('Failed to load metrics');
        console.error('Error loading metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [dateRange]);

  return { metrics, loading, error, dateRange, setDateRange };
}

function processMetrics(data: WorkshopMetrics[], range: 'week' | 'month' | 'year'): WorkshopStats[] {
  // Group by workshop
  const workshopGroups = data.reduce((acc, metric) => {
    if (!acc[metric.workshop_id]) {
      acc[metric.workshop_id] = {
        title: metric.title || 'Unknown Workshop',
        attendance: [],
        feedback: [],
        dates: []
      };
    }
    
    acc[metric.workshop_id].attendance.push(metric.attendance_count);
    acc[metric.workshop_id].feedback.push(metric.feedback_score);
    acc[metric.workshop_id].dates.push(metric.date);
    
    return acc;
  }, {} as Record<string, WorkshopStats>);

  return Object.values(workshopGroups);
}