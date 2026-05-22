export type WorkoutSchedulePatternItem =
  | { patternItemId: string; order: number; useOrder: number, type: 'workouttemplate'; workoutTemplateId: string }
  | { patternItemId: string; order: number; useOrder: number, type: 'rest'; workoutTemplateId: null };


export type WorkoutSchedule = {
  isActive: boolean;
  id: string;
  name: string;
  userId: string;
  pattern: WorkoutSchedulePatternItem[];
};
