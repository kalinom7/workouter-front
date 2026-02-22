import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext } from "react";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateAddExerciseView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const { data, isLoading, isError } = useGetWorkoutTemplate(id, someUuid);

  if (isError) {
    return <>Error loading workout template.</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Add Exercise to Template: {data.name}</h1>
      <Input placeholder="Exercise name" />
      <Input placeholder="Sets" type="number" />
      <Input placeholder="Rest period (seconds)" type="number" />
      <Button>Add Exercise</Button>
    </>
  );
};
