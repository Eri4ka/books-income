'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { cn } from '@/shared/lib/tailwind-merge';

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: {
  className?: string;
  value: DateRange | undefined;
  onChange: (range: DateRange) => void;
}) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[210px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'yyyy-MM-dd')} - {format(value.to, 'yyyy-MM-dd')}
                </>
              ) : (
                format(value.from, 'yyyy-MM-dd')
              )
            ) : (
              <span>Дата или период</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(v) => v?.from && v.to && onChange(v)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
