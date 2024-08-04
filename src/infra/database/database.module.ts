import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerRepository } from './prisma/repositories/answer/prisma-answer-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/question/prisma-questions-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/answer/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/answer/prisma-answer-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/question/prisma-question-comments.repository';
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/question/prisma-question-attachments.repository';

@Module({
  providers: [
    PrismaService,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
  ],
})
export class DatabaseModule {}
