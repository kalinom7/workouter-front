import type { Exercise } from "@/types/ExerciseTypes";

export const ExercisesList = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <ul>
      {exercises.map((exercise) => (
        <li key={exercise.id}>
          name: {exercise.name}, id: {exercise.id}
        </li>
      ))}
    </ul>
  );
};
