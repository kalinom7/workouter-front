import type { WorkoutExercise } from "@/types/WorkoutTypes";
import { WorkoutSetsList } from "./WorkoutSetsList";
import { Button } from "@/components/ui/button";
import { useAddSetToWorkoutExercise } from "@/api/workout/hooks/useAddSetToWorkoutExercise";
import { useContext } from "react";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";

export const WorkoutExercisesList = ({
  workoutExercises,
}: {
  workoutExercises: WorkoutExercise[];
}) => {
  const { mutate, isPending } = useAddSetToWorkoutExercise();
  const sorted = [...workoutExercises].sort((a, b) => a.order - b.order);
  const { id } = useContext(WorkoutContext);
  const { data, isLoading, isError } = useGetAllExercises(globalUserId);
  if (isError) {
    return <>Error loading workout template.</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  const onAddSetClick = (exerciseOrder: number) => {
    mutate({ userId: globalUserId, workoutId: id, exerciseOrder });
  };

  return (
    <ul>
      {sorted.map((exercise) => (
        <li key={exercise.order}>
          <p>
            exercise:{data.find((ex) => ex.id === exercise.exerciseId)?.name}
          </p>
          <WorkoutSetsList
            workoutSets={exercise.sets}
            exerciseOrder={exercise.order}
          />
          <Button
            disabled={isPending}
            onClick={() => onAddSetClick(exercise.order)}
          >
            Add set
          </Button>
        </li>
      ))}
    </ul>
  );
};
