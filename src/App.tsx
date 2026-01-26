import { Home } from "./views/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login/Login";
import TestView from "./Test/TestView";
import { WorkoutTemplateCreateView } from "./views/WorkoutTemplate/Create/WorkoutTemplateCreateView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { WorkoutTemplateAddExerciseView } from "./views/WorkoutTemplate/AddExercise/WorkoutTemplateAddExerciseView";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/workout-template/create" element={<WorkoutTemplateCreateView />} />
        <Route path="/workout-template/add-exercise" element={<WorkoutTemplateAddExerciseView />} />
        <Route path="/test" element={<TestView />} />
        <Route path="/test/exercise" element={<>Test Exercise View</>} />
        <Route path="/test/workout" element={<>Test Workout View</>} />
        <Route
          path="/test/workoutschedule"
          element={<>Test Workout Schedule View</>}
        />
        <Route
          path="/test/workouttemplate"
          element={<>Test Workout Template View</>}
        />
      </Routes>
    </BrowserRouter>
    <Toaster />
    </QueryClientProvider>
  );
}

export default App;
