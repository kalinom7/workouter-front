import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { useParams } from "react-router-dom";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateExercisesView = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetWorkoutTemplate(
    id ?? "",
    someUuid,
  );

  if (!id) return <>Invalid workout template ID</>;
  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;

  const sortedExercises = [...data.exercises].sort((a, b) => a.order - b.order);

  return (
    <>
      <h1>Template name: {data.name}</h1>
      <h2>Exercises:</h2>
      <ul>
        {sortedExercises.map((exercise) => (
          <li key={exercise.order}>
            Exercise ID: {exercise.exercise}, Sets: {exercise.sets}, Rest:{" "}
            {exercise.restPeriod}s
          </li>
        ))}
      </ul>
    </>
  );
};
