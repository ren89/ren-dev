import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateDifference(pastDate: Date): string {
  const now = new Date();

  const years = differenceInYears(now, pastDate);
  const days = differenceInDays(now, pastDate) % 365;
  const hours = differenceInHours(now, pastDate) % 24;
  const minutes = differenceInMinutes(now, pastDate) % 60;
  const seconds = differenceInSeconds(now, pastDate) % 60;

  return `${years} years, ${days} days, ${hours} hours, ${minutes} mins, ${seconds} secs`;
}
