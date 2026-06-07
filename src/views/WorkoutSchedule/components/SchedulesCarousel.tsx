import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const SchedulesCarousel = ({
  workoutSchedules,
  selectedId,
  onSelect,
}: {
  workoutSchedules: WorkoutSchedule[];
  selectedId?: string;
  onSelect?: (schedule: WorkoutSchedule) => void;
}) => {
  return (
    <Carousel orientation="vertical">
      <CarouselContent>
        {workoutSchedules.map((schedule) => {
          const isSelected = schedule.id === selectedId;

          return (
            <CarouselItem key={schedule.id}>
              <Card
                onClick={() => onSelect?.(schedule)}
                className={isSelected ? "border-primary bg-muted" : ""}
              >
                <CardContent>{schedule.name}</CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
