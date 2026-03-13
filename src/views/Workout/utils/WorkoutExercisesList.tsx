import type { WorkoutExercise } from "@/types/WorkoutTypes"
import { WorkoutSetsList } from "./WorkoutSetsList"

export const WorkoutExercisesList = ({ workoutExercises }: { workoutExercises: WorkoutExercise[] }) => {

  const sorted = [...workoutExercises].sort((a,b) => a.order - b.order);

  return (
    <ul>
      {sorted.map((exercise) => (
        <li key={exercise.order}>
          <p>exercise:{exercise.exerciseId}</p>
          <WorkoutSetsList workoutSets={exercise.sets} />
        </li>
      ))}
    </ul>
  );
};