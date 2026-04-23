import { Outlet, useParams } from "react-router-dom";
import { WorkoutScheduleContext } from "./WorkoutScheduleContext";
import { useMemo } from "react";

export const WorkoutScheduleProvider = () => {
  const { id } = useParams<{ id: string }>();
  const value = useMemo(() => ({ id: id || "" }), [id]);
  if (!id) {
    return <>Invalid workout schedule ID</>;
  }

  return (
    <WorkoutScheduleContext.Provider value={value}>
      <Outlet />
    </WorkoutScheduleContext.Provider>
  );
};
