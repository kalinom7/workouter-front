import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext } from "react";
import { WorkoutPatternList } from "./components/WorkoutPatternList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RenameWorkoutScheduleDialog } from "./components/RenameWorkoutScheduleDialog";
import { DeleteWorkoutScheduleDialog } from "./components/DeleteWorkoutScheduleDialog";

export const WorkoutScheduleView = () => {
  const { id } = useContext(WorkoutScheduleContext);
  const navigate = useNavigate();

  const {
    data: workoutTemplates,
    isLoading: isWorkoutTemplatesLoading,
    isError: isWorkoutTemplatesError,
  } = useGetAllWorkoutTemplates(globalUserId);

  const {
    data: workoutSchedule,
    isLoading: isWorkoutScheduleLoading,
    isError: isWorkoutScheduleError,
  } = useGetWorkoutSchedule(globalUserId, id);
  if (isWorkoutScheduleError) {
    return <>Error loading workout schedule.</>;
  }

  if (isWorkoutScheduleLoading || !workoutSchedule) {
    return <>Loading...</>;
  }
  const isWorkoutTemplatesLoaded =
    !isWorkoutTemplatesLoading && !isWorkoutTemplatesError && workoutTemplates;

  return (
    <div>
      <h1>{workoutSchedule.name}</h1>
      <RenameWorkoutScheduleDialog currentName={workoutSchedule.name} />
      {isWorkoutTemplatesLoaded ? (
        <WorkoutPatternList templates={workoutTemplates} />
      ) : (
        "Loading schedule pattern..."
      )}
      <Button
        onClick={() =>
          navigate("/workout-schedules/main?userId=" + globalUserId)
        }
      >
        Save
      </Button>
      <DeleteWorkoutScheduleDialog workoutSchedule={workoutSchedule} />
    </div>
  );
};
