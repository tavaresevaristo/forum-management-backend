import { z } from 'zod';

export const CreateQuestionsBodySchema = z
  .object({
    title: z.string(),
    content: z.string(),
    attachments: z.array(z.string().uuid()),
  })
  .required();

export type createQuestionsBodySchema = z.infer<
  typeof CreateQuestionsBodySchema
>;
