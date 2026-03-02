import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WorkoutTemplateExercisesList } from "./WorkoutTemplateExercisesList";
import { useRemoveWorkoutTemplateExerciseFromList } from "./useRemoveWorkoutTemplateExerciseFromList";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { removeExercise, isPending } =
    useRemoveWorkoutTemplateExerciseFromList(id, someUuid);
  const navigate = useNavigate();

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;

  const onAddExerciseClick = () => {
    navigate(`/workout-template/${id}/add-exercise`);
  };
  const onRemoveExerciseClick = (order: number) => {
    removeExercise(order);
  };

  const onEditClick = (order: number) => {
    const exercise = data.exercises.find((e) => e.order === order);
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
      <WorkoutTemplateExercisesList
        exercises={data.exercises}
        onRemoveExerciseClick={onRemoveExerciseClick}
        onEditClick={onEditClick}
        isPending={isPending}
      ></WorkoutTemplateExercisesList>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
