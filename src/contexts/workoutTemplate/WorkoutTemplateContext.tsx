import { createContext } from "react";

export const WorkoutTemplateContext = createContext<{
  id: string;
}>({
  id: "",
});
