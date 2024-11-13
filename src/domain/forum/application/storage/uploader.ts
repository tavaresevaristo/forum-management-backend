import { UploadParams } from './types';

export abstract class Uploader {
  abstract upload(params: UploadParams): Promise<{ url: string }>;
}
