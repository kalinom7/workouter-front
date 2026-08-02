import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const GoToWorkoutHistoryButton = () => {
  const navigate = useNavigate();

  const onGoToWorkoutHistoryClick = () => {
    navigate(`/workouts/history?userId=${userId}`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={onGoToWorkoutHistoryClick}
    >
      <Avatar size="default">
        <AvatarImage src="src/assets/arrowIcon.svg" />
        <AvatarFallback>wrkStr</AvatarFallback>
      </Avatar>
    </Button>
  );
};
