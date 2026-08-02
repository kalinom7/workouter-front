import { useDeleteWorkoutTemplate } from "@/api/workouttemplate/hooks/useDeleteWorkoutTemplate";
import { Button } from "@/components/ui/button";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutTemplatesList = ({
  templates,
}: {
  templates: WorkoutTemplate[];
}) => {
  const navigate = useNavigate();
  const onWorkoutTemplateClick = (workoutTemplateId: string) => {
    navigate(`/workout-templates/${workoutTemplateId}`);
  };
  const { mutate, isPending } = useDeleteWorkoutTemplate();
  const workoutTemplates = templates;

  const onDeleteClick = (workoutTemplateId: string) => {
    mutate({ userId, workoutTemplateId });
  };

  return (
    <>
      <ul>
        {workoutTemplates.map((workoutTemplate) => (
          <li key={workoutTemplate.id}>
            <Button
              disabled={isPending}
              onClick={() => onWorkoutTemplateClick(workoutTemplate.id)}
            >
              {workoutTemplate.name}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => onDeleteClick(workoutTemplate.id)}
            >
              delete
            </Button>
          </li>
        ))}
      </ul>
      <Button
        disabled={isPending}
        onClick={() => navigate("/workout-templates/create")}
      >
        Add new workout template
      </Button>
    </>
  );
};
