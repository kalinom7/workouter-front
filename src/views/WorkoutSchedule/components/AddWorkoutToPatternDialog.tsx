import { useAddWorkoutToPattern } from "@/api/workoutschedule/hooks/useAddWorkoutToPattern";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutTemplateSelector } from "@/views/StartWorkoutFromTemplate/components/WorkoutTemplateSelector";
import { useContext, useState } from "react";

export const AddWorkoutToPatternDialog = () => {
  const [workoutTemplateId, setWorkoutTemplateId] = useState<string | null>(
    null,
  );
  const { id } = useContext(WorkoutScheduleContext);
  const { mutate, isPending } = useAddWorkoutToPattern();

  const onAddClick = () => {
    if (!workoutTemplateId) return;
    return mutate({
      userId: globalUserId,
      workoutTemplateId: workoutTemplateId,
      workoutScheduleId: id,
    });
  };

  return (
    <Dialog onOpenChange={() => setWorkoutTemplateId(null)}>
      <DialogTrigger asChild>
        <Button> Add Workout</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Select workout template</DialogTitle>
        <WorkoutTemplateSelector
          setPreviewedTemplateId={setWorkoutTemplateId}
          disabled={isPending}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={!workoutTemplateId || isPending}
              onClick={onAddClick}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
