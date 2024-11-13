import { makeStudent } from 'test/factories/make-student';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository.';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';

let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentRepository,
    );

    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({ name: 'John Dooe' });
    inMemoryStudentRepository.student.push(student);

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    });

    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    });

    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id,
    });

    await inMemoryAnswerCommentsRepository.create(comment1);
    await inMemoryAnswerCommentsRepository.create(comment2);
    await inMemoryAnswerCommentsRepository.create(comment3);

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
    // expect(result.value?.comments).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       author: 'John Doe',
    //       commentId: comment1.id,
    //     }),
    //     expect.objectContaining({
    //       author: 'John Doe',
    //       commentId: comment2.id,
    //     }),
    //     expect.objectContaining({
    //       author: 'John Doe',
    //       commentId: comment3.id,
    //     }),
    //   ]),
    // );
  
  
  });

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' });
    inMemoryStudentRepository.student.push(student);

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          authorId: student.id,
        }),
      );
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(result.value?.comments).toHaveLength(2);
  });
});
