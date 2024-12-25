import { supabase } from './supabase';
import type { Student, Workshop, Mentor, DailyTask } from './types';

export async function getStudent(studentId: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', studentId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }

  return data;
}

export async function getStudentInterests(studentId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('interests')
    .select('category')
    .eq('student_id', studentId);

  if (error) {
    console.error('Error fetching interests:', error);
    return [];
  }

  return data?.map(interest => interest.category) || [];
}

export async function getStudentWeaknesses(studentId: string): Promise<Array<{ category: string; current_level: number }>> {
  const { data, error } = await supabase
    .from('weaknesses')
    .select('category, current_level')
    .eq('student_id', studentId);

  if (error) {
    console.error('Error fetching weaknesses:', error);
    return [];
  }

  return data || [];
}

export async function getWorkshops(categories: string[], difficulty: string): Promise<Workshop[]> {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .in('category', categories)
    .eq('difficulty', difficulty)
    .limit(5);

  if (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }

  return data || [];
}

export async function getMentor(expertise: string[]): Promise<Mentor | null> {
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .contains('expertise', expertise)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching mentor:', error);
    return null;
  }

  return data;
}

export async function createDailyTask(task: Omit<DailyTask, 'id'>): Promise<DailyTask | null> {
  const { data, error } = await supabase
    .from('daily_tasks')
    .insert(task)
    .select()
    .single();

  if (error) {
    console.error('Error creating daily task:', error);
    return null;
  }

  return data;
}