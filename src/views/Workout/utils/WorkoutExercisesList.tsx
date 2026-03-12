import type { WorkoutExercise } from "@/types/WorkoutTypes"
import { WorkoutSetsList } from "./WorkoutSetsList"
import { Button } from "@/components/ui/button"
import { useContext } from "react";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { useAddExerciseToWorkout } from "@/api/workout/useAddExerciseToWorkout";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutExercisesList = ({workoutExercises} : {workoutExercises: WorkoutExercise[]}) => {
    const {id} = useContext(WorkoutContext);
    const {mutate, isPending} = useAddExerciseToWorkout();
    
     const onAddExerciseClick = () =>{
        mutate({userId, workoutId: id, exerciseId: userId});
     }
        
    return (
        <>
        <ul>
            {workoutExercises.map((exercise) => (
                <li key={exercise.order}>
                    <p>exercise:{exercise.exerciseId}</p>
                    <WorkoutSetsList workoutSets={exercise.sets} />
                </li>
            ))}
        </ul>
        <Button disabled={isPending} onClick={onAddExerciseClick}>Add Exercise</Button>
        </>
    )
}
