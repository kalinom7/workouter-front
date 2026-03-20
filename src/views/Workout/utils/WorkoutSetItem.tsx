import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { useMarkSetAsUnCompleted } from "@/api/workout/hooks/useMarkSetAsUnCompleted";
import { useSaveSet } from "@/api/workout/hooks/useSaveSet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
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
  const { id } = useContext(WorkoutContext);

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
  };

  const onUnSaveSetClick = () => {
    unSaveSet({ userId: globalUserId, workoutId: id, exerciseOrder, setOrder });
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
    </>
  );
};
