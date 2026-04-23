import { Button } from "@/components/ui/button";

export const CreateNewScheduleButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <div>
      <Button onClick={onClick}>Create new</Button>
    </div>
  );
};
