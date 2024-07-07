import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

import { format, subDays } from "date-fns"
export function getDateXDaysAgo(sub: number = 0) {
  const dateXDaysAgo = subDays(new Date(), sub)

  return format(dateXDaysAgo, "dd/MM/yyyy")
}