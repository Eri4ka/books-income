import { format } from 'date-fns';

import { dateRangeSchema } from './validation/dateRange';

export const formatDateToISO = (date: Date | string) => {
  return format(date, 'yyyy-MM-dd');
};

export const getSafeStringFormattedDateRange = (from?: string, to?: string) => {
  const result = dateRangeSchema.safeParse({ from, to });

  const safeFrom = result.success ? formatDateToISO(from!) : formatDateToISO(new Date());
  const safeTo = result.success ? formatDateToISO(to!) : formatDateToISO(new Date());

  return { safeFrom, safeTo };
};
