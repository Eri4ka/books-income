import { dateRangeSchema } from '@/shared/lib/validation/dateRange';
import { addDays, endOfMonth, endOfYear, isSameDay, startOfMonth, startOfYear } from 'date-fns';
import { DateRange } from 'react-day-picker';

export const getInitialDateRange = (from: string | null, to: string | null) => {
  if (from && to) {
    const result = dateRangeSchema.safeParse({ from, to });

    if (!result.success) {
      return {
        from: new Date(),
        to: new Date(),
      };
    }

    return {
      from: new Date(from),
      to: new Date(to),
    };
  }
  return getTodayDateRange();
};

export const getTodayDateRange = () => {
  const today = new Date();
  return { from: today, to: today };
};

export const getYesterdayDateRange = () => {
  const yesterday = addDays(new Date(), -1);
  return { from: yesterday, to: yesterday };
};

export const getCurrentMonthDateRange = () => {
  const now = new Date();
  return { from: startOfMonth(now), to: endOfMonth(now) };
};

export const getCurrentYearDateRange = () => {
  const now = new Date();
  return { from: startOfYear(now), to: endOfYear(now) };
};

export const isDateRangeEqual = (dateA: DateRange, dateB: DateRange) => {
  return isSameDay(dateA.from!, dateB.from!) && isSameDay(dateA.to!, dateB.to!);
};
