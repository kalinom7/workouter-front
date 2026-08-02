import { StartEmptyWorkoutDialog } from "./StartEmptyWorkoutDialog";
import { StartWorkoutFromScheduleDialog } from "./StartWorkoutFromScheduleDialog";
import { StartWorkoutFromTemplateButton } from "./StartWorkoutFromTemplateButton";

export const StartWorkoutMenu = () => {
  return (
    <>
      <h1>Start Workout</h1>
      <StartEmptyWorkoutDialog />
      <StartWorkoutFromTemplateButton />
      <StartWorkoutFromScheduleDialog />
    </>
  );
};
