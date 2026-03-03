import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";
import { Button } from "@/components/ui/button";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const ExerciseSelector = () => {
  const { data, isLoading, isError } = useGetAllExercises(someUuid);
  const { id } = useContext(WorkoutTemplateContext);
  const navigate = useNavigate();
  if (isError) return <>Error loading exercises.</>;
  if (isLoading || !data) return <>Loading...</>;

  const exercises = data;

  const onSelectExerciseClick = (exerciseId: string) => {
    navigate(`/workout-template/${id}/add-exercise?exerciseId=${exerciseId}`);
  };

  return (
    <>
      <h2>Exercises:</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Button onClick={() => onSelectExerciseClick(exercise.id)}>
              {exercise.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
