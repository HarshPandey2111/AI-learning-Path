import React, { useEffect, useState } from 'react';
import { getRecommendedWorkshops, generateDailyTask, findMentor } from '../lib/recommendations';
import { DailyTask } from './DailyTask';
import { WorkshopList } from './WorkshopList';
import { MentorMatch } from './MentorMatch';
import type { Workshop, Mentor, DailyTask as DailyTaskType } from '../lib/types';

interface LearningPathProps {
  studentId: string;
}

export function LearningPath({ studentId }: LearningPathProps) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [dailyTask, setDailyTask] = useState<DailyTaskType | null>(null);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const [workshopsData, taskData, mentorData] = await Promise.all([
          getRecommendedWorkshops(studentId),
          generateDailyTask(studentId),
          findMentor(studentId)
        ]);

        setWorkshops(workshopsData);
        setDailyTask(taskData);
        setMentor(mentorData);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Learning Path</h1>
      <DailyTask task={dailyTask} />
      <WorkshopList workshops={workshops} />
      <MentorMatch mentor={mentor} />
    </div>
  );
}