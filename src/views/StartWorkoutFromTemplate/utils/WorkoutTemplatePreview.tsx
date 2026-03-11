import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate"
import { Button } from "@/components/ui/button";
const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutTemplatePreview = ({templateId, onStartThisWorkoutClick, disabled} : {templateId:string, onStartThisWorkoutClick: () => void, disabled: boolean}) => {
    const {data, isLoading, isError} = useGetWorkoutTemplate(templateId, userId);
     if (isError) return <>Error loading workout template.</>;
     if (isLoading || !data) return <>Loading...</>;
    const template = data;

    return(
        <>
        <h1>{template.name}</h1>
        <ul>
            {template.exercises.map(exercise => (
                <li key={exercise.exercise}>
                    exercise: {exercise.exercise}, sets: {exercise.sets}, restPeriod: {exercise.restPeriod} seconds
                </li>
            ))}
        </ul>
        <Button disabled={disabled}onClick={onStartThisWorkoutClick}>Start this workout</Button>
        </>
    )
}