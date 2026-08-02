import { useGetWorkoutTemplate } from "@/api/workouttemplate/hooks/useGetWorkoutTemplate";
import { Button } from "@/components/ui/button";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutTemplatePreview = ({
  templateId,
  onStartThisWorkoutClick,
  disabled,
}: {
  templateId: string;
  onStartThisWorkoutClick: () => void;
  disabled: boolean;
}) => {
  const { data, isLoading, isError } = useGetWorkoutTemplate(
    templateId,
    globalUserId,
  );

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;
  const template = data;

  return (
    <>
      <h1>{template.name}</h1>
      <ul>
        {template.exercises.map((workoutTemplateExercise) => (
          <li key={workoutTemplateExercise.exercise.id}>
            exercise: {workoutTemplateExercise.exercise.name}, sets:{" "}
            {workoutTemplateExercise.sets}, restPeriod:{" "}
            {workoutTemplateExercise.restPeriod} seconds
          </li>
        ))}
      </ul>
      <Button disabled={disabled} onClick={onStartThisWorkoutClick}>
        Start this workout
      </Button>
    </>
  );
};
