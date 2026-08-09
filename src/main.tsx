import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/alexandria/latin-100.css";
import "@fontsource/alexandria/latin-200.css";
import "@fontsource/alexandria/latin-300.css";
import "@fontsource/alexandria/latin-400.css";
import "@fontsource/alexandria/latin-600.css";
import "@fontsource/alexandria/latin-700.css";
import "@fontsource/alexandria/latin-800.css";
import "@fontsource/alexandria/latin-900.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
