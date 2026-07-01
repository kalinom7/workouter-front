import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { WorkoutSchedule } from "@/types/WorkoutScheduleTypes";

export const SchedulesCarousel = ({
  workoutSchedules,
  search,
  selectedId,
  onSelect,
}: {
  workoutSchedules: WorkoutSchedule[];
  search?: string;
  selectedId?: string;
  onSelect?: (schedule: WorkoutSchedule) => void;
}) => {
  /**
   * sort the schedules so that the active schedule is always at the top of the list. This way, the user can easily see which schedule is currently active and select it if they want to make changes or view its details.
   */
  const orderedSchedules = [...workoutSchedules].sort(
    (a, b) => Number(b.isActive) - Number(a.isActive),
  );
  const searchedSchedules = search
    ? orderedSchedules.filter((schedule) =>
        schedule.name.toLowerCase().includes(search.toLowerCase()),
      )
    : orderedSchedules;

  return (
    <Carousel orientation="vertical" className="py-5">
      <CarouselContent>
        {searchedSchedules.map((schedule) => {
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
