import { type ClassValue, clsx } from "clsx";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import * as NProgress from "nprogress";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function calculateDaysLeft(targetDate: Date) {
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Convert targetDate to a Date object
  const targetDateObj = new Date(targetDate);

  // Calculate the difference in milliseconds between currentDate and targetDate
  const timeDiff = targetDateObj.getTime() - currentDate.getTime();

  // Calculate the number of days left
  const daysLeft = Math.abs(Math.ceil(timeDiff / oneDay));

  return daysLeft;
}

export const usePRouter = () => {
  const router = useRouter();
  const push = (url: string) => {
    NProgress.start();
    router.push(url);
  };

  return { push };
};
