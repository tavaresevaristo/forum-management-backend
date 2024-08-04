import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { JwtService } from '@nestjs/jwt';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

describe('Create question (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test('GET[] / questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Jhon Doe',
        email: 'jhon.doe@email.com',
        password: '123456',
      },
    });

    const access_token = jwt.sign({ sub: user.id });

    const posts = [
      {
        title: 'Question 01',
        author_id: user.id,
        slug: 'question-01',
        content: 'Question description 01',
      },
      {
        title: 'Question 02',
        author_id: user.id,
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
      question: [
        {
          author_id: user.id,
          slug: 'question-01',
          title: 'Question 01',
          id: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          content: 'Question description 01',
        },
        {
          author_id: user.id,
          slug: 'question-02',
          title: 'Question 02',
          id: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
          content: 'Question description 02',
        },
      ],
      total: 2,
    });
  });
});
