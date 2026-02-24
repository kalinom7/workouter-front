import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/useGetAllWorkoutTemplates";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const AllWorkoutTemplatesView = () => {
  const { data, isLoading, isError } = useGetAllWorkoutTemplates(userId);
  const navigate = useNavigate();
  if (isError) return <>Error loading workout templates.</>;
  if (isLoading || !data) return <>Loading...</>;

  const workoutTemplates = data;

  const onWorkoutTemplateClick = (workoutTemplateId: string) => {
    navigate(`/workout-template/${workoutTemplateId}/exercises`);
  };
  return (
    <>
      <h2>All Workout Templates: </h2>
      <ul>
        {workoutTemplates.map((workoutTemplate) => (
          <li key={workoutTemplate.id}>
            <Button onClick={() => onWorkoutTemplateClick(workoutTemplate.id)}>
              {workoutTemplate.name}
            </Button>
          </li>
        ))}
      </ul>
      <Button onClick={() => navigate("/workout-template/create")}>
        Add new workout template
      </Button>
    </>
  );
};
