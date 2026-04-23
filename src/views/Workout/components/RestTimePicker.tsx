import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export const RestTimePicker = ({
  initialMinutes,
  initialSeconds,
  setSeconds,
  setMinutes,
}: {
  initialMinutes: number;
  initialSeconds: number;
  setSeconds: (s: number) => void;
  setMinutes: (m: number) => void;
}) => {
  const [minutesApi, setMinutesApi] = useState<CarouselApi>();
  const [secondsApi, setSecondsApi] = useState<CarouselApi>();

  useEffect(() => {
    const attach = (
      api: CarouselApi | undefined,
      setValue: (v: number) => void,
    ) => {
      if (!api) return () => {};

      const update = () => {
        const value = api.selectedScrollSnap();
        setValue(value);
      };

      const snap = () => {
        const index = api.selectedScrollSnap();
        api.scrollTo(index);
      };

      api.on("select", update);
      api.on("pointerUp", snap);
      api.on("settle", snap);

      update();

      return () => {
        api.off("select", update);
        api.off("pointerUp", snap);
        api.off("settle", snap);
      };
    };

    const cleanup1 = attach(minutesApi, setMinutes);
    const cleanup2 = attach(secondsApi, setSeconds);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, [minutesApi, secondsApi, setMinutes, setSeconds]);

  useEffect(() => {
    if (minutesApi) {
      minutesApi.scrollTo(initialMinutes, true);
    }
  }, [minutesApi, initialMinutes]);

  useEffect(() => {
    if (secondsApi) {
      secondsApi.scrollTo(initialSeconds, true);
    }
  }, [secondsApi, initialSeconds]);

  return (
    <div id="root" className="flex flex-col items-center gap-4">
      <div className="flex gap-4 justify-center relative">
        {/* MINUTES */}
        <div className="relative w-full max-w-xs">
          <Carousel
            setApi={setMinutesApi}
            opts={{
              align: "center",
              dragFree: true,
              loop: true,
            }}
            orientation="vertical"
          >
            <CarouselContent className="h-[180px]">
              {Array.from({ length: 60 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[36px] flex items-center justify-center"
                >
                  <span>{index}</span>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* label */}
          <span className="text-sm text-muted-foreground">min</span>
        </div>

        {/* SECONDS */}
        <div className="relative w-full max-w-xs">
          <Carousel
            setApi={setSecondsApi}
            opts={{
              align: "center",
              dragFree: true,
              loop: true,
            }}
            orientation="vertical"
          >
            <CarouselContent className="h-[180px]">
              {Array.from({ length: 60 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[36px] flex items-center justify-center"
                >
                  <span>{index}</span>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* label */}
          <span className="text-sm text-muted-foreground">sec</span>
        </div>

        {/* overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center">
          <div className="h-[1px] w-full bg-primary/40" />
          <div className="h-[36px]" />
          <div className="h-[1px] w-full bg-primary/40" />
        </div>
      </div>
    </div>
  );
};
