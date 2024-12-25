import { supabase } from '../supabase';
import type { WorkshopMetrics } from '../types';

export async function getWorkshopMetrics(): Promise<WorkshopMetrics[]> {
  const { data, error } = await supabase
    .from('workshop_metrics')
    .select('*')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching workshop metrics:', error);
    return [];
  }

  return data || [];
}