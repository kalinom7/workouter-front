import { Card, CardContent } from "@/components/ui/card";
import type { WorkoutTemplate } from "@/types/WorkoutTemplateTypes";

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

  return (
    <Card>
      <CardContent>{template ? template.name : "Rest day"}</CardContent>
    </Card>
  );
};
