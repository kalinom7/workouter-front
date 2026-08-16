import type { Exercise } from "@/types/ExerciseTypes";
import { globalUserId } from "@/utils/globalUserId";
import { http, HttpResponse } from "msw";

const API_URL = import.meta.env.VITE_API_URL;

export const exerciseHandlers = [
    http.get(`${API_URL}/exercises/:exerciseId`, ({params}) => {
    const {exerciseId} = params;
     const exercise: Exercise = {
      id: exerciseId as string,
      userId: globalUserId,
      name: "Bench Press",
      description: "Flat barbell press for chest",
    };

    return HttpResponse.json(exercise);
  }),
  http.get(`${API_URL}/exercises`, () => {
    const exercise1Id = crypto.randomUUID();
    const exercise2Id = crypto.randomUUID();
    const exercise3Id = crypto.randomUUID();
    
    const exercise1 : Exercise = {
      id: exercise1Id,
      userId: globalUserId,
      name: "exercise1",
      description: "description of exercise 1"
    }
    const exercise2 : Exercise = {
      id: exercise2Id,
      userId: globalUserId,
      name: "exercise2",
      description: "description of exercise 2"
    }
    const exercise3 : Exercise = {
      id: exercise3Id,
      userId: globalUserId,
      name: "exercise3",
      description: "description of exercise 3"
    }
    const allExercises : Exercise[] = [exercise1,exercise2,exercise3];

    return HttpResponse.json(allExercises);
  })

]