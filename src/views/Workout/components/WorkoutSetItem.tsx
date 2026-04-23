import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { useMarkSetAsUnCompleted } from "@/api/workout/hooks/useMarkSetAsUnCompleted";
import { useRemoveSetFromWorkoutExercise } from "@/api/workout/hooks/useRemoveSetFromWorkoutExercise";
import { useSaveSet } from "@/api/workout/hooks/useSaveSet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RestTimerContext } from "@/contexts/workout/RestTimerContext";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";

import { useContext, useState } from "react";

export const WorkoutSetItem = ({
  exerciseOrder,
  setOrder,
}: {
  exerciseOrder: number;
  setOrder: number;
}) => {
  const { mutate: saveSet, isPending: isSaveSetPending } = useSaveSet();
  const { mutate: unSaveSet, isPending: isUnSaveSetPending } =
    useMarkSetAsUnCompleted();
  const { mutate: removeSet, isPending: isRemovingSet } =
    useRemoveSetFromWorkoutExercise();
  const { id } = useContext(WorkoutContext);
  const { startRestTimer } = useContext(RestTimerContext);

  const { data, isLoading, isError } = useGetWorkout(globalUserId, id);
  const exercise = data?.exercises?.find((e) => e.order === exerciseOrder);
  const set = exercise?.sets?.find((s) => s.order === setOrder);
  const [weight, setWeight] = useState(set?.weight ?? 0);
  const [reps, setReps] = useState(set?.reps ?? 0);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading workout</p>;

  if (!set) return <p>Set not found</p>;

  const onSaveSetClick = (weight: number, reps: number) => {
    saveSet({
      userId: globalUserId,
      workoutId: id,
      exerciseOrder,
      setOrder,
      weight,
      reps,
    });
    if (exercise?.restPeriod && exercise.restPeriod > 0) {
      startRestTimer(exercise.restPeriod);
    }
  };

  const onUnSaveSetClick = () => {
    unSaveSet({ userId: globalUserId, workoutId: id, exerciseOrder, setOrder });
  };

  const onRemoveSetClick = () => {
    removeSet({ userId: globalUserId, workoutId: id, exerciseOrder, setOrder });
  };

  return (
    <>
      <Input
        disabled={set.isCompleted}
        placeholder="Weight"
        value={weight}
        type="number"
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <Input
        disabled={set.isCompleted}
        placeholder="Reps"
        value={reps}
        type="number"
        onChange={(e) => setReps(Number(e.target.value))}
      />
      {set.isCompleted ? (
        <Button disabled={isUnSaveSetPending} onClick={onUnSaveSetClick}>
          {" "}
          UnSave{" "}
        </Button>
      ) : (
        <Button
          disabled={isSaveSetPending}
          onClick={() => onSaveSetClick(weight, reps)}
        >
          Save set
        </Button>
      )}
      <Button
        onClick={onRemoveSetClick}
        disabled={isRemovingSet || set.isCompleted}
      >
        Remove Set
      </Button>
    </>
  );
};
