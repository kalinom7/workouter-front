import { useContext, useState } from "react";
import { FinishWorkoutButton } from "./components/FinishWorkoutButton";
import { WorkoutExerciseManager } from "./components/WorkoutExerciseManager";
import { WorkoutTimer } from "./components/WorkoutTimer";
import { WorkoutSummary } from "./components/WorkoutSummary";
import { RestTimerContext } from "@/contexts/workout/RestTimerContext";
import { RestTimer } from "./components/RestTimer";
import { useNavigate } from "react-router-dom";

export const WorkoutView = () => {
  const [openSummary, setOpenSummary] = useState(false);
  const { restTimer } = useContext(RestTimerContext);
  const navigate = useNavigate();

  const closeSummary = () => {
    setOpenSummary(false);
    navigate("/home");
  };
  return (
    <>
      <WorkoutTimer />
      <FinishWorkoutButton setIsWorkoutFinished={() => setOpenSummary(true)} />
      <WorkoutExerciseManager />
      <WorkoutSummary isOpen={openSummary} closeSummary={closeSummary} />
      {restTimer.isActive && <RestTimer />}
    </>
  );
};
