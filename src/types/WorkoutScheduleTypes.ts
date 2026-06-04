export type WorkoutPatternItem = {
  patternItemId: string;
  order: number;
  useOrder: number;
  workoutTemplateId: string;
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
