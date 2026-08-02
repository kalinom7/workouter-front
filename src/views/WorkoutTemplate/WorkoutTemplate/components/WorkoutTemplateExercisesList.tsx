import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";
import { WorkoutTemplateExerciseItem } from "./WorkoutTemplateExerciseItem";

type WorkoutTemplateExercisesListProps = {
  workoutTemplateExercises: WorkoutTemplateExercise[];
  onRemoveExerciseClick: (order: number) => void;
  onEditClick: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExercisesList = ({
  workoutTemplateExercises,
  onRemoveExerciseClick,
  onEditClick,
  isPending,
}: WorkoutTemplateExercisesListProps) => {
  const sortedExercises = [...workoutTemplateExercises].sort(
    (a, b) => a.order - b.order,
  );
  return (
    <ul>
      {sortedExercises.map((workoutTemplateExercise) => (
        <WorkoutTemplateExerciseItem
          key={workoutTemplateExercise.order}
          workoutTemplateExercise={workoutTemplateExercise}
          onRemove={onRemoveExerciseClick}
          onEdit={onEditClick}
          isPending={isPending}
        />
      ))}
    </ul>
  );
};
