import { useGetWorkoutSchedule } from "@/api/workoutschedule/hooks/useGetWorkoutSchedule";
import { WorkoutScheduleContext } from "@/contexts/workoutSchedule/WorkoutScheduleContext";
import { globalUserId } from "@/utils/globalUserId";
import { Fragment, useContext } from "react";
import { WorkoutPatternItemCard } from "./WorkoutPatternItemCard";
import { RestDaysDialog } from "./RestDaysDialog";
import { RemovePatternItemDialog } from "./RemovePatternItemDialog";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

export const WorkoutPatternList = ({
  templates,
}: {
  templates: WorkoutTemplate[];
}) => {
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
            templates.find((t) => t.id === patternItem.workoutTemplateId) ??
            null;

          return (
            <Fragment key={patternItem.patternItemId}>
              <li>
                <WorkoutPatternItemCard
                  template={template}
                  found={template !== null}
                />
                <RestDaysDialog patternItemId={patternItem.patternItemId} />
                <RemovePatternItemDialog
                  patternItemId={patternItem.patternItemId}
                />
              </li>

              {Array.from({ length: patternItem.restDays }).map((_, index) => (
                <li key={`${patternItem.patternItemId}-rest-${index}`}>
                  <WorkoutPatternItemCard template={null} found={true} />
                </li>
              ))}
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};
