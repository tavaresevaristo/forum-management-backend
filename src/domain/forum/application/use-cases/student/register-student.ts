import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@/core/either';
import { HashGenerator } from '../../cyptography/hash-generator';
import { Student } from '@/domain/forum/enterprise/entities/student/student';
import { StudentAlreadyExistError } from '../errors/student-already-exists-error';
import { StudentRepository } from '../../repositories/student/student-repository';

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistError,
  {
    student: Student;
  }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentRepository: StudentRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentAlreadyExist = await this.studentRepository.findByEmail(email);

    if (studentAlreadyExist) {
      return left(new StudentAlreadyExistError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.studentRepository.create(student);

    return right({
      student,
    });
  }
}
