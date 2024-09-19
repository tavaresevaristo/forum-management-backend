import { Student } from '@/domain/forum/enterprise/entities/student/student';

export abstract class StudentRepository {
  abstract findByEmail(email: string): Promise<Student | null>;
  abstract create(student: Student): Promise<void>;
  // abstract delete(question: Student): Promise<void>;
}
