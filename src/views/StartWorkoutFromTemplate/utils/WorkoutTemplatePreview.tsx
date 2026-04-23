import { useGetAllExercises } from "@/api/exercise/useGetAllExercises";
import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate"
import { Button } from "@/components/ui/button";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutTemplatePreview = ({templateId, onStartThisWorkoutClick, disabled} : {templateId:string, onStartThisWorkoutClick: () => void, disabled: boolean}) => {
    const {data, isLoading, isError} = useGetWorkoutTemplate(templateId, globalUserId);
    const {data: exercises, isLoading: isExercisesLoading, isError: isExercisesError } = useGetAllExercises(globalUserId);
     if (isError || isExercisesError) return <>Error loading workout template.</>;
     if (isLoading || !data || isExercisesLoading || !exercises) return <>Loading...</>;
    const template = data;

    return(
        <>
        <h1>{template.name}</h1>
        <ul>
            {template.exercises.map(exercise => (
                <li key={exercise.exercise}>
                    exercise: {exercises.find((ex) => ex.id === exercise.exercise)?.name}, sets: {exercise.sets}, restPeriod: {exercise.restPeriod} seconds
                </li>
            ))}
        </ul>
        <Button disabled={disabled}onClick={onStartThisWorkoutClick}>Start this workout</Button>
        </>
    )
}