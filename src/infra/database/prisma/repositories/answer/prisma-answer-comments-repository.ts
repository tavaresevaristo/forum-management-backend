import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { PrismaAnswersCommentMapper } from '../../mappers/prisma-answer-comment-mapper';
import { PrismaCommentWithAuthorMapper } from '../../mappers/prisma-comment-with-author';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer/answer-comments-repository';

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!answerComment) {
      return null;
    }

    return PrismaAnswersCommentMapper.toDomain(answerComment);
  }

  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = await this.prisma.comment.findMany({
      where: {
        answer_id: answerId,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answerComments.map((answerComment) =>
      PrismaAnswersCommentMapper.toDomain(answerComment),
    );
  }

  async findManyByQuestionIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComment = await this.prisma.comment.findMany({
      where: {
        question_id: answerId,
      },
      include: {
        author: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answerComment.map((answerComment) =>
      PrismaCommentWithAuthorMapper.toDomain(answerComment),
    );
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswersCommentMapper.toPrisma(answerComment);

    await this.prisma.comment.create({
      data,
    });
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswersCommentMapper.toPrisma(answerComment);

    await this.prisma.comment.delete({
      where: {
        id: data.id?.toString(),
      },
    });
  }
}
