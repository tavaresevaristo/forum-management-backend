import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerRepository } from './prisma/repositories/answer/prisma-answer-repository';
import { PrismaStudentRepository } from './prisma/repositories/student/prisma-student-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answer/answers-repository';
import { StudentRepository } from '@/domain/forum/application/repositories/student/student-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/question/prisma-questions-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question/questions-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/answer/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/answer/prisma-answer-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/question/prisma-question-comments.repository';
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/question/prisma-question-attachments.repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question/question-comments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question/question-attachments-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer/answer-comments-repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer/answer-attachments-repository';

@Module({
  providers: [
    PrismaService,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,

    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionsCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionsAttachmentsRepository,
    },

    {
      provide: AnswersRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentRepository,
    AnswersRepository,

    QuestionsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,

    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
  ],
})
export class DatabaseModule {}
