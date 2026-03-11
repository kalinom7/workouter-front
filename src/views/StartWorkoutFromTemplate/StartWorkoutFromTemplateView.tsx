import { useState } from "react";
import { Footer } from "../Home/utils/Footer";
import { WorkoutTemplatePreview } from "./utils/WorkoutTemplatePreview";
import { WorkoutTemplateSelector } from "./utils/WorkoutTemplateSelector";
import { useStartWorkoutFromTemplate } from "@/api/workout/useStartWorkoutFromTemplate";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Workout } from "@/types/WorkoutTypes";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const StartWorkoutFromTemplateView = () => {
   const [previewedTemplateId, setPreviewedTemplateId] = useState("");
   const {mutate, isPending} = useStartWorkoutFromTemplate();
   const navigate = useNavigate();
   
   const onStartSuccess = (workout: Workout) => {
      setPreviewedTemplateId("");
      toast.success("Workout started successfully");
      navigate(`/workout/${workout.id}`);
   }
   const onStartError = (error: Error) => {
      toast.error(`Failed to start workout: ${error.message || 'Unknown error'}`);
   }
   const startThisWorkout = () => {
      mutate({userId,workoutTemplateId: previewedTemplateId},
         {onSuccess: onStartSuccess, onError: onStartError}
      );
   }
    return (
    <>
    { 
    previewedTemplateId  ?
    <WorkoutTemplatePreview templateId={previewedTemplateId}disabled={isPending} onStartThisWorkoutClick={startThisWorkout}/>
    :
    <WorkoutTemplateSelector disabled={isPending} setPreviewedTemplateId={setPreviewedTemplateId}/>
    }
    <Footer/>
    </>
   )
}