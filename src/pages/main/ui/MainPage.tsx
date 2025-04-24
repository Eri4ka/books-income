import { DateRangeFilter } from '@/features/date-range-filter/ui/date-range-filter';
import { IncomeChart } from '@/entities/income-chart/ui/icome-chart';
import { Card } from '@/shared/ui/card';
import { getBooksIncome } from '@/entities/books-income/api/getBooksIncome';

const MainPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const fromQuery = (await searchParams)?.from;
  const toQuery = (await searchParams)?.to;

  const data = await getBooksIncome({
    from: typeof fromQuery === 'string' ? fromQuery : undefined,
    to: typeof toQuery === 'string' ? toQuery : undefined,
  });

  return (
    <div className="h-svh overflow-hidden bg-gray-100 p-2 md:p-4">
      <Card className="bg-white p-4 shadow-md">
        <DateRangeFilter />
        <IncomeChart data={data} />
      </Card>
    </div>
  );
};

export default MainPage;
