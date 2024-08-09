import {
  AuthenticateBodySchema,
  authenticateBodySchema,
} from '../../interface/rest/auth.dto';
import { Body, Post, UsePipes, Controller } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student';

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    const { access_token } = result.value;
    return {
      access_token,
    };
  }
}
