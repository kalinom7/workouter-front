import { Fragment } from "react";
import { WorkoutPatternItemCard } from "./WorkoutPatternItemCard";
import { RestDaysDialog } from "./RestDaysDialog";
import { RemovePatternItemDialog } from "./RemovePatternItemDialog";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const WorkoutPatternList = ({
  workoutSchedule,
}: {
  workoutSchedule: WorkoutSchedule;
}) => {
  return (
    <div>
      <h2>Workout Pattern:</h2>
      <ul>
        {workoutSchedule.pattern.map((patternItem) => {
          return (
            <Fragment key={patternItem.id}>
              <li>
                <WorkoutPatternItemCard
                  template={patternItem.workoutTemplate}
                  found={patternItem.workoutTemplate !== null}
                />
                <RestDaysDialog patternItemId={patternItem.id} />
                <RemovePatternItemDialog patternItemId={patternItem.id} />
              </li>

              {Array.from({ length: patternItem.restDays }).map((_, index) => (
                <li key={`${patternItem.id}-rest-${index}`}>
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
