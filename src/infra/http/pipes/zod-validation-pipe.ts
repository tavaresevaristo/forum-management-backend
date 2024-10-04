import { ZodError, ZodSchema } from 'zod';
import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any) {
    try {
      const parseValue = this.schema.parse(value);
      return parseValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          errors: error.format(),
          message: 'Validation failed',
          statusCode: 400,
        });
      }

      throw new BadRequestException({
        message: 'Validation failed',
        statusCode: 400,
      });
    }
  }
}
