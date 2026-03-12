import type { Workout } from "@/types/WorkoutTypes";
import { WorkoutExercisesList } from "./WorkoutExercisesList";


export const WorkoutExerciseManager = ({workout} : {workout: Workout}) => {
    
    return(
        <>
            {
                workout.exercises ? <WorkoutExercisesList workoutExercises={workout.exercises} />
                :<p>Add your first exercise to the workout</p>
            }
        </>
 )
}