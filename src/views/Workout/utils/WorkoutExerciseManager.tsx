import { WorkoutExercisesList } from "./WorkoutExercisesList";
import { Button } from "@/components/ui/button";
import { useAddExerciseToWorkout } from "@/api/workout/hooks/useAddExerciseToWorkout";
import { useContext, useState } from "react";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { ExerciseSelector } from "@/views/WorkoutTemplate/ExerciseSelector/utils/ExerciseSelector";
import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutExerciseManager = () => {
  const { mutate, isPending } = useAddExerciseToWorkout();
  const { id } = useContext(WorkoutContext);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  const { data, isLoading, isError } = useGetWorkout(userId, id);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading workout</p>;
  if (!data) return <p>Workout not found</p>;
  const workout = data;

  const onAddSelectedExerciseClick = (exerciseId: string) => {
    mutate({ userId, workoutId: id, exerciseId: exerciseId });

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
