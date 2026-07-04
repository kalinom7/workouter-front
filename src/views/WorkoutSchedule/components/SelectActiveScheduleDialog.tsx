import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { SchedulesList } from "./SchedulesList";
import { useState } from "react";
import { globalUserId } from "@/utils/globalUserId";
import { useSetWorkoutScheduleActive } from "@/api/workoutschedule/hooks/useSetWorkoutScheduleActive";
import { useSetWorkoutScheduleInactive } from "@/api/workoutschedule/hooks/useSetWorkoutScheduleInactive";
import { SearchBar } from "@/views/sharedComponents/SearchBar";

export const SelectActiveScheduleDialog = ({
  workoutSchedules,
}: {
  workoutSchedules: WorkoutSchedule[];
}) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<WorkoutSchedule | null>(null);
  const [search, setSearch] = useState<string>("");

  const { mutate: setActive, isPending: isActivePending } =
    useSetWorkoutScheduleActive();
  const { mutate: setInactive, isPending: isInactivePending } =
    useSetWorkoutScheduleInactive();

  const activeSchedule = workoutSchedules.find((schedule) => schedule.isActive);

  const onCloseClick = () => {
    setSelectedSchedule(null);
  };

  const onConfirmClick = () => {
    if (selectedSchedule) {
      setActive({
        userId: globalUserId,
        workoutScheduleId: selectedSchedule.id,
      });
    }
  };

  const onSetInactiveClick = () => {
    if (activeSchedule) {
      setInactive({
        userId: globalUserId,
        workoutScheduleId: activeSchedule.id,
      });
    }
  };

  return (
    <Dialog onOpenChange={onCloseClick}>
      <DialogTrigger asChild>
        <Button>
          {activeSchedule
            ? "active schedule: " + activeSchedule.name
            : "Select Active Schedule"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw]  h-[150vw] flex flex-col">
        <DialogTitle className="text-center">
          {activeSchedule
            ? `Current Active Schedule: ${activeSchedule.name}`
            : "Select schedule to set as active"}
        </DialogTitle>
        <SearchBar
          searched="workout schedule"
          search={search}
          setSearch={setSearch}
        />
        <SchedulesList
          workoutSchedules={workoutSchedules}
          selectedId={selectedSchedule?.id}
          onSelect={setSelectedSchedule}
          search={search}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isActivePending || isInactivePending}
              onClick={onCloseClick}
              variant="outline"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onSetInactiveClick}
              disabled={isInactivePending || !activeSchedule}
            >
              Set inactive
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={onConfirmClick}
              disabled={
                isActivePending || !selectedSchedule || isInactivePending
              }
            >
              Set as Active
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
