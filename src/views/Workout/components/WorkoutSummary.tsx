import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext, useMemo } from "react";
import { calculateWorkoutSummaryData } from "../helper/WorkoutSummaryData";

export const WorkoutSummary = ({
  isOpen,
  closeSummary,
}: {
  isOpen: boolean;
  closeSummary: () => void;
}) => {
  const { id } = useContext(WorkoutContext);
  const { data, isLoading, isError } = useGetWorkout(globalUserId, id);

  const onContinueClick = () => {
    closeSummary();
  };

  const workoutSummaryData = useMemo(() => {
    if (!data) return null;
    return calculateWorkoutSummaryData(data);
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={closeSummary}>
      {isLoading || isError ? (
        <DialogContent
          className="bg-white rounded-lg p-6 w-64"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="text-xl font-bold text-center mb-4">
            {isLoading ? "Loading..." : "Something went wrong"}
          </DialogTitle>

          <DialogFooter>
            <Button onClick={closeSummary} className="w-full">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent
          className="bg-white rounded-lg p-6 w-64"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Workout Summary
          </DialogTitle>

          <DialogHeader>
            <div className="text-2xl font-bold text-center">
              Great job! You have finished your workout.
            </div>
          </DialogHeader>
          <div className="text-center mt-4">
            <p className="text-lg">
              Workout time: {workoutSummaryData?.workoutTime}
            </p>
            <p className="text-lg">
              Exercises done: {workoutSummaryData?.exercisesDone}
            </p>
            <p className="text-lg">
              Total weight lifted: {workoutSummaryData?.totalWeightLifted} kg
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={onContinueClick}
              className="w-full"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};
