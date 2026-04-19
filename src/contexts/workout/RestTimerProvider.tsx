import { useCallback, useMemo, useState } from "react";
import { RestTimerContext } from "./RestTimerContext";

export const RestTimerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restTimer, setRestTimer] = useState({
    isActive: false,
    duration: 0,
    startedAt: 0,
  });

  const startRestTimer = useCallback((duration: number) => {
    setRestTimer({
      isActive: true,
      duration,
      startedAt: Date.now(),
    });
  }, []);

  const stopRestTimer = useCallback(() => {
    setRestTimer({
      isActive: false,
      duration: 0,
      startedAt: 0,
    });
  }, []);

  const value = useMemo(() => {
    return {
      restTimer,
      startRestTimer,
      stopRestTimer,
    };
  }, [restTimer, startRestTimer, stopRestTimer]);

  return (
    <RestTimerContext.Provider value={value}>
      {children}
    </RestTimerContext.Provider>
  );
};
