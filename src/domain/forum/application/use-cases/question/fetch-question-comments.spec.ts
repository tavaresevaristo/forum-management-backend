import { makeStudent } from 'test/factories/make-student';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchQuestionCommentsUseCase } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository.';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';

let sut: FetchQuestionCommentsUseCase;
let inMemoryStudentRepository: InMemoryStudentRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentRepository,
    );
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'John Dooe' });
    inMemoryStudentRepository.student.push(student);

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student.id,
    });

    await inMemoryQuestionCommentsRepository.create(comment1);
    await inMemoryQuestionCommentsRepository.create(comment2);
    await inMemoryQuestionCommentsRepository.create(comment3);

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
  });

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'John Doe' });
    inMemoryStudentRepository.student.push(student);

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          authorId: student.id,
        }),
      );
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.comments).toHaveLength(2);
  });
});
