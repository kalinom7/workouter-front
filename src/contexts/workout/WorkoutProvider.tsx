import { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { WorkoutContext } from "./WorkoutContext";
import { RestTimerProvider } from "./RestTimerProvider";

export const WorkoutProvider = () => {
  const { id } = useParams<{ id: string }>();
  const value = useMemo(() => ({ id: id || "" }), [id]);
  if (!id) {
    return <>Invalid workout ID</>;
  }

  return (
    <WorkoutContext.Provider value={value}>
      <RestTimerProvider>
        <Outlet />
      </RestTimerProvider>
    </WorkoutContext.Provider>
  );
};
