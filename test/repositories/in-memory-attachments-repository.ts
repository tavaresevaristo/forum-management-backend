import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments/attachments-repository';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public attchaments: Attachment[] = [];

  async create(attachment: Attachment) {
    this.attchaments.push(attachment);
  }
}
