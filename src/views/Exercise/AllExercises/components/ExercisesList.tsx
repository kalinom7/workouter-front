import { ScrollArea } from "@/components/ui/scroll-area";
import type { Exercise } from "@/types/ExerciseTypes";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "./ExerciseCard";
import { globalUserId } from "@/utils/globalUserId";

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
    navigate(`${id}?userId=${globalUserId}`);
  };

  return (
    <ScrollArea>
      <div className="grid grid-cols-2">
        {searchedExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onClick={() => onExerciseCardClick(exercise.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
