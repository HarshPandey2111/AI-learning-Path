import { 
  getStudent, 
  getStudentInterests, 
  getStudentWeaknesses, 
  getWorkshops, 
  getMentor, 
  createDailyTask 
} from './api';
import type { Workshop, Mentor, DailyTask } from './types';

export async function getRecommendedWorkshops(studentId: string): Promise<Workshop[]> {
  try {
    const student = await getStudent(studentId);
    if (!student) return [];
    
    const interests = await getStudentInterests(studentId);
    if (!interests.length) return [];

    return await getWorkshops(interests, student.preferred_difficulty);
  } catch (error) {
    console.error('Error getting workshop recommendations:', error);
    return [];
  }
}

export async function generateDailyTask(studentId: string): Promise<DailyTask | null> {
  try {
    const weaknesses = await getStudentWeaknesses(studentId);
    if (!weaknesses.length) return null;

    // Find the area that needs most improvement
    const priorityWeakness = weaknesses.reduce((prev, current) => 
      prev.current_level < current.current_level ? prev : current
    );

    const task = {
      title: `Improve your ${priorityWeakness.category}`,
      description: `Practice exercise focused on ${priorityWeakness.category}`,
      type: 'practice',
      difficulty: 'beginner' as const,
      completed: false,
      due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    return await createDailyTask(task);
  } catch (error) {
    console.error('Error generating daily task:', error);
    return null;
  }
}

export async function findMentor(studentId: string): Promise<Mentor | null> {
  try {
    const interests = await getStudentInterests(studentId);
    if (!interests.length) return null;

    return await getMentor(interests);
  } catch (error) {
    console.error('Error finding mentor:', error);
    return null;
  }
}