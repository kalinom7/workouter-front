import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { useAddWorkoutTemplateExercise } from "@/api/workouttemplate/useAddWorkoutTemplateExercise";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateAddExerciseView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { mutate, isPending } = useAddWorkoutTemplateExercise();
  const [searchParams] = useSearchParams();
  const exerciseId = searchParams.get("exerciseId") ?? "";
  const {data: exercises, isLoading: isExercisesLoading, isError: isExercisesError } = useGetAllExercises(someUuid);
  
  const navigate = useNavigate();
  const [sets, setSets] = useState(0);
  const [restPeriod, setRestPeriod] = useState(0);

  if (isError || isExercisesError) {
    return <>Error loading workout template.</>;
  }

  if (isLoading || !data || isExercisesLoading || !exercises) {
    return <>Loading...</>;
  }

  const exercise = exercises.find( (ex) => ex.id === exerciseId );

  const onSuccess = () => {
    toast.success("Exercise added to workout template!");
    navigate(`/workout-template/${id}/exercises`);
  };

  const onError = () => {
    toast.error("Failed to add exercise to workout template.");
  };
  const onAddExerciseClick = () => {
    mutate(
      {
        userId: someUuid,
        workoutTemplateId: id,
        exerciseId,
        sets,
        restPeriod,
      },
      {
        onSuccess,
        onError,
      },
    );
  };
  const onSelectExerciseClick = () => {
    navigate(`/workout-template/${id}/add-exercise/select?mode=add`);
  };

  return (
    <>
      <h1>Add Exercise to Template: {data.name}</h1>
      <Button onClick={onSelectExerciseClick}>
        {exerciseId === "" ? "Select Exercise" : exercise?.name}
      </Button>

      <Input
        placeholder="Sets"
        type="number"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
        disabled={exerciseId === ""}
      />
      <Input
        placeholder="Rest period (seconds)"
        type="number"
        value={restPeriod}
        onChange={(e) => setRestPeriod(Number(e.target.value))}
        disabled={exerciseId === ""}
      />
      <Button
        disabled={isPending || exerciseId === ""}
        onClick={onAddExerciseClick}
      >
        Add Exercise
      </Button>
    </>
  );
};
