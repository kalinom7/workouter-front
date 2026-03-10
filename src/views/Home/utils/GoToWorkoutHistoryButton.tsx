import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const GoToWorkoutHistoryButton = () => {
    const navigate = useNavigate();

    const onGoToWorkoutHistoryClick = () => {
        navigate(`/workout/history?userId=${userId}`)
    }
    return (
        <Button onClick={onGoToWorkoutHistoryClick}>ArrowIcon</Button>
    )
}