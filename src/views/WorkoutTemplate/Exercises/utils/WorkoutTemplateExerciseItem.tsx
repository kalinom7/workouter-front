import type { WorkoutTemplateExercise } from "@/api/workouttemplate/useAddWorkoutTemplateExercise";
import { Button } from "@/components/ui/button";
import type { Exercise } from "@/types/ExerciseTypes";

type WorkoutTemplateExerciseItemProps = {
  exercise: WorkoutTemplateExercise;
  exerciseDescription?: Exercise;
  onRemove: (order: number) => void;
  onEdit: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExerciseItem = ({
  exercise,
  exerciseDescription,
  onRemove,
  onEdit,
  isPending,
}: WorkoutTemplateExerciseItemProps) => {
  return (
    <li>
      Order: {exercise.order}, Exercise: {exerciseDescription?.name}, Sets:{" "}
      {exercise.sets}, Rest: {exercise.restPeriod}s
      <Button onClick={() => onEdit(exercise.order)}>Edit</Button>
      <Button onClick={() => onRemove(exercise.order)} disabled={isPending}>
        Remove
      </Button>
    </li>
  );
};
