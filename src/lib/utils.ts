import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): [((...args: Parameters<T>) => void), () => void] {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
  const cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };
  return [debounced, cancel];
}

// Helper function to format time from timestamp
export function formatTime(timestamp: number | undefined): [string, string]  {
  if (timestamp === undefined) return ['N/A', 'N/A'];
  const date = new Date(timestamp * 1000)
  const dateStr = date.toLocaleDateString('en-GB');
  const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return [dateStr, timeStr];
}

// Helper function to format duration from seconds
export function formatDuration(seconds: number | undefined): string {
  if (seconds === undefined || seconds < 0) return 'N/A';

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}:${minutes.toString().padStart(1, '0')}`
}