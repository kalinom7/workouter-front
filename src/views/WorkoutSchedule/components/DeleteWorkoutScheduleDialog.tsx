import { useDeleteWorkoutSchedule } from "@/api/workoutschedule/hooks/useDeleteWorkoutSchedule";
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
import { globalUserId } from "@/utils/globalUserId";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const DeleteWorkoutScheduleDialog = ({
  workoutSchedule,
}: {
  workoutSchedule: WorkoutSchedule;
}) => {
  const { mutate, isPending } = useDeleteWorkoutSchedule();
  const navigate = useNavigate();
  const onDeleteSuccess = () => {
    toast.success("workout schedule deleted successfuly");
    navigate(`/workout-schedules/manage?userId=${globalUserId}`);
  };
  const onDeleteClick = () => {
    mutate(
      { userId: globalUserId, workoutScheduleId: workoutSchedule.id },
      {
        onSuccess: onDeleteSuccess,
      },
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete schedule: {workoutSchedule.name} ?</DialogTitle>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={onDeleteClick}
              disabled={isPending}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
