import { Comment } from '@/domain/forum/enterprise/entities/comment';

export class CommentPresenter {
  static toHttp(coment: Comment<any>) {
    return {
      id: coment.id.toString(),
      content: coment.content,
      createdAt: coment.createdAt,
      updatedAt: coment.updatedAt,
    };
  }
}
