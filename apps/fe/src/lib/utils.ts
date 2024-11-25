import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export function js(obj: any) {
//   return JSON.stringify(obj);
// }

export function jp(data: string) {
  return JSON.parse(data);
}