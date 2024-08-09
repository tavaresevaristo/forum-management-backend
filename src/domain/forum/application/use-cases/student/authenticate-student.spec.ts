import { makeStudent } from 'test/factories/make-student';
import { FakeHasher } from 'test/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/cryptography/fake-encrypter';
import { AuthenticateStudentUseCase } from './authenticate-student';
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository.';

let inMemoryStudentRepository: InMemoryStudentRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

let sup: AuthenticateStudentUseCase;

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();

    sup = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });


  it("should be able to authenticate a student", async () => {
    
    const student = makeStudent({
      email: "johndoe@exemple.com",
      password: await fakeHasher.hash("123456")
    })
    
    inMemoryStudentRepository.create(student);
    
    const result = await sup.execute(
      {
        email: "johndoe@exemple.com",
        password: "123456"
      }
    )

    // expect(result.isRight()).toBe(true);
    // expect(result.value).toEqual({
    //   access_token: expect.any(String)
    // })
    
  })

});
