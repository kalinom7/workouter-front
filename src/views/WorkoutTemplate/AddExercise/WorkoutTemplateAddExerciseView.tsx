import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { useSearchParams } from "react-router-dom"

const someUuid = "123e4567-e89b-12d3-a456-426614174000";


export const WorkoutTemplateAddExerciseView = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { data, isLoading, isError } = useGetWorkoutTemplate(id!, someUuid);

    if (isError) {
        return <>Error loading workout template.</>;
    }

    if (isLoading || !data) {
        return <>Loading...</>;
    }

    return (
        <>
            Your exercise name, for workout template: {data.name}
        </>
    )
}