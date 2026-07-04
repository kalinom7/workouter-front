import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { WorkoutScheduleCard } from "./WorkoutScheduleCard";

export const SchedulesList = ({
  workoutSchedules,
  search,
  selectedId,
  onSelect,
}: {
  workoutSchedules: WorkoutSchedule[];
  search?: string;
  selectedId?: string;
  onSelect: (schedule: WorkoutSchedule) => void;
}) => {
  /**
   * sort the schedules so that the active schedule is always at the top of the list. This way, the user can easily see which schedule is currently active and select it if they want to make changes or view its details.
   */
  const orderedSchedules = [...workoutSchedules].sort(
    (a, b) => Number(b.isActive) - Number(a.isActive),
  );
  const searchedSchedules = search
    ? orderedSchedules.filter((schedule) =>
        schedule.name.toLowerCase().includes(search.toLowerCase()),
      )
    : orderedSchedules;

  return (
    <ul className="flex max-h-[65dvh] flex-col gap-3 overflow-y-auto py-2">
      {searchedSchedules.map((schedule) => {
        const isSelected = schedule.id === selectedId;
        return (
          <li key={schedule.id}>
            <WorkoutScheduleCard
              schedule={schedule}
              onSelect={onSelect}
              isSelected={isSelected}
            />
          </li>
        );
      })}
    </ul>
  );
};
