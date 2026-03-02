import type { WorkoutTemplateExercise } from "@/api/workouttemplate/useAddWorkoutTemplateExercise";
import { Button } from "@/components/ui/button";

type WorkoutTemplateExerciseItemProps = {
  exercise: WorkoutTemplateExercise;
  onRemove: (order: number) => void;
  onEdit: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExerciseItem = ({
  exercise,
  onRemove,
  onEdit,
  isPending,
}: WorkoutTemplateExerciseItemProps) => {
  return (
    <li>
      Order: {exercise.order}, Exercise ID: {exercise.exercise}, Sets:{" "}
      {exercise.sets}, Rest: {exercise.restPeriod}s
      <Button onClick={() => onEdit(exercise.order)}>Edit</Button>
      <Button onClick={() => onRemove(exercise.order)} disabled={isPending}>
        Remove
      </Button>
    </li>
  );
};
