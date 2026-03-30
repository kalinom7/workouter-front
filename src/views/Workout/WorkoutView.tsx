import { useState } from "react";
import { FinishWorkoutButton } from "./components/FinishWorkoutButton";
import { WorkoutExerciseManager } from "./components/WorkoutExerciseManager";
import { WorkoutTimer } from "./components/WorkoutTimer";
import { WorkoutSummary } from "./components/WorkoutSummary";

export const WorkoutView = () => {
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);

  return (
    <>
      <WorkoutTimer />
      <FinishWorkoutButton
        setIsWorkoutFinished={() => setIsWorkoutFinished(true)}
      />
      <WorkoutExerciseManager />
      {isWorkoutFinished && <WorkoutSummary />}
    </>
  );
};
