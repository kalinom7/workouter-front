import { useGetExercise } from "@/api/exercise/hooks/useGetExercise";
import { useRemoveExercise } from "@/api/exercise/hooks/useRemoveExercise";
import { useUpdateExercise } from "@/api/exercise/hooks/useUpdateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { globalUserId } from "@/utils/globalUserId";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const ExerciseView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [editable, setEditable] = useState(false);
  const { mutate: updateExercise } = useUpdateExercise();
  const { mutate: removeExercise, isPending: isRemoving } = useRemoveExercise();

  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetExercise({
    userId: globalUserId,
    exerciseId: id ?? "",
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (isLoading) {
    return (
      <div
        className="max-w-2xl mx-auto py-10 space-y-4"
        data-testid="exercise-skeleton"
      >
        <Skeleton className="h-9 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }
  if (isError || !exercise) {
    return <div>Failed to load exercise.</div>;
  }

  const onEditClick = () => {
    setName(exercise.name);
    setDescription(exercise.description ?? "");
    setEditable(true);
  };
  const onCancelClick = () => {
    setName(exercise.name);
    setDescription(exercise.description ?? "");
    setEditable(false);
  };
  const onSaveClick = () => {
    if (!id) {
      throw new Error("exercise id was not found");
    }
    updateExercise(
      {
        userId: globalUserId,
        exerciseId: id,
        name: name,
        description: description,
      },
      {
        onSuccess: () => toast.success("exercise edited succesfully"),
        onError: () => toast.error("there was an error"),
      },
    );
    setEditable(false);
  };
  const onRemoveClick = () => {
    if (!id) {
      throw new Error("exercise id was not found");
    }
    removeExercise(
      {
        userId: globalUserId,
        exerciseId: id,
      },
      {
        onSuccess: () => {
          navigate("/exercises");
          toast.success("exercise removed succesfully");
        },
        onError: () => toast.error("there was an error"),
      },
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full items-center mx-auto ">
      <main className="flex-1 flex flex-col gap-4">
        {editable ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="exercise-name-input"
          />
        ) : (
          <h1 className="text-[#00FFFB] text-3xl font-semibold tracking-tight">
            {exercise.name}
          </h1>
        )}

        <Separator className="my-2" />
        {editable ? (
          <div>
            <Textarea
              className="text-muted-foreground leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={256}
              data-testid="exercise-description-input"
            />
            <p className="text-sm text-muted-foreground text-right">
              {description.length}/{256}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground leading-relaxed">
            {exercise.description}
          </p>
        )}
      </main>

      {editable ? (
        <div className="my-5 flex gap-2 ">
          <Button onClick={onSaveClick}>Save</Button>
          <Button variant="secondary" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="my-5 flex gap-4">
          <Button
            disabled={isRemoving}
            size="lg"
            variant="outline"
            className="rounded-full text-xl border-teal-300 text-teal-300"
            onClick={onRemoveClick}
          >
            Remove
          </Button>
          <Button
            disabled={isRemoving}
            size="lg"
            className="rounded-full text-xl bg-teal-300 text-black"
            onClick={onEditClick}
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};
