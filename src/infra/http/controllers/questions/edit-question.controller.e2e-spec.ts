import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { AttachmentFactory } from 'test/factories/make-attachments';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachments';

describe('Edit question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let attachmentFactory: AttachmentFactory;
  let questionAttachmentFactory: QuestionAttachmentFactory;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    attachmentFactory = moduleRef.get(AttachmentFactory);
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory);

    await app.init();
  });

  test('[PUT] /question/:id', async () => {
    const user = await studentFactory.makePrismaStudent();
    const access_token = jwt.sign({ sub: user.id.toString() });

    const attachment1 = await attachmentFactory.makePrismaAttachment();
    const attachment2 = await attachmentFactory.makePrismaAttachment();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const questionId = question.id.toString();

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: question.id,
    });

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: question.id,
    });

    const attachment3 = await attachmentFactory.makePrismaAttachment();
    
    const response = await request(app.getHttpServer())
      .put(`/question/${questionId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'New Title',
        content: 'New Content',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      });

    expect(response.statusCode).toBe(204);

    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: 'New Title',
        content: 'New Content',
      },
    });

    expect(questionOnDatabase).toBeTruthy();

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        question_id: questionOnDatabase?.id,
      },
    });

    expect(attachmentOnDatabase).toHaveLength(3);
  });
});
