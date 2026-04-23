import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ExerciseSelector } from "./components/ExerciseSelector";

export const ExerciseSelectorView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const workoutTemplateId = params.id;
  const order = params.order;
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const onSelectExerciseClick = (id: string) => {
    if (mode === "edit") {
      navigate(
        `/workout-template/${workoutTemplateId}/exercise/${order}?exerciseId=${id}`,
      );
    }

    if (mode === "add") {
      navigate(
        `/workout-template/${workoutTemplateId}/add-exercise?exerciseId=${id}`,
      );
    }
  };
  return (
    <ExerciseSelector
      isPending={false}
      onSelectExerciseClick={onSelectExerciseClick}
    />
  );
};
