import { useGetWorkout } from "@/api/workout/hooks/useGetWorkout";
import { WorkoutContext } from "@/contexts/workout/WorkoutContext";
import { globalUserId } from "@/utils/globalUserId";
import { useContext, useEffect, useState } from "react";

export const WorkoutTimer = () => {
  const [time, setTime] = useState(0); // time counted in seconds

  const { id } = useContext(WorkoutContext);
  const { data, isLoading, isError } = useGetWorkout(globalUserId, id);

  const startTime = data ? data.startTime.getTime() : null;
  const endTime = data ? data.endTime?.getTime() : null;

  useEffect(() => {
    if (!startTime || endTime) return; //TODO: if there is end time we can setTime to endTime to match te times.

    const update = () => {
      const now = Date.now();
      const diff = Math.floor((now - startTime) / 1000);
      setTime(diff);
    };

    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  if (isError) return <>Error loading workout template.</>;
  if (isLoading || !data) return <>Loading...</>;

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      {format(hours)}:{format(minutes)}:{format(seconds)}
    </div>
  );
};
