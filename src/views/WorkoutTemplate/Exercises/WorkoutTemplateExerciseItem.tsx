import { Button } from "@/components/ui/button";

type Props = {
  exercise: {
    order: number;
    exercise: string;
    sets: number;
    restPeriod: number;
  };
  onRemove: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExerciseItem = ({
  exercise,
  onRemove,
  isPending,
}: Props) => {
  return (
    <li>
      Order: {exercise.order}, Exercise ID: {exercise.exercise}, Sets:{" "}
      {exercise.sets}, Rest: {exercise.restPeriod}s
      <Button onClick={() => onRemove(exercise.order)} disabled={isPending}>
        Remove
      </Button>
    </li>
  );
};
