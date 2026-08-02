import { WorkoutExercisesList } from "./WorkoutExercisesList";
import { Button } from "@/components/ui/button";
import { useAddExerciseToWorkout } from "@/api/workout/hooks/useAddExerciseToWorkout";
import { useContext, useState } from "react";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
import { ExerciseSelector } from "@/views/WorkoutTemplate/ExerciseSelector/components/ExerciseSelector";
import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";

import { globalUserId } from "@/utils/globalUserId";
import type { Exercise } from "@/types/ExerciseTypes";

export const WorkoutExerciseManager = () => {
  const { mutate, isPending } = useAddExerciseToWorkout();

  const { id } = useContext(WorkoutContext);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const { data, isLoading, isError } = useGetWorkout(globalUserId, id);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading workout</p>;
  if (!data) return <p>Workout not found</p>;
  const workout = data;

  const onAddSelectedExerciseClick = (exercise: Exercise) => {
    mutate({
      userId: globalUserId,
      workoutId: id,
      exercise,
    });

    setShowExerciseSelector(false);
  };

  return (
    <>
      {workout.exercises.length > 0 ? (
        <WorkoutExercisesList workoutExercises={workout.exercises} />
      ) : (
        <p>Add your first exercise to the workout</p>
      )}
      {showExerciseSelector === false && (
        <Button
          disabled={isPending}
          onClick={() => setShowExerciseSelector(true)}
        >
          Add Exercise
        </Button>
      )}

      {showExerciseSelector && (
        <ExerciseSelector
          isPending={isPending}
          onSelectExerciseClick={onAddSelectedExerciseClick}
        />
      )}
    </>
  );
};
