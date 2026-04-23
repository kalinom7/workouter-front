import { useContext, useState } from "react";
import { FinishWorkoutButton } from "./components/FinishWorkoutButton";
import { WorkoutExerciseManager } from "./components/WorkoutExerciseManager";
import { WorkoutTimer } from "./components/WorkoutTimer";
import { WorkoutSummary } from "./components/WorkoutSummary";
import { RestTimerContext } from "@/contexts/workout/RestTimerContext";
import { RestTimer } from "./components/RestTimer";

export const WorkoutView = () => {
  const [openSummary, setOpenSummary] = useState(false);
  const { restTimer } = useContext(RestTimerContext);

  return (
    <>
      <WorkoutTimer />
      <FinishWorkoutButton setIsWorkoutFinished={() => setOpenSummary(true)} />
      <WorkoutExerciseManager />
      <WorkoutSummary
        isOpen={openSummary}
        closeSummary={() => setOpenSummary(false)}
      />
      {restTimer.isActive && <RestTimer />}
    </>
  );
};
