import { Outlet, useParams } from "react-router-dom";
import { WorkoutTemplateContext } from "./WorkoutTemplateContext";
import { useMemo } from "react";

export const WorkoutTemplateProvider = () => {
  const { id } = useParams<{ id: string }>();
  const value = useMemo(() => ({ id: id || "" }), [id]);
  if (!id) {
    return <>Invalid workout template ID</>;
  }

  console.log("WorkoutTemplateProvider id:", id);

  return (
    <WorkoutTemplateContext.Provider value={value}>
      <Outlet />
    </WorkoutTemplateContext.Provider>
  );
};
