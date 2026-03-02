import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";
import { Button } from "@/components/ui/button";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const ExerciseSelector = ({
  setExerciseId,
  onSelectClick,
}: {
  setExerciseId: (id: string) => void;
  onSelectClick: () => void;
}) => {
  const { data, isLoading, isError } = useGetAllExercises(someUuid);

  if (isError) return <>Error loading exercises.</>;
  if (isLoading || !data) return <>Loading...</>;

  const exercises = data;

  const onSelectExerciseClick = (exerciseId: string) => {
    setExerciseId(exerciseId);
    onSelectClick();
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
