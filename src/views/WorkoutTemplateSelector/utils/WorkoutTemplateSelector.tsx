export const WorkoutTemplateSelector = (
    {onSelectWorkoutTemplate} : { onSelectWorkoutTemplate : (workoutTemplateId:string) => void }
) => {

    const {data, isPending, isError} = useGetAllWorkoutTemplates();

    if (isError) return <>Error loading workout templates.</>;
    if (isPending || !data) return <>Loading...</>;
    
    const workoutTemplates = data;
    
    return (

    )
}