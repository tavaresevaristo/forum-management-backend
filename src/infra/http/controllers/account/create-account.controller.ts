import { Body, Post, UsePipes, Controller } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  CreateAccountBodySchema,
  createAccountBodySchema,
} from '../../interface/rest/user.dto';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student';

@Controller('/accounts')
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

    if(result.isLeft()){
      throw new Error();
    }
  }
}
