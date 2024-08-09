import {
  Body,
  Post,
  UsePipes,
  Controller,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import {
  CreateAccountBodySchema,
  createAccountBodySchema,
} from '../../interface/rest/user.dto';

import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student';
import { StudentAlreadyExistError } from '@/domain/forum/application/use-cases/errors/student-already-exists-error';
import { Public } from '@/infra/auth/public';

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerStudent: RegisterStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const result = await this.registerStudent.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.cause) {
        case StudentAlreadyExistError:
          throw new ConflictException(error.message);

        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
