import { z } from 'zod';

export const createAccountBodySchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;
