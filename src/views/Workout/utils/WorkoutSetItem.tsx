import { useMarkSetAsUnCompleted } from "@/api/workout/hooks/useMarkSetAsUnCompleted";
import { useSaveSet } from "@/api/workout/hooks/useSaveSet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { toast } from "sonner";

//TODO: manage refreshing page causing states to rerender and values dissapearing - replace state
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
  const [isSetCompleted, setIsSetCompleted] = useState(false);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const queryClient = useQueryClient();

  const onSaveSetError = () => {
    setIsSetCompleted(false);
    toast.error("there was an error, please try again");
  };

  const onSaveSetSuccess = () => {
    toast.success("set saved successfully");
    queryClient.invalidateQueries({ queryKey: ["workout", globalUserId, id] });
  };

  const onSaveSetClick = (weight: number, reps: number) => {
    saveSet(
      {
        userId: globalUserId,
        workoutId: id,
        exerciseOrder,
        setOrder,
        weight,
        reps,
      },
      { onSuccess: onSaveSetSuccess, onError: onSaveSetError },
    );
    setIsSetCompleted(true);
  };

  const onUnSaveSetClick = () => {
    unSaveSet({ userId: globalUserId, workoutId: id, exerciseOrder, setOrder });
    setIsSetCompleted(false);
  };

  return (
    <>
      <Input
        disabled={isSetCompleted}
        placeholder="Weight"
        value={weight}
        type="number"
        onChange={(e) => setWeight(Number(e.target.value))}
      />
      <Input
        disabled={isSetCompleted}
        placeholder="Reps"
        value={reps}
        type="number"
        onChange={(e) => setReps(Number(e.target.value))}
      />
      {isSetCompleted ? (
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
