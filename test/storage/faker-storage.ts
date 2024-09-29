import { Uploader } from '@/domain/forum/application/storage/uploader';
import { IUpload } from './types';
import { randomUUID } from 'crypto';
import { UploadParams } from '@/domain/forum/application/storage/types';

export class FakeUploader implements Uploader {
  public uploads: IUpload[] = [];

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }
}
