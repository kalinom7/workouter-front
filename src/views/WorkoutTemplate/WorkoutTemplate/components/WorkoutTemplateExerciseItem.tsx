import { Button } from "@/components/ui/button";
import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";

type WorkoutTemplateExerciseItemProps = {
  workoutTemplateExercise: WorkoutTemplateExercise;
  onRemove: (order: number) => void;
  onEdit: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExerciseItem = ({
  workoutTemplateExercise,
  onRemove,
  onEdit,
  isPending,
}: WorkoutTemplateExerciseItemProps) => {
  return (
    <li>
      Order: {workoutTemplateExercise.order}, Exercise:{" "}
      {workoutTemplateExercise.exercise.name}, Sets:{" "}
      {workoutTemplateExercise.sets}, Rest: {workoutTemplateExercise.restPeriod}
      s
      <Button onClick={() => onEdit(workoutTemplateExercise.order)}>
        Edit
      </Button>
      <Button
        onClick={() => onRemove(workoutTemplateExercise.order)}
        disabled={isPending}
      >
        Remove
      </Button>
    </li>
  );
};
