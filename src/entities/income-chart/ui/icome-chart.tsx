'use client';

import { BooksIncome } from '@/shared/models/booksIncome';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/chart';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  income: {
    label: 'Доход',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

type Props = {
  data: BooksIncome[];
};

export const IncomeChart = ({ data }: Props) => {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'd MMM', { locale: ru });
  };

  return (
    <ChartContainer config={chartConfig} className="overflow-hidden">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tickFormatter={formatDate} tick={{ fontSize: 12 }} minTickGap={1} />
        <YAxis />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" labelFormatter={formatDate} />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
};
