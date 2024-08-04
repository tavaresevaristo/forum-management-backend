import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  PageQueryParamsSchema,
  pageQueryParamsSchema,
} from '@/interfaces/rest/list-question.dto';

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const perPage = 5;

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        created_at: 'desc',
      },
    });

    const total = questions.length;

    return { question: questions, total };
  }
}
