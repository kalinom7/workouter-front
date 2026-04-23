import { useGetWorkoutTemplate } from "@/api/workouttemplate/hooks/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/contexts/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutTemplateExercisesList } from "./components/WorkoutTemplateExercisesList";
import { useRemoveWorkoutTemplateExerciseFromList } from "./hooks/useRemoveWorkoutTemplateExerciseFromList";
import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { removeExercise, isPending } =
    useRemoveWorkoutTemplateExerciseFromList(id, someUuid);
  const navigate = useNavigate();
  const {
    data: exercises,
    isLoading: isExercisesLoading,
    isError: isExercisesError,
  } = useGetAllExercises(someUuid);

  if (isError || isExercisesError) return <>Error loading workout template.</>;
  if (isLoading || isExercisesLoading || !data || !exercises)
    return <>Loading...</>;

  const onAddExerciseClick = () => {
    navigate(`/workout-template/${id}/add-exercise`);
  };
  const onRemoveExerciseClick = (order: number) => {
    removeExercise(order);
  };

  const onEditClick = (order: number) => {
    const exercise = data.exercises.find((e) => e.order === order);
    if (!exercise) return;
    navigate(
      `/workout-template/${id}/exercise/${order}?exerciseId=${exercise.exercise}`,
    );
  };

  return (
    <>
      <h1>Template name: {data.name}</h1>
      <h2>Exercises:</h2>
      <WorkoutTemplateExercisesList
        workoutTemplateExercises={data.exercises}
        exercises={exercises}
        onRemoveExerciseClick={onRemoveExerciseClick}
        onEditClick={onEditClick}
        isPending={isPending}
      ></WorkoutTemplateExercisesList>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
