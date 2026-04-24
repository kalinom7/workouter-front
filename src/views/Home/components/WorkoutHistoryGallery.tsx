import { useGetAllFinishedWorkouts } from "@/api/workout/hooks/useGetAllFinishedWorkouts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import type { Workout } from "@/types/WorkoutTypes";
import { formatDifferenceTimeMsToHMS } from "@/utils/formatTime";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutHistoryGallery = () => {
  const { data, isPending, isError } = useGetAllFinishedWorkouts(globalUserId);
  if (isPending) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <div>Error loading workout history</div>;
  }
  if (data.length == 0) {
    return (
      <div className="text-muted-foreground justify-start text-sm">
        Your workout history is empty
      </div>
    );
  }
  const workouts: Workout[] = data;

  //TODO: select how many cards are shown based on workouts size and screen size
  //TODO: add more info to the cards like exercises, calories burned, etc

  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {workouts.map((workout) => (
            <CarouselItem key={workout.id} className="basis-1/3">
              <Card>
                <CardHeader>
                  <p>{workout.startTime.toLocaleDateString()}</p>
                </CardHeader>
                <CardContent>
                  <p>
                    {workout.endTime != null &&
                      formatDifferenceTimeMsToHMS(
                        workout.endTime,
                        workout.startTime,
                      )}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
