import { differenceInMinutes, format, parse } from "date-fns";

export function getDuration(
  startTimestamp: string,
  endTimestamp: string
): string {
  // Parse the date strings using date-fns parse function
  const startTime = parse(startTimestamp, "yyyy/MM/dd HH:mm", new Date());
  const endTime = parse(endTimestamp, "yyyy/MM/dd HH:mm", new Date());

  // Calculate the difference in minutes
  const minutes = differenceInMinutes(endTime, startTime);

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes > 0) {
      return `${hours} ${hours === 1 ? "hr" : "hrs"} ${remainingMinutes} mins`;
    } else {
      return `${hours} ${hours === 1 ? "hr" : "hrs"}`;
    }
  } else {
    return `${minutes} ${minutes === 1 ? "min" : "mins"}`;
  }
}
