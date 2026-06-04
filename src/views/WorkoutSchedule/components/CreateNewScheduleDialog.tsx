import { useCreateWorkoutSchedule } from "@/api/workoutschedule/hooks/useCreateWorkoutSchedule";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { globalUserId } from "@/utils/globalUserId";
import { useState } from "react";

export const CreateNewScheduleDialog = () => {
  const [scheduleName, setScheduleName] = useState("");
  const { mutate, isPending } = useCreateWorkoutSchedule();

  const onCreateClick = () => {
    mutate({ userId: globalUserId, name: scheduleName });
    setScheduleName("");
  };
  const onCancelClick = () => {
    setScheduleName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogTitle>Create new workout schedule</DialogTitle>
        <DialogDescription>Name your schedule</DialogDescription>
        <Input
          value={scheduleName}
          onChange={(e) => setScheduleName(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={isPending}
              variant="outline"
              onClick={onCancelClick}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={scheduleName.trim() === "" || isPending}
              onClick={onCreateClick}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
