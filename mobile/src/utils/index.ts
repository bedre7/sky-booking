import { differenceInMinutes, parse } from "date-fns";

export function getDuration(
  startTimestamp: string,
  endTimestamp: string
): string {
  // Parse the date strings using date-fns parse function
  const startTime = parse(
    startTimestamp,
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    new Date()
  );
  const endTime = parse(
    endTimestamp,
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
    new Date()
  );

  // Calculate the difference in minutes
  const minutes = differenceInMinutes(endTime, startTime);

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes > 0) {
      return `${hours}:${String(remainingMinutes).padStart(2, "0")} hours`;
    } else {
      return `${hours} hours`;
    }
  } else {
    return `${minutes} minutes`;
  }
}
