import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAnswerRepository } from './prisma/repositories/answer/prisma-answer-repository';
import { PrismaQuestionsRepository } from './prisma/repositories/question/prisma-questions-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question/questions-repository';
import { PrismaAnswerCommentsRepository } from './prisma/repositories/answer/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/answer/prisma-answer-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/question/prisma-question-comments.repository';
import { PrismaQuestionsAttachmentsRepository } from './prisma/repositories/question/prisma-question-attachments.repository';
import { StudentRepository } from '@/domain/forum/application/repositories/student/student-repository';
import { PrismaStudentRepository } from './prisma/repositories/student/prisma-student-repository';

@Module({
  
  providers: [
    PrismaService,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository
    },
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository
    },
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionsAttachmentsRepository,
  ],
})
export class DatabaseModule {}
