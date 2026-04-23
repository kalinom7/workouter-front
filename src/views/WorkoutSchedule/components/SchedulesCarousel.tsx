import { useGetAllWorkoutSchedules } from "@/api/workoutschedule/hooks/useGetAllWorkoutSchedules";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";
import { globalUserId } from "@/utils/globalUserId";

export const SchedulesCarousel = () => {
  const { data, isPending, isError } = useGetAllWorkoutSchedules(globalUserId);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError || !data) {
    return <div>Error loading workout schedules</div>;
  }
  const workoutSchedules: WorkoutSchedule[] = data;
  if (workoutSchedules.length === 0) {
    return <div>No workout schedules found</div>;
  }

  return (
    <div>
      <Carousel orientation="vertical">
        <CarouselContent>
          {workoutSchedules.map((schedule) => (
            <CarouselItem key={schedule.id}>
              <Card>
                <CardContent>{schedule.name}</CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
