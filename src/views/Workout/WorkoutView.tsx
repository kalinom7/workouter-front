import { useContext, useState } from "react";
import { FinishWorkoutButton } from "./components/FinishWorkoutButton";
import { WorkoutExerciseManager } from "./components/WorkoutExerciseManager";
import { WorkoutTimer } from "./components/WorkoutTimer";
import { WorkoutSummary } from "./components/WorkoutSummary";
import { RestTimerContext } from "@/contexts/workout/RestTimerContext";
import { RestTimer } from "./components/RestTimer";

export const WorkoutView = () => {
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const { restTimer } = useContext(RestTimerContext);

  return (
    <>
      <WorkoutTimer />
      <FinishWorkoutButton
        setIsWorkoutFinished={() => setIsWorkoutFinished(true)}
      />
      <WorkoutExerciseManager />
      {isWorkoutFinished && <WorkoutSummary />}
      {restTimer.isActive && <RestTimer />}
    </>
  );
};
