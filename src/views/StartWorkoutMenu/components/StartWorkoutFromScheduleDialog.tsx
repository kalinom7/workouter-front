import { useGetScheduledActivity } from "@/api/workoutschedule/hooks/useGetScheduledActivity";
import { useGetWorkoutTemplate } from "@/api/workouttemplate/hooks/useGetWorkoutTemplate";
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
import { globalUserId } from "@/utils/globalUserId";

export const StartWorkoutFromScheduleDialog = () => {
  const scheduledActivity = useGetScheduledActivity(globalUserId);
  const scheduledActivityData = scheduledActivity.data;
  const scheduledWorkoutTemplate = useGetWorkoutTemplate(
    scheduledActivityData?.status === "active" &&
      scheduledActivityData.activityId
      ? scheduledActivityData.activityId
      : "",
    globalUserId,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start scheduled workout</Button>
      </DialogTrigger>
      {scheduledActivityData?.status === "active" &&
        scheduledActivityData.activityId != null && (
          <DialogContent>
            <DialogTitle>
              Scheduled workout: {scheduledWorkoutTemplate.data?.name}
            </DialogTitle>
          </DialogContent>
        )}
      {scheduledActivityData?.status === "active" &&
        scheduledActivityData.activityId == null && (
          <DialogContent>
            <DialogTitle>Take some rest!</DialogTitle>
            <DialogDescription>
              Your today's scheduled activity is rest day.
            </DialogDescription>
            <DialogFooter className="flex flex-row justify-center">
              <DialogClose asChild>
                <Button className="w-auto">Okay</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      {scheduledActivityData?.status === "no-schedule" && (
        <DialogContent>
          <DialogTitle>You dont have an active workout schedule</DialogTitle>
          <DialogDescription>
            Go create and set workout schedule as active.
          </DialogDescription>
          <DialogFooter className="flex flex-row justify-center">
            <DialogClose asChild>
              <Button className="w-auto">Okay</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
      {scheduledActivityData?.status === "skipped" && (
        <DialogContent>
          <DialogTitle>You skipped your scheduled workout</DialogTitle>
          <DialogDescription>
            Select one of workouts in your schedule to continue
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
};
