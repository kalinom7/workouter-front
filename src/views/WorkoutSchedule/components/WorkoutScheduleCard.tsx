import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { globalUserId } from "@/utils/globalUserId";
import { CheckIcon, XIcon } from "lucide-react";

export const WorkoutScheduleCard = ({
  isSelected,
  onSelect,
  schedule,
}: {
  isSelected: boolean;
  onSelect: (schedule: WorkoutSchedule) => void;
  schedule: WorkoutSchedule;
}) => {
  const {
    data: workoutTemplates,
    isLoading,
    isError,
  } = useGetAllWorkoutTemplates(globalUserId);

  if (!workoutTemplates || isLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>Error loading workout templates.</CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={() => onSelect(schedule)}
      className={isSelected ? "border-primary bg-muted" : ""}
    >
      <CardContent>
        <CardTitle>{schedule.name}</CardTitle>
        <CardDescription>
          <p>
            Active:
            {schedule.isActive ? (
              <CheckIcon className="inline-block h-4 w-4" />
            ) : (
              <XIcon className="inline-block h-4 w-4" />
            )}
          </p>
          <p>Workouts count: {schedule.pattern.length}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
