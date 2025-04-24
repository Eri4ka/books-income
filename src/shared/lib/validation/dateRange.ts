import { z } from 'zod';
import { parse, isValid } from 'date-fns';

const dateFormat = 'yyyy-MM-dd';

export const dateRangeSchema = z
  .object({
    from: z.string().refine((val) => isValid(parse(val, dateFormat, new Date())), {
      message: 'Некорректная дата "from"',
    }),
    to: z.string().refine((val) => isValid(parse(val, dateFormat, new Date())), {
      message: 'Некорректная дата "to"',
    }),
  })
  .refine(
    (data) => {
      const from = parse(data.from, dateFormat, new Date());
      const to = parse(data.to, dateFormat, new Date());
      return from <= to;
    },
    {
      message: '"from" не может быть позже "to"',
    },
  );
