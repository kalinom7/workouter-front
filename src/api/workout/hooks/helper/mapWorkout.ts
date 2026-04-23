import type { Workout, WorkoutDto } from "@/types/WorkoutTypes";

/*
 * Maps WorkoutDto to Workout by parsing date strings to Date objects. This way we can keep the API layer separate from the rest of the app and avoid having to deal with date parsing in multiple places.
 */

export const mapWorkout = (dto: WorkoutDto): Workout => ({
  id: dto.id,
  userId: dto.userId,
  startTime: new Date(dto.startTime),
  endTime: dto.endTime ? new Date(dto.endTime) : null,
  exercises: dto.exercises,
});
