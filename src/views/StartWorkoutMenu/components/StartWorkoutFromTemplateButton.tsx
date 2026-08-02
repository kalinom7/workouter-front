import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const StartWorkoutFromTemplateButton = () => {
  const navigate = useNavigate();
  const onStartFromTemplateClick = () => {
    navigate(`/workouts/startFromTemplate`);
  };

  return (
    <Button onClick={onStartFromTemplateClick}>
      Start workout from template
    </Button>
  );
};
