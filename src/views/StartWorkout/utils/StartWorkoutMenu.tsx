import { Button } from "@/components/ui/button"
import { StartEmptyWorkoutButton } from "./StartEmptyWorkoutButton";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const StartWorkoutMenu = () => {
    
    
    const onStartFromTemplateClick = () => {}
    
    const onStartFromScheduleClick = () => {}
    
   

    return (
         <>
             <h1>Start Workout</h1>
             <StartEmptyWorkoutButton/>
            <Button onClick={onStartFromTemplateClick}>Start workout from template</Button>
            <Button onClick={onStartFromScheduleClick}>Start workout from schedule</Button>
            
            </>
    )
}