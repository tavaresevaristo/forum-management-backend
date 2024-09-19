import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { Encrypter } from '../../cyptography/encrypter';
import { HashComparer } from '../../cyptography/hash-compare';
import { WrongCredentialsError } from '../errors/wrong-credentials-error';
import { StudentRepository } from '../../repositories/student/student-repository';

interface AuthenticateStudentUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    access_token: string;
  }
>;

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashCompare: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email);

    if (
      !student ||
      !(await this.hashCompare.compare(password, student.password))
    ) {
      return left(new WrongCredentialsError());
    }

    const access_token = await this.encrypter.encrypt({
      sub: student.id.toString(),
    });

    return right({ access_token });
  }
}
