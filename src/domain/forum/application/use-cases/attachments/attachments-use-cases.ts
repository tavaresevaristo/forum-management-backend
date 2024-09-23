import { Injectable } from '@nestjs/common';
import { Uploader } from '../../storage/uploader';
import { Either, left, right } from '@/core/either';
import { Attachment } from '@/domain/forum/enterprise/entities/attachment';
import { InvalidAttachmentsTypeError } from '../errors/invalid-attachments-type';
import { AttachmentsRepository } from '../../repositories/attachments/attachments-repository';

interface UploadAttachmentsUseCaseRequest {
  fileName: string;
  fileType: string;
  body: Buffer;
}

type UploadAttachmentsUseCaseResponse = Either<
  InvalidAttachmentsTypeError,
  {
    attachment: Attachment;
  }
>;

@Injectable()
export class UploadCreateAttachmentsUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: UploadAttachmentsUseCaseRequest): Promise<UploadAttachmentsUseCaseResponse> {
    if (!/^(image\/(jpeg|jpg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentsTypeError(fileType));
    }

    const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentsRepository.create(attachment);

    return right({
      attachment,
    });
  }
}
