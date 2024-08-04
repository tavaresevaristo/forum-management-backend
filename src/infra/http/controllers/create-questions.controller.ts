import {
  createQuestionsBodySchema,
  CreateQuestionsBodySchema,
} from '@/infra/interface/rest/question.dto';
import { randomUUID } from 'crypto';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

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

  private slugify(title: string): string {
    const trimmedInput = title.trim();
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
