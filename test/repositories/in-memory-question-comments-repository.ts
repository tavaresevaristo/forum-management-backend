import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { InMemoryStudentRepository } from './in-memory-student-repository.'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{

  constructor(private studentRepository: InMemoryStudentRepository) {}

  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams): Promise<CommentWithAuthor[]> {
    
    const questionsComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {

        const author = this.studentRepository.student.find((student) => {
          return student.id.equals(comment.authorId)
        })

        if(!author?.name){
          throw new Error(`Author with ID "${comment.authorId.toString()}" does not exist`)
        }

        return CommentWithAuthor.create({
          author: author.name!, 
          author_id: comment.authorId.toString(),
          comment_id: comment.id.toString(),
          content: comment.content,
          created_at: comment.createdAt,
          updated_at: comment.updatedAt,
        })
      })

      return questionsComments

  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
