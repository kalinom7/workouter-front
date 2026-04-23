import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

const userId = "123e4567-e89b-12d3-a456-426614174000";

export const PrepareForWorkoutButtons = () => {
    const navigate = useNavigate();
    const onExercisesClick = () => {
        navigate(`/exercises?userId=${userId}`)
    }
    const onScheduleClick = () => {
        navigate(`/schedule?userId=${userId}`)
    }
    const onTemplatesClick = () => {
        navigate(`/workout-templates?userId=${userId}`)
    }
    return (
        <>
        <Button onClick={onExercisesClick}>Exercises</Button>
        <Button onClick={onScheduleClick}>Schedule</Button>
        <Button onClick={onTemplatesClick}>Templates</Button>
        </>
    )
}