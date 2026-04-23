import { createContext } from "react";

export const WorkoutScheduleContext = createContext<{
  id: string;
}>({
  id: "",
});
