import { z } from 'zod';
import { randomUUID } from 'crypto';
import { payloadSchema } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecorator } from 'src/auth/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

const CreateQuestionsBodySchema = z
  .object({
    title: z.string(),
    content: z.string(),
  })
  .required();

type createQuestionsBodySchema = z.infer<typeof CreateQuestionsBodySchema>;
const bodyValidationPipe = new ZodValidationPipe(CreateQuestionsBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: createQuestionsBodySchema,
    @UserDecorator() user: payloadSchema,
  ) {
    const userId = user.sub;
    const { title, content } = body;

    const slug = this.slugify(title);

    await this.prisma.question.create({
      data: {
        slug,
        title,
        content,
        author_id: userId,
      },
    });
  }

  private slugify(input: string): string {
    const trimmedInput = input.trim();
    const cleaned = trimmedInput
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();

    const slug = cleaned.replace(/-+/g, '-');
    const uniqueSuffix = randomUUID().split('-')[0];
    const uniqueSlug = `${slug}-${uniqueSuffix}`;

    return uniqueSlug;
  }
}
