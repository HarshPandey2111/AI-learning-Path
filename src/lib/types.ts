// Existing types...

export interface WorkshopMetrics {
  id: string;
  workshop_id: string;
  attendance_count: number;
  feedback_score: number;
  date: string;
}

export interface WorkshopStats {
  title: string;
  attendance: number[];
  feedback: number[];
  dates: string[];
}