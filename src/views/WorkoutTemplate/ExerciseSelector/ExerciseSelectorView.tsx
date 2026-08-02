import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ExerciseSelector } from "./components/ExerciseSelector";
import type { Exercise } from "@/types/ExerciseTypes";

export const ExerciseSelectorView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const workoutTemplateId = params.id;
  const order = params.order;
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const onSelectExerciseClick = (exercise: Exercise) => {
    if (mode === "edit") {
      navigate(
        `/workout-templates/${workoutTemplateId}/exercise/${order}?exerciseId=${exercise.id}`,
      );
    }

    if (mode === "add") {
      navigate(
        `/workout-templates/${workoutTemplateId}/add-exercise?exerciseId=${exercise.id}`,
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
