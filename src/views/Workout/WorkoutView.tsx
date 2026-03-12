import { useGetWorkout } from "@/api/workout/useGetWorkout";
import { WorkoutContext } from "@/routes/workout/WorkoutContext";
import { useContext } from "react";
import { WorkoutExerciseManager } from "./utils/WorkotExerciseManager";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const WorkoutView = () => {

    const {id} = useContext(WorkoutContext);

    const {data, isLoading, isError} = useGetWorkout(userId, id);
    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error loading workout</p>
    if(!data) return <p>Workout not found</p>
    const workout = data;

    return (
        <>
        <p> Timer </p>
        <p> finish workout button</p>
        <WorkoutExerciseManager workout={workout} />
      </> 
    );
}