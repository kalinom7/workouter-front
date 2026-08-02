import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";
import { Button } from "@/components/ui/button";
import type { Exercise } from "@/types/ExerciseTypes";
import { globalUserId } from "@/utils/globalUserId";

export const ExerciseSelector = ({
  onSelectExerciseClick,
  isPending,
}: {
  onSelectExerciseClick: (exercise: Exercise) => void;
  isPending: boolean;
}) => {
  const { data, isLoading, isError } = useGetAllExercises(globalUserId);

  if (isError) return <>Error loading exercises.</>;
  if (isLoading || !data) return <>Loading...</>;

  const exercises = data;

  // Think about confirmation of selection, maybe a modal with exercise details and confirm button, or just on click select and close selector; easy solution onClick shows modal that links to callback

  return (
    <>
      <h2>Exercises:</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <Button
              disabled={isPending}
              onClick={() => onSelectExerciseClick(exercise)}
            >
              {exercise.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};
