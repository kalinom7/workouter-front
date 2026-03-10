import { Footer } from "./utils/Footer"
import { GoToWorkoutHistoryButton } from "./utils/GoToWorkoutHistoryButton"
import { HelpButton } from "./utils/HelpButton"
import { NotificationButton } from "./utils/NotificationsButton"
import { PrepareForWorkoutButtons } from "./utils/PrepareForWorkoutButtons"
import { StartWorkoutButton } from "./utils/StartWorkoutButton"
import { UserProfileButton } from "./utils/UserProfileButton"
import { WorkoutHistoryGallery } from "./utils/WorkoutHistoryGallery"

export const HomeView = () => {
 
    return(
    <>
        <UserProfileButton/>
        <HelpButton/>
        <NotificationButton/>
        <h2>Welcome, user</h2>
        <h1>Prepare for workout</h1>
        <PrepareForWorkoutButtons/>
        <StartWorkoutButton />
        <h2>Workout history</h2>
        <GoToWorkoutHistoryButton />
        <WorkoutHistoryGallery />
        <Footer/>
    </>
 )   
}