import { useCreateWorkoutSchedule } from "@/api/workoutschedule/hooks/useCreateWorkoutSchedule";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { globalUserId } from "@/utils/globalUserId";
import { useState } from "react";

export const CreateNewScheduleDialog = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [scheduleName, setScheduleName] = useState("");
  const { mutate, isPending } = useCreateWorkoutSchedule();

  const onCancelClick = () => {
    setScheduleName("");
    onOpenChange(false);
  };

  const onCreateClick = () => {
    mutate({ userId: globalUserId, name: scheduleName });
    setScheduleName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Create new workout schedule</DialogTitle>
        <DialogDescription>Name your schedule</DialogDescription>
        <Input
          value={scheduleName}
          onChange={(e) => setScheduleName(e.target.value)}
        />
        <DialogFooter>
          <Button
            disabled={isPending}
            variant="outline"
            onClick={onCancelClick}
          >
            Cancel
          </Button>
          <Button
            disabled={scheduleName.trim() === "" || isPending}
            onClick={onCreateClick}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
