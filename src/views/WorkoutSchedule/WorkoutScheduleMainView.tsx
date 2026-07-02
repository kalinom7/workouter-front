import { Footer } from "../Home/components/Footer";
import { ManageExistingSchedulesButton } from "./components/ManageExistingSchedulesButton";
import { SelectActiveScheduleDialog } from "./components/SelectActiveScheduleDialog";
import { CreateNewScheduleDialog } from "./components/CreateNewScheduleDialog";
import { useGetAllWorkoutSchedules } from "@/api/workoutschedule/hooks/useGetAllWorkoutSchedules";
import { globalUserId } from "@/utils/globalUserId";
import { Spinner } from "@/components/ui/spinner";
import { GoBackArrow } from "@/views/sharedComponents/GoBackArrow";

export const WorkoutScheduleMainView = () => {
  const { data, isPending, isError } = useGetAllWorkoutSchedules(globalUserId);
  if (data === undefined || isPending || isError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <CreateNewScheduleDialog />
        {(data === undefined || isPending) && !isError && (
          <>
            <Spinner />
            <p>Loading active schedule...</p>
            <ManageExistingSchedulesButton />
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
      <GoBackArrow />
      <CreateNewScheduleDialog />
      <SelectActiveScheduleDialog workoutSchedules={data} />
      <ManageExistingSchedulesButton />
      <Footer />
    </div>
  );
};
