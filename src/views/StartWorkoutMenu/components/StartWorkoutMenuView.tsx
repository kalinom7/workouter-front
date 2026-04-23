import { Button } from "@/components/ui/button"
import { StartEmptyWorkoutButton } from "./StartEmptyWorkoutButton";
import { StartWorkoutFromTemplateButton } from "./StartWorkoutFromTemplateButton";


export const StartWorkoutMenu = () => {
    
    
    
    const onStartFromScheduleClick = () => {}

   

    return (
         <>
            <h1>Start Workout</h1>
            <StartEmptyWorkoutButton/>
            <StartWorkoutFromTemplateButton/>
            <Button onClick={onStartFromScheduleClick}>Start workout from schedule</Button>
            
            </>
    )
}