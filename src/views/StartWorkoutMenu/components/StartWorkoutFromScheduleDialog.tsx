import { useGetScheduledActivity } from "@/api/workoutschedule/hooks/useGetScheduledActivity";
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
import { Spinner } from "@/components/ui/spinner";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutTemplatePreview } from "@/views/StartWorkoutFromTemplate/components/WorkoutTemplatePreview";

export const StartWorkoutFromScheduleDialog = () => {
  const {
    data: scheduledActivity,
    isLoading,
    isError,
  } = useGetScheduledActivity(globalUserId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start scheduled workout</Button>
      </DialogTrigger>
      {isLoading && <Spinner />}
      {isError && <div>Error loading scheduled activity</div>}

      {scheduledActivity?.status === "active" &&
        scheduledActivity.activity != null && (
          <DialogContent>
            <DialogTitle>
              Scheduled workout: {scheduledActivity.activity.name}
            </DialogTitle>
            <DialogDescription>Start your scheduled workout!</DialogDescription>
            <WorkoutTemplatePreview
              templateId={scheduledActivity.activity.id}
              onStartThisWorkoutClick={() => null}
              disabled={false}
            />
          </DialogContent>
        )}
      {scheduledActivity?.status === "active" &&
        scheduledActivity.activity == null && (
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
      {scheduledActivity?.status === "no-schedule" && (
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
      {scheduledActivity?.status === "skipped" && (
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
