import { Footer } from "./components/Footer";
import { GoToWorkoutHistoryButton } from "./components/GoToWorkoutHistoryButton";
import { HelpButton } from "./components/HelpButton";
import { NotificationButton } from "./components/NotificationsButton";
import { PrepareForWorkoutButtons } from "./components/PrepareForWorkoutButtons";
import { StartWorkoutButton } from "./components/StartWorkoutButton";
import { UserProfileButton } from "./components/UserProfileButton";
import { WorkoutHistoryGallery } from "./components/WorkoutHistoryGallery";

export const HomeView = () => {
  return (
    <>
      <UserProfileButton />
      <HelpButton />
      <NotificationButton />
      <h2>Welcome, user</h2>
      <h1>Prepare for workout</h1>
      <PrepareForWorkoutButtons />
      <StartWorkoutButton />
      <h2>Workout history</h2>
      <GoToWorkoutHistoryButton />
      <WorkoutHistoryGallery />
      <Footer />
    </>
  );
};
