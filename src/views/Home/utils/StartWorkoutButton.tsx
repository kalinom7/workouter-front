import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export const StartWorkoutButton = () => {
    const navigate = useNavigate();
    const onStartWorkoutButton = () => {
        navigate(`/workout/start-menu`)
    }
    return (
        <Button onClick = {onStartWorkoutButton}>Start Workout</Button>
    )
}