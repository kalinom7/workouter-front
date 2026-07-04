import { Card, CardContent } from "@/components/ui/card";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";
import { WorkoutTemplateCard } from "@/views/sharedComponents/WorkoutTemplateCard";

export const WorkoutPatternItemCard = ({
  template,
  found,
}: {
  template: WorkoutTemplate | null;
  found: boolean;
}) => {
  if (!found) {
    return (
      <Card>
        <CardContent>
          "Workout template: {template?.name || "Unknown"} not found."
        </CardContent>
      </Card>
    );
  }

  return template ? (
    <WorkoutTemplateCard
      template={template}
      isSelected={false}
      onClick={() => {}}
    />
  ) : (
    <Card>
      <CardContent>Rest Day</CardContent>
    </Card>
  );
};
