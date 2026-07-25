import { useQuery } from "@tanstack/react-query";
import { ExerciseApi } from "../Exercise.api";

export const useGetExercise = ({
  userId,
  exerciseId,
}: {
  userId: string;
  exerciseId: string;
}) => {
  return useQuery({
    queryKey: ["exercises", exerciseId, userId],
    enabled: !!exerciseId,
    queryFn: async () => ExerciseApi.getExercise(userId, exerciseId),
  });
};
