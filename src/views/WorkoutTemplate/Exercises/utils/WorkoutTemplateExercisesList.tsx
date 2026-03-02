import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";
import { WorkoutTemplateExerciseItem } from "./WorkoutTemplateExerciseItem";

type WorkoutTemplateExercisesListProps = {
  exercises: WorkoutTemplateExercise[];
  onRemoveExerciseClick: (order: number) => void;
  onEditClick: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExercisesList = ({
  exercises,
  onRemoveExerciseClick,
  onEditClick,
  isPending,
}: WorkoutTemplateExercisesListProps) => {
  const sortedExercises = [...exercises].sort((a, b) => a.order - b.order);
  return (
    <ul>
      {sortedExercises.map((exercise) => (
        <WorkoutTemplateExerciseItem
          key={exercise.order}
          exercise={exercise}
          onRemove={onRemoveExerciseClick}
          onEdit={onEditClick}
          isPending={isPending}
        />
      ))}
    </ul>
  );
};
