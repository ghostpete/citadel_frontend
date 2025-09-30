import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLetter(word?: string) {
  if (word) {
    return word[0];
  } else {
    return "";
  }
}

export const formatHighNumbersInCompact = (num?: number) => {
  if (!num) return 0;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};
