import { Question } from "@/domain/forum/enterprise/entities/question/question";

export class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      slug: question.slug.value.toString(),
      title: question.title,
      content: question.content,
      attachments: question.attachments.getItems(),
      best_asnwer_id: question.bestAnswerId?.toString(),
      created_at: question.createdAt,
      updated_at: question.updatedAt,
    };
  }
}
