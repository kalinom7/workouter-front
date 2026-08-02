import { useGetAllWorkoutSchedules } from "@/api/workoutschedule/hooks/useGetAllWorkoutSchedules";
import { SchedulesList } from "./components/SchedulesList";
import { Spinner } from "@/components/ui/spinner";
import { globalUserId } from "@/utils/globalUserId";
import { CreateNewScheduleDialog } from "./components/CreateNewScheduleDialog";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchBar } from "@/views/sharedComponents/SearchBar";

export const ManageExistingSchedulesView = () => {
  const { data, isPending, isError } = useGetAllWorkoutSchedules(globalUserId);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  if (data === undefined || isPending) {
    return (
      <div>
        <h1>Loading workout schedules</h1>
        <Spinner />
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>Error loading workout schedules</h1>
      </div>
    );
  }

  const onSelectSchedule = (selectedSchedule: WorkoutSchedule) => {
    navigate(
      `/workout-schedules/${selectedSchedule.id}?userId=${globalUserId}`,
    );
  };

  return (
    <div className="flex flex-col gap-4 max-h-[80dvh]">
      <h1 className="text-2xl font-bold">
        Manage All Existing Workout Schedules
      </h1>

      <SearchBar
        searched="workout schedule"
        search={search}
        setSearch={setSearch}
      />

      <div className="flex-1 min-h-0 overflow-y-auto">
        <SchedulesList
          workoutSchedules={data}
          onSelect={onSelectSchedule}
          search={search}
        />
      </div>

      <CreateNewScheduleDialog />
    </div>
  );
};
