import type { WorkoutTemplateExercise } from "@/types/WorkoutTemplateTypes";
import { WorkoutTemplateExerciseItem } from "./WorkoutTemplateExerciseItem";
import type { Exercise } from "@/types/ExerciseTypes";

type WorkoutTemplateExercisesListProps = {
  workoutTemplateExercises: WorkoutTemplateExercise[];
  exercises: Exercise[];
  onRemoveExerciseClick: (order: number) => void;
  onEditClick: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExercisesList = ({
  workoutTemplateExercises,
  onRemoveExerciseClick,
  onEditClick,
  exercises,
  isPending,
}: WorkoutTemplateExercisesListProps) => {
  const sortedExercises = [...workoutTemplateExercises].sort((a, b) => a.order - b.order);
  return (
    <ul>
      {sortedExercises.map((exercise) => (
        <WorkoutTemplateExerciseItem
          key={exercise.order}
          exercise={exercise}
          exerciseDescription={exercises.find((e) => e.id === exercise.exercise)}
          onRemove={onRemoveExerciseClick}
          onEdit={onEditClick}
          isPending={isPending}
        />
      ))}
    </ul>
  );
};
