import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext } from "react";
import { WorkoutPatternList } from "./components/WorkoutPatternList";

export const WorkoutScheduleView = () => {
  const { id } = useContext(WorkoutScheduleContext);
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
      {isWorkoutTemplatesLoaded ? (
        <WorkoutPatternList templates={workoutTemplates} />
      ) : (
        "Loading schedule pattern..."
      )}
    </div>
  );
};
