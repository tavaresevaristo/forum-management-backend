import { hash } from 'bcryptjs';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Authenticate (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('POST[] /sessions', async () => {
    const user = {
      name: 'Jhon Doe',
      email: 'jhon.doe@email.com',
      password: await hash('123456', 8),
    };

    await prisma.user.create({
      data: user,
    });

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: user.email,
      password: '123456',
    });

    const expectedString = expect.any(String);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expectedString,
      user: expect.objectContaining({
        id: expectedString,
        name: expectedString,
        email: expectedString,
        password: expectedString,
      })
    });
  });
});
