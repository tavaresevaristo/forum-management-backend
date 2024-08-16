import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { AnswerFactory } from 'test/factories/make-answer';
import { Prisma } from '@prisma/client';

describe('Fetch answer (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let answerFactory: AnswerFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, AnswerFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerFactory = moduleRef.get(AnswerFactory);

    await app.init();
  });

  test('GET[] /question', async () => {
    const user = await studentFactory.makePrismaStudent();

    const access_token = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    

    // await Promise.all([
    //   answerFactory.makePrismaAnswer({
    //     authorId: user.id,
    //     questionId: question.id,
    //     content: 'Answer 01',
    //   }),
      
    // ]);

    await answerFactory.makePrismaAnswer({
      authorId: user.id,
      content: 'Answer 01',
      questionId: question.id,
    })

    const question_id = question.id.toString();

    const response = await request(app.getHttpServer())
      .get(`/question/${question_id}/answer`)
      .set('Authorization', `Bearer ${access_token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        answers: expect.arrayContaining([
          expect.objectContaining({ author_id: user.id.toString() }),
        ]),
      }),
    );
  });
});
