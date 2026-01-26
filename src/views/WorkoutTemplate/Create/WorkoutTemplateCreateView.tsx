import { useCreateWorkoutTemplate } from "@/api/workouttemplate/useCreateWorkoutTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const someUuid = "123e4567-e89b-12d3-a456-426614174000";

export const WorkoutTemplateCreateView = () => {
    const [name, setName] = useState("");
    const { mutate, isPending } = useCreateWorkoutTemplate();
    const navigate = useNavigate();

const onCreateSuccess = ({name, id}: {name: string; id: string}) => {
    navigate(`/workout-template/add-exercise?id=${id}`);
    toast.success(`Workout template "${name}" created successfully!`);
}

const onCreateClick = () => {
    mutate({ userId: someUuid, name }, {onSuccess: onCreateSuccess});
}

  return (
    <>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" disabled={isPending} />
        <Button onClick={onCreateClick} disabled={isPending || name.trim() === ""}>
            {isPending ? <Spinner /> : "Create"}
        </Button>
    </>
  )
}