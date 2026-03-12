
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { ExerciseSelectorView } from "./views/WorkoutTemplate/ExerciseSelector/ExerciseSelectorView";
import { LoginView } from "./views/Login/LoginView";
import { RegisterView } from "./views/Register/RegisterView";
import { HomeView } from "./views/Home/HomeView";
import { StartWorkoutView } from "./views/StartWorkoutMenu/StartWorkoutView";
import { StartWorkoutFromTemplateView } from "./views/StartWorkoutFromTemplate/StartWorkoutFromTemplateView";
import { WorkoutView } from "./views/Workout/WorkoutView";
import { WorkoutProvider } from "./routes/workout/WorkoutProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/home" element={<HomeView />} />
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
              <Route
                path="exercise/:order/select"
                element={<ExerciseSelectorView />}
              />
              <Route
                path="add-exercise/select"
                element={<ExerciseSelectorView />}
              />
            </Route>
          </Route>
          <Route
            path="workout-templates"
            element={<AllWorkoutTemplatesView />}
          />
          <Route path="workout">
            <Route path="start-menu" element={<StartWorkoutView />} />
            <Route path="startFromTemplate" element={<StartWorkoutFromTemplateView />} />
            <Route path=":id" element={<WorkoutProvider />}> 
            
            <Route path="ongoing" element={<WorkoutView />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
