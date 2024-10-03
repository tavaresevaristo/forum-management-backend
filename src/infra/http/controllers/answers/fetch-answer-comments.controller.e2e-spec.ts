import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { AnswerFactory } from 'test/factories/make-answer';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { CommentAnswerFactory } from 'test/factories/make-answer-comment';

describe('Fetch answers comments (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let answerFactory: AnswerFactory;
  let questionFactory: QuestionFactory;
  let answerCommentFactory: CommentAnswerFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        AnswerFactory,
        QuestionFactory,
        CommentAnswerFactory,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    answerFactory = moduleRef.get(AnswerFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    answerCommentFactory = moduleRef.get(CommentAnswerFactory);

    await app.init();
  });

  test('GET[] /answers/:id/comments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    });
    const access_token = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const answer = await answerFactory.makePrismaAnswer({
      authorId: user.id,
      questionId: question.id,
    });

    const answerId = answer.id.toString();

    await Promise.all([
      answerCommentFactory.makePrismaCommentAnswer({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 01',
      }),
      answerCommentFactory.makePrismaCommentAnswer({
        authorId: user.id,
        answerId: answer.id,
        content: 'Comment 02',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get(`/answer/${answerId}/comments`)
      .set('Authorization', `Bearer ${access_token}`)
      .send();

    expect(response.statusCode).toBe(200);
  });
});
