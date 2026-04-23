import { createContext } from "react";

type RestTimerState = {
  isActive: boolean;
  duration: number;
  startedAt: number;
};

type RestTimerContextType = {
  restTimer: RestTimerState;
  startRestTimer: (duration: number) => void;
  stopRestTimer: () => void;
};

export const RestTimerContext = createContext<RestTimerContextType>({
  restTimer: {
    isActive: false,
    duration: 0,
    startedAt: 0,
  },
  startRestTimer: () => {},
  stopRestTimer: () => {},
});
