import type { Workout } from "@/types/WorkoutTypes";

type WorkoutSummaryData = {
  workoutTime: string;
  exercisesDone: number;
  totalWeightLifted: number;
};

export const calculateWorkoutSummaryData = (
  workout: Workout,
): WorkoutSummaryData => {
  if (!workout.endTime) {
    return {
      workoutTime: "00:00:00",
      exercisesDone: 0,
      totalWeightLifted: 0,
    };
  }
  const time = workout.endTime.getTime() - workout.startTime.getTime();
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const workoutTime = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const summaryData: WorkoutSummaryData = {
    workoutTime: workoutTime,
    exercisesDone: workout.exercises.length,
    totalWeightLifted: workout.exercises.reduce((total, exercise) => {
      const exerciseTotal = exercise.sets.reduce((setTotal, set) => {
        // Calculation is done for finished workout, to workout be finished it must have all exercises and sets completed so there are no undefined or null values in sets.
        return setTotal + set.reps! * set.weight!;
      }, 0);
      return total + exerciseTotal;
    }, 0),
  };
  return summaryData;
};
