import { Button } from "@/components/ui/button";

export const AddWorkoutPatternItemView = () => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1>Add workout pattern item</h1>
      <Button>Add Rest Day</Button>
      <Button>Add Workout</Button>
    </div>
  );
};
