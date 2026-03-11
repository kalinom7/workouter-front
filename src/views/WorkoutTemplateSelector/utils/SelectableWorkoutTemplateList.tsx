import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

export const SelectableWorkoutTemplateList = ({ workoutTemplates} : { workoutTemplates: WorkoutTemplate[] }) => {
    return (
        <>
        <ul>
            {workoutTemplates.map((workoutTemplate) => (
                <li key={workoutTemplate.id}>
                    {workoutTemplate.name}
                </li>
            ))}
        </ul>
        </>
    )
}