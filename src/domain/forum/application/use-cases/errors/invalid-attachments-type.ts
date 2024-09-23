import { UseCaseError } from '@/core/errors/use-case-error';

export class InvalidAttachmentsTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`Attachments type '${type}' not is valid.`);
  }
}
