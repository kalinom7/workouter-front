import { useGetAllFinishedWorkouts } from "@/api/workout/hooks/useGetAllFinishedWorkouts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";
import { formatDifferenceTimeMsToHMS } from "@/utils/formatTime";
import { globalUserId } from "@/utils/globalUserId";

export const WorkoutHistoryGallery = () => {
  const {
    data: finishedWorkouts,
    isLoading: isLoadingFinishedWorkouts,
    isError: isFinishedWorkoutsError,
  } = useGetAllFinishedWorkouts(globalUserId);

  if (isLoadingFinishedWorkouts) {
    return <Spinner></Spinner>;
  }
  if (finishedWorkouts === undefined || isFinishedWorkoutsError) {
    return <div>Error loading workout history</div>;
  }
  if (finishedWorkouts.length == 0) {
    return (
      <div className="text-muted-foreground justify-start text-sm">
        Your workout history is empty
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel>
        <CarouselContent>
          {finishedWorkouts.map((workout) => (
            <CarouselItem key={workout.id} className={"basis-[40%]"}>
              <Card>
                <CardHeader>
                  <div>{workout.startTime.toLocaleDateString()}</div>
                  <div>
                    {workout.endTime != null &&
                      formatDifferenceTimeMsToHMS(
                        workout.endTime,
                        workout.startTime,
                      )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="">
                    {workout.exercises.map((ex) => {
                      return <p key={ex.exercise.id}>{ex.exercise.name}</p>;
                    })}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
