import { useRef, useState } from "react";

export const RestTimePicker = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const minutesRef = useRef<HTMLDivElement>(null);
  const secondsRef = useRef<HTMLDivElement>(null);
  const minuteItemRefs = useRef<HTMLDivElement[]>([]);
  const secondItemRefs = useRef<HTMLDivElement[]>([]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onMinutesScroll = () => {
    const container = minutesRef.current;
    if (!container) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      const closest = minuteItemRefs.current
        .map((el, i) => {
          if (!el) return null;

          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;

          return { i, dist: Math.abs(elCenter - centerY) };
        })
        .filter((x): x is { i: number; dist: number } => x !== null)
        .sort((a, b) => a.dist - b.dist)[0];

      if (closest) setMinutes(closest.i % 60);
    }, 50);
  };

  const onSecondsScroll = () => {
    const container = secondsRef.current;
    if (!container) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      const closest = secondItemRefs.current
        .map((el, i) => {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;

          return { i, dist: Math.abs(elCenter - centerY) };
        })
        .sort((a, b) => a.dist - b.dist)[0];

      if (closest) setSeconds(closest.i % 60);
    }, 50);
  };

  return (
    <div className="flex gap-5">
      <p>
        minutes: {minutes} seconds: {seconds}
      </p>

      {/* MINUTES */}
      <div className="relative h-40 overflow-hidden">
        {/* TOP FADE */}
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

        {/* CENTER LINE */}
        <div className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 border-y pointer-events-none z-10" />

        {/* SCROLL */}
        <section
          className="h-40 overflow-y-auto snap-y snap-mandatory"
          ref={minutesRef}
          onScroll={onMinutesScroll}
        >
          {Array.from({ length: 1000 }, (_, k) => k).map((k) => {
            const value = k % 60;
            return (
              <div
                key={k}
                ref={(el) => {
                  if (el) minuteItemRefs.current[k] = el;
                }}
                className="h-10 flex items-center justify-center snap-center"
              >
                {value.toString().padStart(2, "0")}
              </div>
            );
          })}
        </section>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* SECONDS */}
      <div className="relative h-40 overflow-hidden">
        {/* TOP FADE */}
        <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

        {/* CENTER LINE */}
        <div className="absolute top-1/2 left-0 w-full h-10 -translate-y-1/2 border-y pointer-events-none z-10" />

        {/* SCROLL */}
        <section
          className="h-40 overflow-y-auto snap-y snap-mandatory"
          ref={secondsRef}
          onScroll={onSecondsScroll}
        >
          {Array.from({ length: 1000 }, (_, k) => k).map((k) => {
            const value = k % 60;
            return (
              <div
                key={k}
                ref={(el) => {
                  if (el) secondItemRefs.current[k] = el;
                }}
                className="h-10 flex items-center justify-center snap-center"
              >
                {value.toString().padStart(2, "0")}
              </div>
            );
          })}
        </section>

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};
