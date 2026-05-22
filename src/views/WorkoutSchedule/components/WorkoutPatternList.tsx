import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
import type { WorkoutTemplate } from "@/api/workouttemplate/hooks/useAddWorkoutTemplateExercise";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext } from "react";
import { WorkoutPatternItemCard } from "./WorkoutPatternItemCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const WorkoutPatternList = ({
  templates,
}: {
  templates: WorkoutTemplate[];
}) => {
  const navigate = useNavigate();
  const { id } = useContext(WorkoutScheduleContext);
  const { data, isLoading, isError } = useGetWorkoutSchedule(globalUserId, id);
  if (isError) {
    return <>Error loading workout schedule.</>;
  }

  if (isLoading || !data) {
    return <>Loading...</>;
  }
  const workoutPattern = data.pattern;

  return (
    <div>
      <h2>Workout Pattern:</h2>
      <ul>
        {workoutPattern.map((patternItem) => {
          const template =
            patternItem.type === "workouttemplate"
              ? (templates.find(
                  (t) => t.id === patternItem.workoutTemplateId,
                ) ?? null)
              : null;
          if (patternItem.type === "workouttemplate" && template === null) {
            return (
              <li key={patternItem.patternItemId}>
                <WorkoutPatternItemCard template={template} found={false} />
              </li>
            );
          }
          return (
            <li key={patternItem.patternItemId}>
              <WorkoutPatternItemCard template={template} found={true} />
            </li>
          );
        })}
      </ul>
      <Button onClick={() => navigate(`add-pattern-item`)}>
        Add pattern item
      </Button>
    </div>
  );
};
