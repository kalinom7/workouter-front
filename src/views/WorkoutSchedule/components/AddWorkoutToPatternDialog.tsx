import { useAddWorkoutToPattern } from "@/api/workoutschedule/hooks/useAddWorkoutToPattern";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { SearchBar } from "@/views/sharedComponents/SearchBar";
import { WorkoutTemplateSelector } from "@/views/sharedComponents/WorkoutTemplateSelector";
import { useContext, useState } from "react";

export const AddWorkoutToPatternDialog = () => {
  const [selectedWorkoutTemplateId, setSelectedWorkoutTemplateId] =
    useState<string>("");
  const [search, setSearch] = useState("");
  const { id } = useContext(WorkoutScheduleContext);
  const { mutate, isPending } = useAddWorkoutToPattern();

  const onAddClick = () => {
    if (!selectedWorkoutTemplateId) return null;
    return mutate(
      {
        userId: globalUserId,
        workoutTemplateId: selectedWorkoutTemplateId,
        workoutScheduleId: id,
      },
      {
        onSuccess: () => {
          setSelectedWorkoutTemplateId("");
          setSearch("");
        },
      },
    );
  };

  return (
    <Dialog onOpenChange={() => setSelectedWorkoutTemplateId("")}>
      <DialogTrigger asChild>
        <Button> Add Workout</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select workout template</DialogTitle>
          <DialogDescription>
            Select a workout template to add to your workout schedule.
          </DialogDescription>
        </DialogHeader>
        <SearchBar
          search={search}
          setSearch={setSearch}
          searched="workout template"
        />
        <WorkoutTemplateSelector
          selectedTemplateId={selectedWorkoutTemplateId}
          search={search}
          setSelectedTemplateId={setSelectedWorkoutTemplateId}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={!selectedWorkoutTemplateId || isPending}
              onClick={onAddClick}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
