import { WorkoutTemplateContext } from "@/routes/workoutTemplate/WorkoutTemplateContext";
import { useContext } from "react";
import { useGetWorkoutTemplate } from "@/api/workouttemplate/useGetWorkoutTemplate";
import { WorkoutTemplateExerciseEditor } from "./utils/WorkoutTemplateExerciseEditor";
import { useParams } from "react-router-dom";

const someUuid = "123e4567-e89b-12d3-a456-426614174000"; // example of userId

export const WorkoutTemplateEditExerciseView = () => {
  const { id } = useContext(WorkoutTemplateContext);
  const {
    data,
    isPending: isGetPending,
    isError: isGetError,
  } = useGetWorkoutTemplate(id, someUuid);
  const params = useParams();
  const order = Number(params.order);
  if (isGetPending) return <>Loading...</>;
  if (isGetError || !data) return <>Error loading exercise</>;


  const exercise = data.exercises.find(
    (ex) => ex.order === Number(params.order),
  );

  if (!exercise) return <>Exercise not found</>;

  return (
    <WorkoutTemplateExerciseEditor
      oldSets={exercise.sets}
      oldRestPeriod={exercise.restPeriod}
      templateId={id}
      order={order}
    />
  );
};
