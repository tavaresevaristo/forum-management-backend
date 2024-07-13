import { ZodError, ZodSchema } from 'zod';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: error.format(),
          message: 'validation failed',
          statusCode: 400,
        });
      }

      throw new BadRequestException('Validation failed');
    }
  }
}
