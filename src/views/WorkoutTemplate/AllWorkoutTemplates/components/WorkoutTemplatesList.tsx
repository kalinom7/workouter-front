import { useDeleteWorkoutTemplate } from "@/api/workouttemplate/hooks/useDeleteWorkoutTemplate";
import { Button } from "@/components/ui/button";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";
import { globalUserId } from "@/utils/globalUserId";
import { WorkoutTemplateCard } from "@/views/sharedComponents/WorkoutTemplateCard";
import { useNavigate } from "react-router-dom";

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
    mutate({ userId: globalUserId, workoutTemplateId });
  };

  return (
    <>
      <ul>
        {workoutTemplates.map((workoutTemplate) => (
          <li key={workoutTemplate.id}>
            <WorkoutTemplateCard
              template={workoutTemplate}
              onClick={() => onWorkoutTemplateClick(workoutTemplate.id)}
            />
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
