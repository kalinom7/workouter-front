import { useRenameWorkoutSchedule } from "@/api/workoutschedule/hooks/useRenameWorkoutSchedule";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext, useState } from "react";

export const RenameWorkoutScheduleDialog = ({
  currentName,
}: {
  currentName: string;
}) => {
  const { id } = useContext(WorkoutScheduleContext);
  const [name, setName] = useState(currentName);
  const { mutate, isPending } = useRenameWorkoutSchedule();

  const onCancelClick = () => {
    setName(currentName);
  };

  const onSaveClick = () => {
    mutate({ userId: globalUserId, workoutScheduleId: id, newName: name });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Rename</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Rename Workout Schedule</DialogTitle>
        <Input
          defaultValue={currentName}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={onCancelClick}
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onSaveClick} disabled={isPending}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
