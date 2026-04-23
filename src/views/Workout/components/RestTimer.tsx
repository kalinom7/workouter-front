import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RestTimerContext } from "@/contexts/workout/RestTimerContext";
import { useContext, useEffect, useState } from "react";

export const RestTimer = () => {
  const { restTimer, stopRestTimer } = useContext(RestTimerContext);
  const [timeLeft, setTimeLeft] = useState(restTimer.duration);

  useEffect(() => {
    if (!restTimer.isActive) return;

    const update = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - restTimer.startedAt) / 1000);
      const left = Math.max(restTimer.duration - elapsed, 0);
      setTimeLeft(left);
      if (left === 0) {
        stopRestTimer();
      }
    };
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [
    restTimer.isActive,
    restTimer.startedAt,
    restTimer.duration,
    stopRestTimer,
  ]);

  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <Dialog open={restTimer.isActive} onOpenChange={stopRestTimer}>
      <DialogContent
        className="bg-white rounded-lg p-6 w-64"
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Rest Timer</DialogTitle>
        </DialogHeader>
        <div className="text-4xl font-bold text-center">
          {format(minutes)}:{format(seconds)}
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={stopRestTimer}
            className="w-full"
          >
            Skip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
