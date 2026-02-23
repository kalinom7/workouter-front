import { ExerciseApi } from "./Exercise.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllExercises = (userId: string) => {
  return useQuery({
    queryKey: ["exercises", userId],
    queryFn: async () => ExerciseApi.getAllExercises(userId),
  });
};
