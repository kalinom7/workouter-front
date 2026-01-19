import { Home } from "./views/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./views/Login/Login";
import TestView from "./Test/TestView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
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
  );
}

export default App;
