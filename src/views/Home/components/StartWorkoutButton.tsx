import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const StartWorkoutButton = () => {
  const navigate = useNavigate();
  const onStartWorkoutButton = () => {
    navigate(`/workouts/start-menu`);
  };
  return (
    <Button size="lg" onClick={onStartWorkoutButton}>
      Start Workout
    </Button>
  );
};
