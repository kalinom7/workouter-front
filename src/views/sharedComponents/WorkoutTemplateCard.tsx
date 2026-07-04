import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";
import { globalUserId } from "@/utils/globalUserId";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

export const WorkoutTemplateCard = ({
  template,
  isSelected,
  onClick,
}: {
  template: WorkoutTemplate;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetAllExercises(globalUserId);

  const exerciseNames = exercises
    ? template.exercises
        .map((te) => exercises.find((ex) => ex.id === te.exercise)?.name)
        .filter((name) => name !== undefined)
    : [];

  const preview = exerciseNames.slice(0, 3).join(", ");
  const remaining = exerciseNames.length - 3;

  return (
    <Card
      onClick={onClick}
      className={isSelected ? "border-primary bg-muted" : ""}
    >
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>
          exercises count: {template.exercises.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold">Exercises:</p>
        <p className="text-sm text-muted-foreground truncate">
          {isLoading
            ? "Loading exercises..."
            : isError
              ? "Error loading exercises."
              : exerciseNames.length > 0
                ? `${preview}${remaining > 0 ? ` +${remaining} more` : ""}`
                : "No exercises yet"}
        </p>
      </CardContent>
    </Card>
  );
};
