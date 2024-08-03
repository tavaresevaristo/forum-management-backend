import { z } from 'zod';

export const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

export type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;
