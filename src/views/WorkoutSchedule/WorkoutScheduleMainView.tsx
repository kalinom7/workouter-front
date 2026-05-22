import { Footer } from "../Home/components/Footer";
import { ManageExistingSchedules } from "./components/ManageExistingSchedules";
import { SchedulesCarousel } from "./components/SchedulesCarousel";
import { SelectActiveScheduleDialog } from "./components/SelectActiveScheduleDialog";
import { CreateNewScheduleDialog } from "./components/CreateNewScheduleDialog";
import { useGetAllWorkoutSchedules } from "@/api/workoutschedule/hooks/useGetAllWorkoutSchedules";
import { globalUserId } from "@/utils/globalUserId";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const WorkoutScheduleMainView = () => {
  const { data, isPending, isError } = useGetAllWorkoutSchedules(globalUserId);
  const navigate = useNavigate();
  if (data === undefined || isPending || isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CreateNewScheduleDialog />
        {(data === undefined || isPending) && !isError && (
          <>
            <Spinner />
            <p>Loading active schedule...</p>
            <ManageExistingSchedules />
            <Spinner />
            <p>Loading workout schedules...</p>
          </>
        )}
        {isError && <p>Error loading workout schedules.</p>}

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <CreateNewScheduleDialog />
      <SelectActiveScheduleDialog workoutSchedules={data} />
      <ManageExistingSchedules />
      <SchedulesCarousel
        workoutSchedules={data}
        onSelect={(schedule: WorkoutSchedule) =>
          navigate(`/workout-schedule/${schedule.id}`)
        }
      />
      <Footer />
    </div>
  );
};
