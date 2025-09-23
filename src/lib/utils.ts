import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateConversationTitle(message: string): string {
  const words = message.trim().split(" ");
  const title = words.slice(0, 6).join(" ");
  return title.length < message.length ? `${title}...` : title;
}

export function capitalizeFirstLetter(sentence: string) {
  const firstLetterCap = sentence.charAt(0).toUpperCase();
  const remainingLetters = sentence.slice(1);

  return firstLetterCap + remainingLetters;
}
