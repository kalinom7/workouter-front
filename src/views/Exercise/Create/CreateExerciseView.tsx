import { useCreateExercise } from "@/api/exercise/hooks/useCreateExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const CreateExerciseView = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateExercise();
  const navigate = useNavigate();

  const onCreateSuccess = ({ name }: { name: string; id: string }) => {
    navigate(`/exercises?userId=${someUuid}`);
    toast.success(`Exercise "${name}" created successfully!`);
  };

  const onCreateError = (error: Error) => {
    toast.error(`Failed to create exercise: ${error.message}`);
  };

  const onCreateClick = () => {
    mutate(
      { userId: someUuid, name, description },
      { onSuccess: onCreateSuccess, onError: onCreateError },
    );
  };

  return (
    <>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Exercise Name"
        disabled={isPending}
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description (optional)"
        disabled={isPending}
        maxLength={256}
      />
      <p className="text-sm text-muted-foreground text-right">
        {description.length}/{256}
      </p>
      <Button
        onClick={onCreateClick}
        disabled={isPending || name.trim() === ""}
      >
        {isPending ? <Spinner /> : "Create Exercise"}
      </Button>
    </>
  );
};
