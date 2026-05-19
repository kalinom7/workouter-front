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
import { SchedulesCarousel } from "./SchedulesCarousel";

export const SelectActiveScheduleDialog = ({
  workoutSchedules,
}: {
  workoutSchedules: WorkoutSchedule[];
}) => {
  const activeSchedule = workoutSchedules.find((schedule) => schedule.isActive);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {activeSchedule ? activeSchedule.name : "Select Active Schedule"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center">
          {activeSchedule
            ? `Current Active Schedule: ${activeSchedule.name}`
            : "Select schedule to set as active"}
        </DialogTitle>
        <SchedulesCarousel workoutSchedules={workoutSchedules} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Set as Active</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
