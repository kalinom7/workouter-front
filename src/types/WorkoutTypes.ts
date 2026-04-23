/*
 * WorkoutDto exists for purpose of mapping date strings to Date objects in Workout. This way we can keep the API layer separate from the rest of the app and avoid having to deal with date parsing in multiple places.
 */
export type WorkoutDto = {
  id: string;
  userId: string;
  startTime: string;
  endTime: string | null;
  exercises: WorkoutExercise[];
};

export type Workout = {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date | null;
  exercises: WorkoutExercise[];
};

export type WorkoutExerciseSet = {
  weight: number | null;
  reps: number | null;
  order: number;
  isCompleted: boolean;
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: WorkoutExerciseSet[];
  restPeriod?: number; //seconds
  order: number;
  isCompleted: boolean;
};
