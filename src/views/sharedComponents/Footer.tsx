import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  const onHomeClick = () => {
    navigate(`/home`);
  };
  const onStartWorkoutClick = () => {
    navigate(`/workout/start-menu`);
  };
  const onPrepareClick = () => {
    navigate(`/prepare`);
  };
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around p-4 bg-white border-t">
      <Button onClick={onHomeClick}>Home</Button>
      <Button onClick={onStartWorkoutClick}>Start Workout</Button>
      <Button onClick={onPrepareClick}>Prepare</Button>
    </div>
  );
};
