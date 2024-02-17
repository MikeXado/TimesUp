
/**
 * Combines multiple class values into a single string.
 *
 * @param inputs - The class values to be combined.
 * @returns The combined class string.
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
