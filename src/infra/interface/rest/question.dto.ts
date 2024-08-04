import { z } from 'zod';

export const CreateQuestionsBodySchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .required();

export type createQuestionsBodySchema = z.infer<
  typeof CreateQuestionsBodySchema
>;
