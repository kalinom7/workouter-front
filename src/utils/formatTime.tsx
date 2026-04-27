/*
 *
 *   Function formatTimeMsToHMS recives time stored in ms and formats it to hours : minutes : seconds
 *
 */

export const formatTimeMsToHMS = (time: number) => {
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  const formatedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes,
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return formatedTime;
};

export const formatDifferenceTimeMsToHMS = (endTime: Date, startTime: Date) => {
  const difference = endTime.getTime() - startTime.getTime();
  return formatTimeMsToHMS(difference);
};
