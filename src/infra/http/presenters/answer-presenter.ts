import { Answer } from '@/domain/forum/enterprise/entities/answer/answer';

export class AnswerPresenter {
  static toHttp(answer: Answer) {
    return {
      author_id: answer.authorId.toString(),
      question_id: answer.authorId.toString(),
      content: answer.content,
      created_at: answer.createdAt,
      updated_at: answer.updatedAt

    };
  }
}
