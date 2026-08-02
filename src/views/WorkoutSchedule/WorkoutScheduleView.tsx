import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext } from "react";
import { WorkoutPatternList } from "./components/WorkoutPatternList";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RenameWorkoutScheduleDialog } from "./components/RenameWorkoutScheduleDialog";
import { DeleteWorkoutScheduleDialog } from "./components/DeleteWorkoutScheduleDialog";
import { Spinner } from "@/components/ui/spinner";
import { AddWorkoutToPatternDialog } from "./components/AddWorkoutToPatternDialog";

export const WorkoutScheduleView = () => {
  const { id } = useContext(WorkoutScheduleContext);
  const navigate = useNavigate();

  const {
    data: workoutSchedule,
    isLoading: isWorkoutScheduleLoading,
    isError: isWorkoutScheduleError,
  } = useGetWorkoutSchedule(globalUserId, id);
  if (isWorkoutScheduleError) {
    return <>Error loading workout schedule.</>;
  }

  if (isWorkoutScheduleLoading || !workoutSchedule) {
    return (
      <div>
        Loading...
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-center gap-2">
        <h1 className="text-2xl font-bold">{workoutSchedule.name}</h1>
        <RenameWorkoutScheduleDialog currentName={workoutSchedule.name} />
      </div>
      <WorkoutPatternList workoutSchedule={workoutSchedule} />
      <div>
        <AddWorkoutToPatternDialog />
        <Button onClick={() => navigate(-1)}>Save</Button>
        <DeleteWorkoutScheduleDialog workoutSchedule={workoutSchedule} />
      </div>
    </div>
  );
};
