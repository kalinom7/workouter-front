import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/useGetAllWorkoutTemplates";
import { WorkoutTemplatesList } from "./WorkoutTemplatesList";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const AllWorkoutTemplatesView = () => {
  const { data, isLoading, isError } = useGetAllWorkoutTemplates(userId);
  if (isError) return <>Error loading workout templates.</>;
  if (isLoading || !data) return <>Loading...</>;

  const workoutTemplates = data;

  return (
    <>
      <h2>All Workout Templates: </h2>
      <WorkoutTemplatesList templates={workoutTemplates} />
    </>
  );
};
