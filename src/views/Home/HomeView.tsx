import { GoToWorkoutHistoryButton } from "./components/GoToWorkoutHistoryButton";
import { HelpButton } from "./components/HelpButton";
import { NotificationButton } from "./components/NotificationsButton";
import { PrepareForWorkoutButtons } from "./components/PrepareForWorkoutButtons";
import { StartWorkoutButton } from "./components/StartWorkoutButton";
import { UserProfileButton } from "./components/UserProfileButton";
import { WorkoutHistoryGallery } from "./components/WorkoutHistoryGallery";

export const HomeView = () => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen py-2">
      <div className="w-full flex justify-between items-start px-4">
        <div className="flex flex-col gap-2">
          <UserProfileButton />
          <h2>Welcome, user</h2>
        </div>

        <div className="flex gap-2">
          <HelpButton />
          <NotificationButton />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-8 mb-8">
        <h1>Prepare for workout</h1>
        <PrepareForWorkoutButtons />
      </div>
      <div className="">
        <StartWorkoutButton />
      </div>

      <div className="w-full flex flex-col items-start justify-start px-4 mt-8 mb-4">
        <h2>Workout history</h2>
        <GoToWorkoutHistoryButton />
      </div>

      <WorkoutHistoryGallery />
    </div>
  );
};
