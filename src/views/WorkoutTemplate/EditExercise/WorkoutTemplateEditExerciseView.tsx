import { useEditWorkoutTemplateExercise } from "@/api/workouttemplate/useEditWorkoutTemplateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateEditExerciseView = () => {
  const { mutate, isPending } = useEditWorkoutTemplateExercise();
  const { id } = useContext(WorkoutTemplateContext);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();

  const exerciseId = searchParams.get("exerciseId") ?? "";
  const order = Number(params.order);
  const oldSets = Number(searchParams.get("sets"));
  const oldRestPeriod = Number(searchParams.get("restPeriod"));

  const [newSets, setNewSets] = useState(oldSets);
  const [newRestPeriod, setNewRestPeriod] = useState(oldRestPeriod);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success("Exercise successfully edited!");
    queryClient.invalidateQueries({
      queryKey: ["workout-templates", id, someUuid],
    });
    navigate(`/workout-template/${id}/exercises`);
  };

  const onError = () => {
    toast.error("Failed to edit the exercise in workout template.");
  };
  const onEditExerciseClick = () => {
    mutate(
      {
        userId: someUuid,
        exerciseId,
        workoutTemplateId: id,
        order,
        newSets,
        newRestPeriod,
      },
      { onSuccess, onError },
    );
  };
  const onSelectExerciseClick = () => {
    navigate(`/workout-template/${id}/exercise/${order}/select`);
  };

  return (
    <>
      <h1>Edit Exercise</h1>
      <Button onClick={onSelectExerciseClick}>{exerciseId}</Button>

      <Input
        type="number"
        value={newSets}
        onChange={(e) => setNewSets(Number(e.target.value))}
      />
      <Input
        type="number"
        value={newRestPeriod}
        onChange={(e) => setNewRestPeriod(Number(e.target.value))}
      />
      <Button disabled={isPending} onClick={onEditExerciseClick}>
        Edit Exercise
      </Button>
    </>
  );
};
