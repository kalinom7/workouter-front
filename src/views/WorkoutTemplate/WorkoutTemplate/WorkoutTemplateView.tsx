import { useGetWorkoutTemplate } from "@/api/workouttemplate/hooks/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/contexts/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutTemplateExercisesList } from "./components/WorkoutTemplateExercisesList";
import { useRemoveWorkoutTemplateExerciseFromList } from "./hooks/useRemoveWorkoutTemplateExerciseFromList";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutTemplateView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, globalUserId);
  const { removeExercise, isPending } =
    useRemoveWorkoutTemplateExerciseFromList(id, globalUserId);
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
        onRemoveExerciseClick={onRemoveExerciseClick}
        onEditClick={onEditClick}
        isPending={isPending}
      ></WorkoutTemplateExercisesList>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
