import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { useSetRestPeriod } from "@/api/workout/hooks/useSetRestPeriod";
import { Button } from "@/components/ui/button";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext, useState } from "react";
import { RestTimePicker } from "./RestTimePicker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RestPeriodSetter = ({
  exerciseOrder,
}: {
  exerciseOrder: number;
}) => {
  const { id } = useContext(WorkoutContext);
  const { mutate, isPending } = useSetRestPeriod();
  const { data, isLoading, isError } = useGetWorkout(globalUserId, id);
  const exercise = data?.exercises.find((ex) => ex.order === exerciseOrder);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  if (isError) {
    return <>Error loading workout.</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  const onSetRestPeriodClick = (restPeriod: number) => {
    mutate({ userId: globalUserId, workoutId: id, exerciseOrder, restPeriod });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isPending} variant="outline">
          {exercise?.restPeriod ? formatTime(exercise?.restPeriod) : 0}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Set rest period</DialogHeader>
        <RestTimePicker
          initialMinutes={
            exercise?.restPeriod ? Math.floor(exercise.restPeriod / 60) : 0
          }
          initialSeconds={exercise?.restPeriod ? exercise.restPeriod % 60 : 0}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => onSetRestPeriodClick(minutes * 60 + seconds)}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
