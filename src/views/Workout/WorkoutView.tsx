import { WorkoutExerciseManager } from "./utils/WorkoutExerciseManager";
import { WorkoutTimer } from "./utils/WorkoutTimer";

export const WorkoutView = () => {
  return (
    <>
      <WorkoutTimer />
      <p> finish workout button</p>
      <WorkoutExerciseManager />
    </>
  );
};
