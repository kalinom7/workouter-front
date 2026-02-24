import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRemoveWorkoutTemplateExercise } from "@/api/workouttemplate/useRemoveWorkoutTemplateExercise";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  EditableWorkoutTemplateExerciseItem,
  WorkoutTemplateExerciseItem,
} from "./WorkoutTemplateExerciseItems";
import { useEditWorkoutTemplateExercise } from "@/api/workouttemplate/useEditWorkoutTemplateExercise";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { mutate: removeExercise, isPending: isRemovingExercise } =
    useRemoveWorkoutTemplateExercise();
  const { mutate: editExercise, isPending: isEditingExercise } =
    useEditWorkoutTemplateExercise();
  const [exerciseToEdit, setExerciseToEdit] = useState(-1);

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
    setExerciseToEdit(order);
  };

  const onSaveSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["workout-templates", id, someUuid],
    });
    toast.success("Exercise updated.");
    setExerciseToEdit(-1);
  };
  const onSaveError = (error: Error) => {
    toast.error(`Failed to update exercise: ${error.message}`);
  };

  const onSaveExercise = (
    order: number,
    newSets: number,
    newRestPeriod: number,
  ) => {
    const original = data.exercises.find((e) => e.order === order);
    if (!original) return;
    editExercise(
      {
        userId: someUuid,
        workoutTemplateId: id,
        order,
        originalSets: original.sets,
        originalRestPeriod: original.restPeriod,
        newSets,
        newRestPeriod,
      },
      { onSuccess: onSaveSuccess, onError: onSaveError },
    );
  };

  return (
    <>
      <h1>Template name: {data.name}</h1>
      <h2>Exercises:</h2>
      <ul>
        {sortedExercises.map((exercise) =>
          exercise.order === exerciseToEdit ? (
            <EditableWorkoutTemplateExerciseItem
              key={exercise.order}
              exercise={exercise}
              onCancel={() => setExerciseToEdit(-1)}
              onSave={onSaveExercise}
              isPending={isEditingExercise}
            />
          ) : (
            <WorkoutTemplateExerciseItem
              key={exercise.order}
              exercise={exercise}
              onRemove={onRemoveExerciseClick}
              onEdit={onEditClick}
              isPending={isRemovingExercise}
            />
          ),
        )}
      </ul>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
