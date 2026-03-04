import { useNavigate, useParams } from "react-router-dom";
import { ExerciseSelector } from "./ExerciseSelector";

export const ExerciseSelectorView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const workoutTemplateId = params.id;
  const order = params.order;

  return (
    <ExerciseSelector
      onSelectExerciseClick={(id) => {
        navigate(
          `/workout-template/${workoutTemplateId}/exercise/${order}?exerciseId=${id}`,
        );
      }}
    />
  );
};
