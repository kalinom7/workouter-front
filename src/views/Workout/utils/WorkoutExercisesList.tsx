import type { WorkoutExercise } from "@/types/WorkoutTypes"
import { WorkoutSetsList } from "./WorkoutSetsList"
import { Button } from "@/components/ui/button";
import { useAddSetToWorkoutExercise } from "@/api/workout/hooks/useAddSetToWorkoutExercise";
import { useContext } from "react";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";

export const WorkoutExercisesList = ({ workoutExercises }: { workoutExercises: WorkoutExercise[] }) => {
  const {mutate, isPending} = useAddSetToWorkoutExercise();
  const sorted = [...workoutExercises].sort((a,b) => a.order - b.order);
  const {id} = useContext(WorkoutContext);

  const onAddSetClick = (exerciseOrder : number) => {
    mutate({userId: globalUserId, workoutId: id, exerciseOrder})
  }

  return (
    <ul>
      {sorted.map((exercise) => (
        <li key={exercise.order}>
          <p>exercise:{exercise.exerciseId}</p>
          <WorkoutSetsList workoutSets={exercise.sets} />
          <Button disabled={isPending} onClick={() => onAddSetClick(exercise.order)}>Add set</Button>
        </li>
      ))}
    </ul>
  );
};