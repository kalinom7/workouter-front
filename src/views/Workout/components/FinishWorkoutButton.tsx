import { useFinishWorkout } from "@/api/workout/hooks/useFinishWorkout";
import { Button } from "@/components/ui/button";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext, useState } from "react";
import { areAllExercisesDone } from "../helper/areAllExercisesDone";
import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const FinishWorkoutButton = ({
  setIsWorkoutFinished,
}: {
  setIsWorkoutFinished: () => void;
}) => {
  const { mutate } = useFinishWorkout();
  const { id } = useContext(WorkoutContext);
  const { data: workout, isLoading, isError } = useGetWorkout(globalUserId, id);

  const [open, setOpen] = useState(false);

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !workout) return <>Loading...</>;

  const handleOpenDialog = () => {
    if (!areAllExercisesDone(workout)) {
      toast.error("Every set and exercise must be completed");
      return;
    }
    setOpen(true);
  };

  const handleFinishWorkout = () => {
    mutate(
      { userId: globalUserId, workoutId: id },
      {
        onSuccess: () => {
          setIsWorkoutFinished();
          setOpen(false);
        },
      },
    );
  };

  return (
    <>
      <Button onClick={handleOpenDialog}>Finish Workout</Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to finish workout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishWorkout}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
