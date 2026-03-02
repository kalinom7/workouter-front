import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useRemoveWorkoutTemplateExercise } from "@/api/workouttemplate/useRemoveWorkoutTemplateExercise";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { WorkoutTemplateExerciseItem } from "./WorkoutTemplateExerciseItems";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { mutate: removeExercise, isPending: isRemovingExercise } =
    useRemoveWorkoutTemplateExercise();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;

  const sortedExercises = [...data.exercises].sort((a, b) => a.order - b.order);

  const onAddExerciseClick = () => {
    navigate(`/workout-template/${id}/add-exercise`);
  };

  const onRemoveSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["workout-templates", id, someUuid],
    });
    toast.success("Exercise removed from template.");
  };
  const onRemoveError = (error: Error) => {
    toast.error(`Failed to remove exercise from template: ${error.message}`);
  };
  const onRemoveExerciseClick = (order: number) => {
    removeExercise(
      { userId: someUuid, workoutTemplateId: id, order },
      { onSuccess: onRemoveSuccess, onError: onRemoveError },
    );
  };

  const onEditClick = (order: number) => {
    const exercise = sortedExercises.find((e) => e.order === order);
    if (!exercise) {
      toast.error("Exercise not found.");
      return;
    }
    const exerciseId = exercise.exercise;
    const sets = exercise.sets;
    const restPeriod = exercise.restPeriod;

    navigate(`/workout-template/${id}/exercise/${order}`, {
      state: { exerciseId, sets, restPeriod, order },
    });
  };

  return (
    <>
      <h1>Template name: {data.name}</h1>
      <h2>Exercises:</h2>
      <ul>
        {sortedExercises.map((exercise) => (
          <WorkoutTemplateExerciseItem
            key={exercise.order}
            exercise={exercise}
            onRemove={onRemoveExerciseClick}
            onEdit={onEditClick}
            isPending={isRemovingExercise}
          />
        ))}
      </ul>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
