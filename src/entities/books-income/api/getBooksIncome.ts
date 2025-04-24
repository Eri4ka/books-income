import { parseISO } from 'date-fns';

import { BooksIncome } from '@/shared/models/booksIncome';
import { getSafeStringFormattedDateRange } from '@/shared/lib/date';

import bookIncomeData from '../data/books-income-data.json';

export const getBooksIncome = async ({
  from,
  to,
}: {
  from?: string;
  to?: string;
}): Promise<BooksIncome[]> => {
  const { safeFrom, safeTo } = getSafeStringFormattedDateRange(from, to);

  const filteredData = bookIncomeData
    .filter((book) => book.date >= safeFrom && book.date <= safeTo)
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  return filteredData;
};
