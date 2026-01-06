export type WorkoutScheduleBlock =
  | { blockItemId: string; order: number; type: 'workouttemplate'; WorkoutTemplateId: string }
  | { blockItemId: string; order: number; type: 'rest'; period: number };


export type WorkoutSchedule = {
  isActive: boolean;
  id: string;
  name: string;
  userId: string;
  block: WorkoutScheduleBlock[];
};
