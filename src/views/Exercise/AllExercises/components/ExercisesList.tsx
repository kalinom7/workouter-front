import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Exercise } from "@/types/ExerciseTypes";

export const ExercisesList = ({
  exercises,
  search,
}: {
  exercises: Exercise[];
  search: string;
}) => {
  const searchedExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <ScrollArea>
      <div className="grid grid-cols-2">
        {searchedExercises.map((exercise) => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.name}</CardTitle>
              <CardDescription>
                description: {exercise.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>BodyPart:?</p>
              <p>Difficulty level:?</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
