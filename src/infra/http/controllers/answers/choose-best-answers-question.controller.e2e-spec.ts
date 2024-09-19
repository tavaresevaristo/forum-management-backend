import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { AnswerFactory } from 'test/factories/make-answer';

describe('Choose question best answer  (E2E)', () => {
  let jwt: JwtService;
  let prisma: PrismaService;
  let app: INestApplication;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerFactory = moduleRef.get(AnswerFactory);

    await app.init();
  });

  test('[PATCH] answer/:answerId/choose-as-best' , async () => {
    const user = await studentFactory.makePrismaStudent();

    const access_token = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      bestAnswerId: null
    });

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    });

    
    const questionId = question.id.toString();
    const answerId = answer.id.toString();
    
    const response = await request(app.getHttpServer())
    .patch(`/answer/${answerId}/choose-as-best`)
    .set('Authorization', `Bearer ${access_token}`)
    .send();
      
    expect(response.statusCode).toBe(204);
      
    const questionOnDatabase = await prisma.question.findUnique({
      where: {
        id: questionId
      },
    });

    expect(questionOnDatabase?.best_answer_id).toEqual(answerId);
  });
});