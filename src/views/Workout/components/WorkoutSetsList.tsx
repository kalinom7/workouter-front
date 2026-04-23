import type { WorkoutExerciseSet } from "@/types/WorkoutTypes";
import { WorkoutSetItem } from "./WorkoutSetItem";

export const WorkoutSetsList = ({
  workoutSets,
  exerciseOrder,
}: {
  workoutSets: WorkoutExerciseSet[];
  exerciseOrder: number;
}) => {
  return (
    <ul>
      {workoutSets.map((set) => (
        <li key={set.order}>
          <WorkoutSetItem exerciseOrder={exerciseOrder} setOrder={set.order} />
        </li>
      ))}
    </ul>
  );
};
