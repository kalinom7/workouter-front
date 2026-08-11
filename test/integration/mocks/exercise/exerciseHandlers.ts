import type { Exercise } from "@/types/ExerciseTypes";
import { globalUserId } from "@/utils/globalUserId";
import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL;

export const exerciseHandlers = [
    http.get(`${API_URL}/exercise/:exerciseId`, ({params}) => {
    const {exerciseId} = params;
     const exercise: Exercise = {
      id: exerciseId as string,
      userId: globalUserId,
      name: "Bench Press",
      description: "Flat barbell press for chest",
    };

    return HttpResponse.json(exercise);
  }),]