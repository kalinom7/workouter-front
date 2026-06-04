import { useAddRestToPatternWorkout } from "@/api/workoutschedule/hooks/useAddRestToPatternWorkout";
import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
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

export const RestDaysDialog = ({
  patternItemId,
}: {
  patternItemId: string;
}) => {
  const { id } = useContext(WorkoutScheduleContext);
  const patternItem = useGetWorkoutSchedule(
    globalUserId,
    id,
  )?.data?.pattern.find((item) => item.patternItemId === patternItemId);
  const [restDays, setRestDays] = useState(patternItem?.restDays || 0);
  const { mutate, isPending } = useAddRestToPatternWorkout();
  if (!patternItem) return null;

  const onSaveRestDaysClick = () => {
    return mutate({
      userId: globalUserId,
      workoutScheduleId: id,
      restDays,
      patternItemId,
    });
  };

  return (
    <Dialog onOpenChange={() => setRestDays(patternItem.restDays)}>
      <DialogTrigger asChild>
        <Button>
          {patternItem.restDays === 0 ? "Add rest days" : "Edit rest days"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Input number of the rest days</DialogTitle>
        <Input
          disabled={isPending}
          type="number"
          min="0"
          defaultValue={restDays}
          onChange={(e) => setRestDays(Number(e.target.value))}
        ></Input>
        <DialogFooter>
          <DialogClose asChild>
            <Button disabled={isPending} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isPending} onClick={onSaveRestDaysClick}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
