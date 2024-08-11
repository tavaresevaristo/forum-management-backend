import request from 'supertest';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let studentFactory: StudentFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    studentFactory = moduleRef.get(StudentFactory);

    await app.init();
  });

  test('GET[] /questions', async () => {
    const user = await studentFactory.makePrismaStudent();

    const access_token = jwt.sign({ sub: user.id.toString() });

    const posts = [
      {
        title: 'Question 01',
        author_id: user.id.toString(),
        slug: 'question-01',
        content: 'Question description 01',
      },
      {
        title: 'Question 02',
        author_id: user.id.toString(),
        slug: 'question-02',
        content: 'Question description 02',
      },
    ];

    await prisma.question.createMany({
      data: posts,
    });

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${access_token}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      questions: [
        {
          id: expect.any(String),
          title: 'Question 01',
          slug: 'question-01',
          content: 'Question description 01',
          created_at: expect.any(String),
          updated_at: expect.any(String),
          attachments: [],
        },
        {
          id: expect.any(String),
          title: 'Question 02',
          slug: 'question-02',
          content: 'Question description 02',
          created_at: expect.any(String),
          updated_at: expect.any(String),
          attachments: [],
        },
      ],
    });
  });
});
