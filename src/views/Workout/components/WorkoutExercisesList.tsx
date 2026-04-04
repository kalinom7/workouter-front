import type { WorkoutExercise } from "@/types/WorkoutTypes";
import { WorkoutSetsList } from "./WorkoutSetsList";
import { Button } from "@/components/ui/button";
import { useAddSetToWorkoutExercise } from "@/api/workout/hooks/useAddSetToWorkoutExercise";
import { useContext } from "react";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";
import { useRemoveExerciseFromWorkout } from "@/api/workout/hooks/useRemoveExerciseFromWorkout";
import { RestPeriodSetter } from "./RestPeriodSetter";

export const WorkoutExercisesList = ({
  workoutExercises,
}: {
  workoutExercises: WorkoutExercise[];
}) => {
  const { mutate: addSet, isPending: isAddingSet } =
    useAddSetToWorkoutExercise();
  const { mutate: removeExercise, isPending: isRemovingExercise } =
    useRemoveExerciseFromWorkout();

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
    addSet({ userId: globalUserId, workoutId: id, exerciseOrder });
  };

  const onRemoveExerciseClick = (exerciseOrder: number) => {
    removeExercise({ userId: globalUserId, workoutId: id, exerciseOrder });
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
            disabled={isAddingSet}
            onClick={() => onAddSetClick(exercise.order)}
          >
            Add set
          </Button>
          <Button
            onClick={() => onRemoveExerciseClick(exercise.order)}
            disabled={isRemovingExercise}
          >
            Remove Exercise
          </Button>
          <RestPeriodSetter exerciseOrder={exercise.order} />
        </li>
      ))}
    </ul>
  );
};
