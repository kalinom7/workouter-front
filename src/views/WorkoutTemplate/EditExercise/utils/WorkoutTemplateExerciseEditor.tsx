import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";
import { useEditWorkoutTemplateExercise } from "@/api/workouttemplate/useEditWorkoutTemplateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const {data: exercises, isLoading: isExercisesLoading, isError: isExercisesError} = useGetAllExercises(someUuid);
  const exerciseId = searchParams.get("exerciseId") ?? "";
  const navigate = useNavigate();
  const onSelectExerciseClick = () => {
    navigate(
      `/workout-template/${templateId}/exercise/${order}/select?mode=edit`,
    );
  };
  
  const { mutate, isPending } = useEditWorkoutTemplateExercise();

  if (isExercisesLoading) return <>Loading...</>;
  if (isExercisesError || !exercises) return <>Error loading exercise</>;

  const exercise = exercises.find( (ex) => ex.id === exerciseId );
   
    

  const onSuccess = () => {
    toast.success("Exercise successfully edited!");
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
        {exercise?.name}
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
