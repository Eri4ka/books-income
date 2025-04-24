'use client';

import { DateRange } from 'react-day-picker';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/shared/ui/button';
import { DatePickerWithRange } from '@/shared/ui/date-range-picker';
import { formatDateToISO } from '@/shared/lib/date';

import {
  getCurrentMonthDateRange,
  getCurrentYearDateRange,
  getInitialDateRange,
  getTodayDateRange,
  getYesterdayDateRange,
  isDateRangeEqual,
} from '../lib/dateRange';

export const DateRangeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams() as URLSearchParams;

  const fromQuery = searchParams.get('from');
  const toQuery = searchParams.get('to');

  const handleSelectDateRange = (dateRange: DateRange) => {
    createDateRangeQuery(dateRange);
  };

  const createDateRangeQuery = ({ from, to }: DateRange) => {
    const params = new URLSearchParams(searchParams);

    params.set('from', formatDateToISO(from!));
    params.set('to', formatDateToISO(to!));

    router.push(`?${params.toString()}`);
  };

  const getButtonVariant = (buttonDate: DateRange) => {
    return isDateRangeEqual(currentDateRange, buttonDate) ? 'default' : 'secondary';
  };

  const currentDateRange = getInitialDateRange(fromQuery, toQuery);

  return (
    <div className="gap flex flex-col items-end gap-3 sm:flex-row sm:items-stretch sm:justify-end">
      <div className="flex flex-wrap gap-0.5">
        <Button
          variant={getButtonVariant(getTodayDateRange())}
          onClick={() => {
            handleSelectDateRange(getTodayDateRange());
          }}
        >
          Сегодня
        </Button>
        <Button
          variant={getButtonVariant(getYesterdayDateRange())}
          onClick={() => handleSelectDateRange(getYesterdayDateRange())}
        >
          Вчера
        </Button>
        <Button
          variant={getButtonVariant(getCurrentMonthDateRange())}
          onClick={() => handleSelectDateRange(getCurrentMonthDateRange())}
        >
          Месяц
        </Button>
        <Button
          variant={getButtonVariant(getCurrentYearDateRange())}
          onClick={() => handleSelectDateRange(getCurrentYearDateRange())}
        >
          Год
        </Button>
      </div>
      <DatePickerWithRange
        value={currentDateRange}
        onChange={(range) => {
          if (range?.from && range.to) {
            handleSelectDateRange({ from: range.from, to: range.to });
          }
        }}
      />
    </div>
  );
};
