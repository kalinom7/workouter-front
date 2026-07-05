import { useRemovePatternItem } from "@/api/workoutschedule/hooks/useRemovePatternItem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext } from "react";

export const RemovePatternItemDialog = ({
  patternItemId,
}: {
  patternItemId: string;
}) => {
  const { id: workoutScheduleId } = useContext(WorkoutScheduleContext);
  const { mutate: removePatternItem } = useRemovePatternItem();

  const onRemoveClick = () => {
    return removePatternItem({
      userId: globalUserId,
      workoutScheduleId,
      patternItemId,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remove</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to remove this pattern item?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={onRemoveClick} variant="destructive">
              Remove
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
