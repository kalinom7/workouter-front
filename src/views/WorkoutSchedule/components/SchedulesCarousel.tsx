import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const SchedulesCarousel = ({
  workoutSchedules,
}: {
  workoutSchedules: WorkoutSchedule[];
}) => {
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
