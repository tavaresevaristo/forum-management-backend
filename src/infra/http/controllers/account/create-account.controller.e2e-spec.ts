import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account (E2E)', () => {
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

  test('POST[] /accounts', async () => {
    const user = {
      name: 'Jhon Doe',
      email: 'jhon.doe@email.com',
      password: '123456',
    };

    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send(user);

    expect(response.statusCode).toBe(201);


    const userOnDatabase = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })

    expect(userOnDatabase).toBeTruthy();


  });
});
