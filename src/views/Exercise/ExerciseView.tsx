import { useGetExercise } from "@/api/exercise/hooks/useGetExercise";
import { useUpdateExercise } from "@/api/exercise/hooks/useUpdateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { globalUserId } from "@/utils/globalUserId";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ExerciseView = () => {
  const { id } = useParams<{ id: string }>();

  const [editable, setEditable] = useState(false);
  const { mutate: updateExercise, isPending: isUpdatePending } =
    useUpdateExercise();

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
      <div className="max-w-2xl mx-auto py-10 space-y-4">
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
  if (isUpdatePending) {
    return <Spinner />;
  }
  return (
    <div className="max-w-2xl mx-auto py-10">
      {editable ? (
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      ) : (
        <h1 className="text-3xl font-semibold tracking-tight">
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

      {editable ? (
        <div className="my-5 flex gap-2 justify-center">
          <Button onClick={onSaveClick}>Save</Button>
          <Button variant="secondary" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button className="my-5" onClick={onEditClick}>
          Edit
        </Button>
      )}
    </div>
  );
};
