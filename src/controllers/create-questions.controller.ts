import { z } from 'zod';
import { payloadSchema } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecorator } from 'src/auth/user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';
import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';

const CreateQuestionsBodySchema = z
  .object({
    title: z.string(),
    slug: z.string(),
    content: z.string(),
  })
  .required();

type createQuestionsBodySchema = z.infer<typeof CreateQuestionsBodySchema>;

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(CreateQuestionsBodySchema))
  async handle(
    // @Body() body: createQuestionsBodySchema,
    @UserDecorator() user: payloadSchema,
  ) {
    console.log(user.sub);
    // console.log(body);
  }
}
