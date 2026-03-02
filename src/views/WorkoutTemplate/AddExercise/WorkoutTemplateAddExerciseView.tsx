import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { useAddWorkoutTemplateExercise } from "@/api/workouttemplate/useAddWorkoutTemplateExercise";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ExerciseSelector } from "./utils/ExerciseSelector";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateAddExerciseView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);
  const { mutate, isPending } = useAddWorkoutTemplateExercise();
  const navigate = useNavigate();
  const [exerciseId, setExerciseId] = useState("");
  const [sets, setSets] = useState(0);
  const [restPeriod, setRestPeriod] = useState(0);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  if (isError) {
    return <>Error loading workout template.</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }

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
    setExerciseId("");
  };
  const onSelectClick = () => {
    setShowExerciseSelector(false);
  };

  return (
    <>
      <h1>Add Exercise to Template: {data.name}</h1>
      <Button onClick={() => setShowExerciseSelector(true)}>
        Select Exercise
      </Button>
      {showExerciseSelector && (
        <ExerciseSelector
          setExerciseId={setExerciseId}
          onSelectClick={onSelectClick}
        />
      )}

      <Input
        placeholder="Sets"
        type="number"
        value={sets}
        onChange={(e) => setSets(Number(e.target.value))}
      />
      <Input
        placeholder="Rest period (seconds)"
        type="number"
        value={restPeriod}
        onChange={(e) => setRestPeriod(Number(e.target.value))}
      />
      <Button disabled={isPending} onClick={onAddExerciseClick}>
        Add Exercise
      </Button>
    </>
  );
};
