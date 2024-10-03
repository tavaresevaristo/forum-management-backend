import { Comment as PrismaComment, User as PrismaUser } from '@prisma/client';
import { CommentWithAuthor } from "@/domain/forum/enterprise/entities/value-objects/comment-with-author";


type PrismaCommentWithAuthorMapperProps = PrismaComment & {
  author: PrismaUser
}

export class PrismaCommentWithAuthorMapper {

  static toDomain(raw: PrismaCommentWithAuthorMapperProps ): CommentWithAuthor {
    return CommentWithAuthor.create({
      comment_id: raw.id,
      author_id: raw.author_id,
      author: raw.author.name,
      content: raw.content,
      created_at:raw.created_at,
      updated_at: raw.updated_at
    })
  }
}