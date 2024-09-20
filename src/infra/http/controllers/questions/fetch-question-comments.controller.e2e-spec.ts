import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { DatabaseModule } from '@/infra/database/database.module';
import { CommentQuestionFactory } from 'test/factories/make-question-comment';

describe('Fetch question comments (E2E)', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;
  let questionCommentFactory: CommentQuestionFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory, CommentQuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    questionCommentFactory = moduleRef.get(CommentQuestionFactory);

    await app.init();
  });

  test('GET[] /questions/:id/comments', async () => {
    const user = await studentFactory.makePrismaStudent();
    const access_token = jwt.sign({ sub: user.id.toString() });

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const questionId = question.id.toString();

    await Promise.all([
      questionCommentFactory.makePrismaCommentQuestion({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 01',
      }),
      questionCommentFactory.makePrismaCommentQuestion({
        authorId: user.id,
        questionId: question.id,
        content: 'Comment 02',
      }),
    ]);

    const response = await request(app.getHttpServer())
      .get(`/question/${questionId}/comments`)
      .set('Authorization', `Bearer ${access_token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        comments: expect.arrayContaining([
          expect.objectContaining({ content: 'Comment 01' }),
          expect.objectContaining({ content: 'Comment 02' }),
        ]),
      }),
    );
  });
});
