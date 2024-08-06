import { FakeHasher } from 'test/cryptography/fake-hasher';
import { RegisterStudentUseCase } from './register-student';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository.';

let inMemoryStudentRepository: InMemoryStudentRepository;
let fakeHasher: FakeHasher;

let sut: RegisterStudentUseCase;

describe('Register student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    fakeHasher = new FakeHasher();
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher);
  });

  it('should be able to register a new student', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12345',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.student[0]
    });
  });
  
  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@exemple.com',
      password: '12345',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryStudentRepository.student[0].password).toEqual("12345-hashed")

  });
});
