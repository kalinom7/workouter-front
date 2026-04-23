import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ExercisesList } from "./components/ExercisesList";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const AllExercisesView = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllExercises(someUuid);

  if (isError) return <>Error loading exercises.</>;
  if (isLoading || !data) return <>Loading...</>;

  const onCreateExerciseClick = () => {
    navigate("/exercise/create");
  };

  const exercises = data;

  return (
    <>
      <h2>Exercises:</h2>
      <ExercisesList exercises={exercises} />
      <Button onClick={onCreateExerciseClick}>Create New Exercise</Button>
    </>
  );
};
