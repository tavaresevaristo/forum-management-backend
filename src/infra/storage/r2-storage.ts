import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env-service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Uploader } from '@/domain/forum/application/storage/uploader';
import { UploadParams } from '@/domain/forum/application/storage/types';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  // constructor(private envService: EnvService) {
  //   const accountId = envService.get('CLOUDFLARE_ACCOUNT_ID');
  //   this.client = new S3Client({
  //     region: 'auto',
  //     endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  //     credentials: {
  //       accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
  //       secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
  //     },
  //   });
  // }

  async upload({
    body,
    fileName,
    fileType,
  }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    // await this.client.send(
    //   new PutObjectCommand({
    //     Bucket: this.envService.get('AWS_BUCKET_NAME'),
    //     Key: uniqueFileName,
    //     ContentType: fileType,
    //     Body: body,
    //   }),
    // );

    console.log("C H E G U E I")

    return {
      url: uniqueFileName,
    };
  }
}
