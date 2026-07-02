import { useState } from "react";
import { WorkoutTemplatePreview } from "./components/WorkoutTemplatePreview";
import { WorkoutTemplateSelector } from "../sharedComponents/WorkoutTemplateSelector";
import { useStartWorkoutFromTemplate } from "@/api/workout/hooks/useStartWorkoutFromTemplate";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { Workout } from "@/types/WorkoutTypes";
import { SearchBar } from "@/views/sharedComponents/SearchBar";

const userId = "123e4567-e89b-12d3-a456-426614174000";
export const StartWorkoutFromTemplateView = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [search, setSearch] = useState("");
  const { mutate, isPending } = useStartWorkoutFromTemplate();
  const navigate = useNavigate();

  const onStartSuccess = (workout: Workout) => {
    setSelectedTemplateId("");
    toast.success("Workout started successfully");
    navigate(`/workout/${workout.id}/ongoing`);
  };
  const onStartError = (error: Error) => {
    toast.error(`Failed to start workout: ${error.message || "Unknown error"}`);
  };
  const startThisWorkout = () => {
    mutate(
      { userId, workoutTemplateId: selectedTemplateId },
      { onSuccess: onStartSuccess, onError: onStartError },
    );
  };
  return (
    <div>
      {selectedTemplateId ? (
        <WorkoutTemplatePreview
          templateId={selectedTemplateId}
          disabled={isPending}
          onStartThisWorkoutClick={startThisWorkout}
        />
      ) : (
        <div>
          <SearchBar
            search={search}
            searched="workout template"
            setSearch={setSearch}
          />
          <WorkoutTemplateSelector
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
            search={search}
          />
        </div>
      )}
    </div>
  );
};
