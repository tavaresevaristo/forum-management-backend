import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { StudentFactory } from 'test/factories/make-student';
import { QuestionFactory } from 'test/factories/make-question';
import { CacheRepository } from '@/infra/cache/cache-repositor';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question/questions-repository';

describe('Prisma questions repository (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let studentFactory: StudentFactory;
  let questionFactory: QuestionFactory;

  let cacheRepository: CacheRepository;
  let questionsRepository: QuestionsRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    studentFactory = moduleRef.get(StudentFactory);
    questionFactory = moduleRef.get(QuestionFactory);
    cacheRepository = moduleRef.get(CacheRepository);
    questionsRepository = moduleRef.get(QuestionsRepository);

    await app.init();
  });

  test('should cache question', async () => {
    const user = await studentFactory.makePrismaStudent();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const slug = question.slug.value;
    const myQuestion = await questionsRepository.findBySlug(slug);

    const cache = await cacheRepository.get(`question:${slug}`);
    expect(cache).toEqual(JSON.stringify(myQuestion));
  });

  test('should return cached question on subsequent calls', async () => {
    const user = await studentFactory.makePrismaStudent();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const slug = question.slug.value;

    await cacheRepository.set(
      `question:${slug}`,
      JSON.stringify({ empty: true }),
    );

    const myQuestion = await questionsRepository.findBySlug(slug);

    expect(myQuestion).toEqual({ empty: true });
  });

  test('should reset question when saving the question', async () => {
    const user = await studentFactory.makePrismaStudent();

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    });

    const slug = question.slug.value;

    await cacheRepository.set(
      `question:${slug}`,
      JSON.stringify({ empty: true }),
    );

    await questionsRepository.save(question);

    const cache = await cacheRepository.get(`question:${slug}`);

    expect(cache).toBeNull();
  });
});
