import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Exercise } from "@/types/ExerciseTypes";
import { useNavigate } from "react-router-dom";

export const ExercisesList = ({
  exercises,
  search,
}: {
  exercises: Exercise[];
  search: string;
}) => {
  const navigate = useNavigate();
  const searchedExercises = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase()),
  );

  const onExerciseCardClick = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <ScrollArea>
      <div className="grid grid-cols-2">
        {searchedExercises.map((exercise) => (
          <Card
            key={exercise.id}
            onClick={() => onExerciseCardClick(exercise.id)}
          >
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
