import {
  Post,
  HttpCode,
  Controller,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadCreateAttachmentsUseCase } from '@/domain/forum/application/use-cases/attachments/attachments-use-cases';

@Controller('/attachments')
export class UploadAttachmentsController {
  constructor(
    private uploadAndCreateAttachments: UploadCreateAttachmentsUseCase,
  ) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachments.execute({
      body: file.buffer,
      fileName: file.originalname,
      fileType: file.mimetype,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { attachment } = result.value;

    return {
      attachments_id: attachment.id,
    };
  }
}
