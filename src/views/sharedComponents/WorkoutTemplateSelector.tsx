import { useGetAllExercises } from "@/api/exercise/hooks/useGetAllExercises";
import { useGetAllWorkoutTemplates } from "@/api/workouttemplate/hooks/useGetAllWorkoutTemplates";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { Exercise } from "@/types/ExerciseTypes";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutTemplateSelector = ({
  setSelectedTemplateId,
  selectedTemplateId,
  search,
}: {
  setSelectedTemplateId: (id: string) => void;
  selectedTemplateId: string;
  search: string;
}) => {
  const { data, isLoading, isError } = useGetAllWorkoutTemplates(globalUserId);
  const {
    data: exercises,
    isLoading: isExercisesLoading,
    isError: isExercisesError,
  } = useGetAllExercises(globalUserId);

  if (isError || isExercisesError) return <>Error loading workout templates.</>;
  if (isLoading || !data || isExercisesLoading || !exercises)
    return <>Loading...</>;

  const templates = data;
  const searchedTemplates = search
    ? templates.filter((template) =>
        template.name.toLowerCase().includes(search.toLowerCase()),
      )
    : templates;

  return (
    <Carousel orientation="vertical" className="py-5">
      <CarouselContent>
        {searchedTemplates.map((template) => {
          const isSelected = template.id === selectedTemplateId;

          const exerciseNames = template.exercises
            .map(
              (te) =>
                exercises.find((ex: Exercise) => ex.id === te.exercise)?.name,
            )
            .filter((name) => name !== undefined);

          const preview = exerciseNames.slice(0, 3).join(", ");
          const remaining = exerciseNames.length - 3;

          return (
            <CarouselItem key={template.id}>
              <Card
                onClick={() => setSelectedTemplateId(template.id)}
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
                    {exerciseNames.length > 0
                      ? `${preview}${remaining > 0 ? ` +${remaining} more` : ""}`
                      : "No exercises yet"}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
