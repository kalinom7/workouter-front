import { Home } from "./views/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login/Login";
import { WorkoutTemplateCreateView } from "./views/WorkoutTemplate/Create/WorkoutTemplateCreateView";
import { CreateExerciseView } from "./views/Exercise/Create/CreateExerciseView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkoutTemplateAddExerciseView } from "./views/WorkoutTemplate/AddExercise/WorkoutTemplateAddExerciseView";
import { WorkoutTemplateExercisesView } from "./views/WorkoutTemplate/Exercises/WorkoutTemplateExercisesView";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WorkoutTemplateProvider } from "./routes/workoutTemplate/WorkoutTemplateProvider";
import { AllExercisesView } from "./views/Exercise/AllExercises/AllExercisesView";
import { AllWorkoutTemplatesView } from "./views/WorkoutTemplate/AllWorkoutTemplates/AllWorkoutTemplatesView";
import { WorkoutTemplateEditExerciseView } from "./views/WorkoutTemplate/EditExercise/WorkoutTemplateEditExerciseView";
import { ExerciseSelector } from "./views/WorkoutTemplate/ExerciseSelector/ExerciseSelector";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="exercise">
            <Route path="create" element={<CreateExerciseView />} />
          </Route>
          <Route path="exercises" element={<AllExercisesView />} />

          <Route path="workout-template">
            <Route path="create" element={<WorkoutTemplateCreateView />} />
            <Route path=":id" element={<WorkoutTemplateProvider />}>
              <Route
                path="add-exercise"
                element={<WorkoutTemplateAddExerciseView />}
              />
              <Route
                path="exercises"
                element={<WorkoutTemplateExercisesView />}
              />
              <Route
                path="exercise/:order"
                element={<WorkoutTemplateEditExerciseView />}
              />
              <Route path="select-exercise" element={<ExerciseSelector />} />
            </Route>
          </Route>
          <Route
            path="workout-templates"
            element={<AllWorkoutTemplatesView />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
