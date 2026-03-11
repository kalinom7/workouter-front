import { useStartWorkoutFromTemplate } from "@/api/workout/useStartWorkoutFromTemplate";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const StartWorkoutFromTemplateButton = () => {
    const {mutate, isPending} = useStartWorkoutFromTemplate();
    const navigate = useNavigate();
    const onStartFromTemplateClick = () => {
        navigate(`/workoutTemplate-selector`)
    }
    
    return (
        <Button disabled={isPending} onClick={onStartFromTemplateClick}>Start workout from template</Button>
    )
}