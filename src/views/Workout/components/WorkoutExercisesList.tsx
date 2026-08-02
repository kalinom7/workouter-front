import type { WorkoutExercise } from "@/types/WorkoutTypes";
import { WorkoutSetsList } from "./WorkoutSetsList";
import { Button } from "@/components/ui/button";
import { useAddSetToWorkoutExercise } from "@/api/workout/hooks/useAddSetToWorkoutExercise";
import { useContext } from "react";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
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

  const onAddSetClick = (exerciseOrder: number) => {
    addSet({ userId: globalUserId, workoutId: id, exerciseOrder });
  };

  const onRemoveExerciseClick = (exerciseOrder: number) => {
    removeExercise({ userId: globalUserId, workoutId: id, exerciseOrder });
  };

  return (
    <ul>
      {sorted.map((workoutExercise) => (
        <li key={workoutExercise.order}>
          <p>exercise:{workoutExercise.exercise.name}</p>
          <WorkoutSetsList
            workoutSets={workoutExercise.sets}
            exerciseOrder={workoutExercise.order}
          />
          <Button
            disabled={isAddingSet}
            onClick={() => onAddSetClick(workoutExercise.order)}
          >
            Add set
          </Button>
          <Button
            onClick={() => onRemoveExerciseClick(workoutExercise.order)}
            disabled={isRemovingExercise}
          >
            Remove Exercise
          </Button>
          <RestPeriodSetter exerciseOrder={workoutExercise.order} />
        </li>
      ))}
    </ul>
  );
};
