import { useGetScheduledActivity } from "@/api/workoutschedule/hooks/useGetScheduledActivity";
import { useGetWorkoutTemplate } from "@/api/workouttemplate/hooks/useGetWorkoutTemplate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { globalUserId } from "@/utils/globalUserId";

export const StartWorkoutFromScheduleDialog = () => {
  const scheduledActivity = useGetScheduledActivity(globalUserId);
  const scheduledWorkoutTemplate = useGetWorkoutTemplate(
    scheduledActivity.data ?? "",
    globalUserId,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start scheduled workout</Button>
      </DialogTrigger>
      {scheduledActivity != null && (
        <DialogContent>
          <DialogTitle>
            Scheduled workout: {scheduledWorkoutTemplate.data?.name}
          </DialogTitle>
        </DialogContent>
      )}
    </Dialog>
  );
};
