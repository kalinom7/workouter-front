import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkoutTemplateCreateView } from "./views/WorkoutTemplate/Create/WorkoutTemplateCreateView";
import { CreateExerciseView } from "./views/Exercise/Create/CreateExerciseView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkoutTemplateAddExerciseView } from "./views/WorkoutTemplate/AddExercise/WorkoutTemplateAddExerciseView";
import { WorkoutTemplateExercisesView } from "./views/WorkoutTemplate/Exercises/WorkoutTemplateExercisesView";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WorkoutTemplateProvider } from "./contexts/workoutTemplate/WorkoutTemplateProvider";
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
import { WorkoutProvider } from "./contexts/workout/WorkoutProvider";
import { WorkoutScheduleMainView } from "./views/WorkoutSchedule/WorkoutScheduleMainView";
import { WorkoutScheduleView } from "./views/WorkoutSchedule/WorkoutScheduleView";
import { WorkoutScheduleProvider } from "./contexts/workoutSchedule/WorkoutScheduleProvider";
import { ManageExistingSchedulesView } from "./views/WorkoutSchedule/ManageExistingSchedulesView";
import { ViewLayout } from "./views/sharedComponents/ViewLayout";
import { ExerciseView } from "./views/Exercise/ExerciseView";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          <Route element={<ViewLayout showHeader={false} showFooter={false} />}>
            <Route path="/" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
          </Route>

          <Route element={<ViewLayout showHeader={false} showFooter={true} />}>
            <Route path="/home" element={<HomeView />} />
          </Route>

          <Route element={<ViewLayout />}>
            <Route path="exercises">
              <Route index element={<AllExercisesView />} />
              <Route path="create" element={<CreateExerciseView />} />
              <Route path=":id" element={<ExerciseView />} />
            </Route>
          </Route>

          <Route element={<ViewLayout />}>
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
          </Route>

          <Route path="workout">
            <Route element={<ViewLayout />}>
              <Route path="start-menu" element={<StartWorkoutView />} />
              <Route
                path="startFromTemplate"
                element={<StartWorkoutFromTemplateView />}
              />
            </Route>
            <Route path=":id" element={<WorkoutProvider />}>
              <Route path="ongoing" element={<WorkoutView />} />
            </Route>
          </Route>

          <Route element={<ViewLayout />}>
            <Route
              path="workout-schedules/main"
              element={<WorkoutScheduleMainView />}
            />
            <Route
              path="workout-schedules/manage"
              element={<ManageExistingSchedulesView />}
            />
            <Route
              path="workout-schedule/:id"
              element={<WorkoutScheduleProvider />}
            >
              <Route index element={<WorkoutScheduleView />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
