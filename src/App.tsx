import { Home } from "./views/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login/Login";
import { WorkoutTemplateCreateView } from "./views/WorkoutTemplate/Create/WorkoutTemplateCreateView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkoutTemplateAddExerciseView } from "./views/WorkoutTemplate/AddExercise/WorkoutTemplateAddExerciseView";
import { WorkoutTemplateExercisesView } from "./views/WorkoutTemplate/Exercises/WorkoutTemplateExercisesView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/workout-template/create"
            element={<WorkoutTemplateCreateView />}
          />
          <Route
            path="/workout-template/add-exercise"
            element={<WorkoutTemplateAddExerciseView />}
          />
          <Route
            path="/workout-template/:id/exercises"
            element={<WorkoutTemplateExercisesView />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
