import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
});

export const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema);

export type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>;
