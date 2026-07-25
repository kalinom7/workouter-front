import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export const CreateExerciseButton = () => {
  const navigate = useNavigate();
  const onCreateExerciseClick = () => {
    navigate("/exercises/create");
  };
  return <Button onClick={onCreateExerciseClick}>Create New Exercise</Button>;
};
