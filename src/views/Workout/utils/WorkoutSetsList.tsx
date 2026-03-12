import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WorkoutExerciseSet } from "@/types/WorkoutTypes";


export const WorkoutSetsList = ({workoutSets} : {workoutSets: WorkoutExerciseSet[]}) => {
    return (
        <ul>
            {workoutSets.map((set) => (
                <li key={set.order}>
                    <Input>weight</Input>
                    <Input>reps</Input>
                    <Button>mark completed</Button>
                </li>
            )
        )
            }
        </ul>
    )

}