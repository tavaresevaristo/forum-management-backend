import { ValueObject } from '@/core/entities/value-object';

export interface CommentWithAuthorProps {
  comment_id: string;
  content: string;
  author_id: string;
  author: string;
  created_at: Date;
  updated_at?: Date | null;
}

export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get comment_id() {
    return this.props.comment_id;
  }
  get content() {
    return this.props.content;
  }
  get author_id() {
    return this.props.author_id;
  }
  get created_at() {
    return this.props.created_at;
  }
  get updated_at() {
    return this.props.updated_at;
  }
  get author() {
    return this.props.author;
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props);
  }
}
