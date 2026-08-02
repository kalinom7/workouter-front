import type { WorkoutTemplate } from "./WorkoutTemplateTypes";

export type WorkoutPatternItem = {
  id: string;
  order: number;
  useOrder: number;
  workoutTemplate: WorkoutTemplate;
  restDays: number;
};


export type WorkoutSchedule = {
  isActive: boolean;
  setActiveDate: Date | null;
  id: string;
  name: string;
  userId: string;
  pattern: WorkoutPatternItem[];
  lastOrder: number | null;
  lastFinishedWorkoutDate: Date | null;
};

export type ScheduledActivity = {
  scheduledActivity: WorkoutTemplate | null;
}