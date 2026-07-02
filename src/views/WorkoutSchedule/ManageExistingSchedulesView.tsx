import { useGetAllWorkoutSchedules } from "@/api/workoutschedule/hooks/useGetAllWorkoutSchedules";
import { SchedulesCarousel } from "./components/SchedulesCarousel";
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
    navigate(`/workout-schedule/${selectedSchedule.id}?userId=${globalUserId}`);
  };

  return (
    <div>
      <h1>Manage All Existing Workout Schedules</h1>
      <SearchBar
        searched="workout schedule"
        search={search}
        setSearch={setSearch}
      />
      <SchedulesCarousel
        workoutSchedules={data}
        onSelect={onSelectSchedule}
        search={search}
      />
      <CreateNewScheduleDialog />
    </div>
  );
};
