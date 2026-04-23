import { Footer } from "../Home/components/Footer";
import { CreateNewScheduleButton } from "./components/CreateNewScheduleButton";
import { ManageExistingSchedules } from "./components/ManageExistingSchedules";
import { SchedulesCarousel } from "./components/SchedulesCarousel";
import { SelectActiveScheduleButton } from "./components/SelectActiveScheduleButton";

export const WorkoutScheduleView = () => {
  return (
    <div className="flex flex-col">
      <CreateNewScheduleButton />
      <SelectActiveScheduleButton />
      <ManageExistingSchedules />
      <SchedulesCarousel />
      <Footer />
    </div>
  );
};
