import { Button } from "@/components/ui/button";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";
import { useNavigate } from "react-router-dom";

export const WorkoutTemplatesList = ({
  templates,
}: {
  templates: WorkoutTemplate[];
}) => {
  const navigate = useNavigate();
  const onWorkoutTemplateClick = (workoutTemplateId: string) => {
    navigate(`/workout-template/${workoutTemplateId}/exercises`);
  };

  const workoutTemplates = templates;
  return (
    <>
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
