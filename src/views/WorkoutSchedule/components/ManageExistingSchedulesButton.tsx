import { Button } from "@/components/ui/button";
import { globalUserId } from "@/utils/globalUserId";
import { useNavigate } from "react-router-dom";

export const ManageExistingSchedulesButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/workout-schedules/manage?userId=" + globalUserId);
  };
  return (
    <div>
      <Button onClick={onClick}>Manage all existing</Button>
    </div>
  );
};
