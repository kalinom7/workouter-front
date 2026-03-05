import { useEditWorkoutTemplateExercise } from "@/api/workouttemplate/useEditWorkoutTemplateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const someUuid = "123e4567-e89b-12d3-a456-426614174000"; // example of userId

export const WorkoutTemplateExerciseEditor = ({
  oldSets,
  oldRestPeriod,
  templateId,
  order,
}: {
  oldSets: number;
  oldRestPeriod: number;
  templateId: string;
  order: number;
}) => {
  const [newSets, setNewSets] = useState(oldSets);
  const [newRestPeriod, setNewRestPeriod] = useState(oldRestPeriod);
  const [searchParams] = useSearchParams();
  const exerciseId = searchParams.get("exerciseId") ?? "";
  const navigate = useNavigate();
  const onSelectExerciseClick = () => {
    navigate(
      `/workout-template/${templateId}/exercise/${order}/select?mode=edit`,
    );
  };
  const queryClient = useQueryClient();

  const { mutate, isPending } = useEditWorkoutTemplateExercise();
  const onSuccess = () => {
    toast.success("Exercise successfully edited!");
    queryClient.invalidateQueries({
      queryKey: ["workout-templates", templateId, someUuid],
    });
    navigate(`/workout-template/${templateId}/exercises`);
  };

  const onError = () => {
    toast.error("Failed to edit the exercise in workout template.");
  };
  const onEditExerciseClick = () => {
    mutate(
      {
        userId: someUuid,
        exerciseId,
        workoutTemplateId: templateId,
        order,
        newSets,
        newRestPeriod,
      },
      { onSuccess, onError },
    );
  };
  return (
    <>
      <h1>Edit Exercise</h1>
      <Button disabled={isPending} onClick={onSelectExerciseClick}>
        {exerciseId}
      </Button>

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
