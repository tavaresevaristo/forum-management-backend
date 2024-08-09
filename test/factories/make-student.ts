import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
  Student,
  StudentProps,
} from '@/domain/forum/enterprise/entities/student';
import { faker } from '@faker-js/faker';

export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityID,
) {
  const student = Student.create(
    {
      name: faker.person.firstName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      ...override,
    },
    id
  );

  return student;
}