import { Separator } from "@inquirer/prompts";

// reusable functions

export const textFormats = {
  normal: (text: string) => text,
  red: (text: string) => `\u001B[31m${text}\u001B[39m`,
  blue: (text: string) => `\u001B[34m${text}\u001B[39m`,
  bold: (text: string) => `\u001B[1m${text}\u001B[22m`,
};

export function truncate(text: string, length: number) {
  if (length >= text.length) return text;
  return text.slice(0, length) + "...";
}

export function separate(color: keyof typeof textFormats = "normal") {
  console.log(textFormats[color](new Separator().separator.repeat(4)));
}

export function getDateObject(dateString: string) {
  const dateObject = new Date(dateString);

  return dateObject.toString().toLowerCase() === "invalid date"
    ? undefined
    : dateObject;
}

export async function delay(milliSeconds: number) {
  await new Promise((res) => setTimeout(res, milliSeconds));
}
