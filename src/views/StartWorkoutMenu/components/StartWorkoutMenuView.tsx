import { StartEmptyWorkoutButton } from "./StartEmptyWorkoutButton";
import { StartWorkoutFromScheduleDialog } from "./StartWorkoutFromScheduleDialog";
import { StartWorkoutFromTemplateButton } from "./StartWorkoutFromTemplateButton";

export const StartWorkoutMenu = () => {
  return (
    <>
      <h1>Start Workout</h1>
      <StartEmptyWorkoutButton />
      <StartWorkoutFromTemplateButton />
      <StartWorkoutFromScheduleDialog />
    </>
  );
};
