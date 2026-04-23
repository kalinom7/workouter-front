import { useState } from "react";
import { Footer } from "../Home/components/Footer";
import { CreateNewScheduleButton } from "./components/CreateNewScheduleButton";
import { ManageExistingSchedules } from "./components/ManageExistingSchedules";
import { SchedulesCarousel } from "./components/SchedulesCarousel";
import { SelectActiveScheduleButton } from "./components/SelectActiveScheduleButton";
import { CreateNewScheduleDialog } from "./components/CreateNewScheduleDialog";

export const WorkoutScheduleMenuView = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <div className="flex flex-col">
      <CreateNewScheduleButton onClick={() => setOpenCreateDialog(true)} />
      {openCreateDialog && (
        <CreateNewScheduleDialog
          isOpen={openCreateDialog}
          onOpenChange={() => setOpenCreateDialog(false)}
        />
      )}

      <SelectActiveScheduleButton />
      <ManageExistingSchedules />
      <SchedulesCarousel />
      <Footer />
    </div>
  );
};
