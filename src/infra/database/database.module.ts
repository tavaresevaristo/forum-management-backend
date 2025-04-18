import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerRepository } from './prisma/repositories/answer/prisma-answer-repository';
import { PrismaStudentRepository } from './prisma/repositories/student/prisma-student-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answer/answers-repository';
import { StudentRepository } from '@/domain/forum/application/repositories/student/student-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/question/prisma-questions-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question/questions-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/answer/prisma-answer-comments-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer/answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/answer/prisma-answer-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/question/prisma-question-comments.repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer/answer-attachments-repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question/question-comments-repository';
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/question/prisma-question-attachments.repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question/question-attachments-repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments/attachments-repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/attachments/prisma-attachments-repository';
import { CacheModule } from '../cache/redis/redis.module';

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
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
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentRepository,
    AnswersRepository,
    QuestionsRepository,
    AnswerAttachmentsRepository,
    QuestionCommentsRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
