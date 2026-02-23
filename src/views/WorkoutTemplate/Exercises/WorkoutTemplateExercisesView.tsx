import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;

  const sortedExercises = [...data.exercises].sort((a, b) => a.order - b.order);

  const onAddExerciseClick = () => {
    navigate(`/workout-template/${id}/add-exercise`);
  };

  return (
    <>
      <h1>Template name: {data.name}</h1>
      <h2>Exercises:</h2>
      <ul>
        {sortedExercises.map((exercise) => (
          <li key={exercise.order}>
            Order: {exercise.order}, Exercise ID: {exercise.exercise}, Sets:{" "}
            {exercise.sets}, Rest: {exercise.restPeriod}s
          </li>
        ))}
      </ul>
      <Button onClick={onAddExerciseClick}>Add Exercise to Template</Button>
    </>
  );
};
