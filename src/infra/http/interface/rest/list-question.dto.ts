import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

export const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1));

export type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>;

export const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);
