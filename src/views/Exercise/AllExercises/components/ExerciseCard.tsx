import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Exercise } from "@/types/ExerciseTypes";

export const ExerciseCard = ({
  exercise,
  onClick,
}: {
  exercise: Exercise;
  onClick: () => void;
}) => {
  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardDescription>Description: {exercise.description}</CardDescription>
      <CardContent>
        <p>Difficulty level: ?</p>
        <p>Body part: ?</p>
      </CardContent>
    </Card>
  );
};
