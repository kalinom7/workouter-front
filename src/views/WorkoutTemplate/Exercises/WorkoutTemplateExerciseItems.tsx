import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  exercise: {
    order: number;
    exercise: string;
    sets: number;
    restPeriod: number;
  };
  onRemove: (order: number) => void;
  onEdit: (order: number) => void;
  isPending: boolean;
};

export const WorkoutTemplateExerciseItem = ({
  exercise,
  onRemove,
  onEdit,
  isPending,
}: Props) => {
  return (
    <li>
      Order: {exercise.order}, Exercise ID: {exercise.exercise}, Sets:{" "}
      {exercise.sets}, Rest: {exercise.restPeriod}s
      <Button onClick={() => onEdit(exercise.order)}>Edit</Button>
      <Button onClick={() => onRemove(exercise.order)} disabled={isPending}>
        Remove
      </Button>
    </li>
  );
};

type EditableProps = {
  exercise: {
    order: number;
    exercise: string;
    sets: number;
    restPeriod: number;
  };
  onCancel: () => void;
  onSave: (order: number, newSets: number, newRestPeriod: number) => void;
  isPending: boolean;
};

export const EditableWorkoutTemplateExerciseItem = ({
  exercise,
  onSave,
  onCancel,
  isPending,
}: EditableProps) => {
  const [newSets, setNewSets] = useState(exercise.sets);
  const [newRestPeriod, setNewRestPeriod] = useState(exercise.restPeriod);

  return (
    <li>
      Order: {exercise.order}, Exercise ID: {exercise.exercise}
      <br />
      Sets:
      <Input
        type="number"
        defaultValue={exercise.sets}
        value={newSets}
        onChange={(e) => setNewSets(Number(e.target.value))}
        disabled={isPending}
      />
      Rest:
      <Input
        type="number"
        defaultValue={exercise.restPeriod}
        value={newRestPeriod}
        onChange={(e) => setNewRestPeriod(Number(e.target.value))}
        disabled={isPending}
      />
      <Button
        onClick={() => onSave(exercise.order, newSets, newRestPeriod)}
        disabled={isPending}
      >
        Save
      </Button>
      <Button onClick={onCancel} disabled={isPending}>
        Cancel
      </Button>
    </li>
  );
};
