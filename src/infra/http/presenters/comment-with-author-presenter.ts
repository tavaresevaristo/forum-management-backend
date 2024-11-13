import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';

export class CommentWithAuthorPresenter {
  static toHttp(coment: CommentWithAuthor) {
    return {
      comment_id: coment.comment_id.toString(),
      author_id: coment.author_id.toString(),
      author_name: coment.author,
      content: coment.content,
      created_at: coment.created_at,
      updated_at: coment.updated_at,
    };
  }
}
