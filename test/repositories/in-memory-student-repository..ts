import { DomainEvents } from '@/core/events/domain-events';
import { Student } from '@/domain/forum/enterprise/entities/student';
import { StudentRepository } from '@/domain/forum/application/repositories/student/student-repository';

export class InMemoryStudentRepository implements StudentRepository {
  public student: Student[] = [];

  async findByEmail(email: string) {
    const student = this.student.find((item) => item.id.toString() === email);

    if (!student) {
      return null;
    }

    return student;
  }

  async create(student: Student) {
    this.student.push(student);
    DomainEvents.dispatchEventsForAggregate(student.id);
  }
}
