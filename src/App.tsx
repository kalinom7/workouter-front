import { Home } from "./views/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams, Outlet } from "react-router-dom";
import { Login } from "./views/Login/Login";
import { WorkoutTemplateCreateView } from "./views/WorkoutTemplate/Create/WorkoutTemplateCreateView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkoutTemplateAddExerciseView } from "./views/WorkoutTemplate/AddExercise/WorkoutTemplateAddExerciseView";
import { WorkoutTemplateExercisesView } from "./views/WorkoutTemplate/Exercises/WorkoutTemplateExercisesView";
import { createContext } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const WorkoutTemplateContext = createContext<{
  id: string;
}>({
  id: "",
});

const WorkoutTemplateProvider = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <>Invalid workout template ID</>;
  }

  console.log("WorkoutTemplateProvider id:", id);

  return (
    <WorkoutTemplateContext.Provider value={{ id }}>
      <Outlet />
    </WorkoutTemplateContext.Provider>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="workout-template">
            <Route
              path="create"
              element={<WorkoutTemplateCreateView />}
            />
            <Route path=":id" element={<WorkoutTemplateProvider />}>
              <Route
                path="add-exercise"
                element={<WorkoutTemplateAddExerciseView />}
              />
              <Route
                path="exercises"
                element={<WorkoutTemplateExercisesView />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
